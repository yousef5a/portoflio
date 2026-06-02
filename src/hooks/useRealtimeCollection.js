import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const subscriptions = new Map();

export function useRealtimeCollection(collectionName, queryKey, mapAndSort, onError) {
  const queryClient = useQueryClient();
  const cacheKey = JSON.stringify(queryKey);

  useEffect(() => {
    let entry = subscriptions.get(cacheKey);

    if (!entry) {
      // 1. Initial fetch
      const fetchInitialData = async () => {
        try {
          const { data, error } = await supabase.from(collectionName).select('*');
          if (error) throw error;
          queryClient.setQueryData(queryKey, mapAndSort ? mapAndSort(data) : data);
        } catch (error) {
          if (onError) onError(error);
        }
      };

      fetchInitialData();

      // 2. Realtime subscription with incremental updates
      const channel = supabase
        .channel(`public:${collectionName}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: collectionName },
          (payload) => {
            // Incremental update instead of full refetch
            const currentData = queryClient.getQueryData(queryKey) || [];
            let updatedData = [...currentData];

            if (payload.eventType === 'INSERT') {
              updatedData = [...updatedData, payload.new];
            } else if (payload.eventType === 'UPDATE') {
              updatedData = updatedData.map((item) =>
                item.id === payload.new.id ? payload.new : item
              );
            } else if (payload.eventType === 'DELETE') {
              updatedData = updatedData.filter((item) => item.id !== payload.old.id);
            }

            queryClient.setQueryData(queryKey, mapAndSort ? mapAndSort(updatedData) : updatedData);
          }
        )
        .subscribe();

      entry = { channel, refCount: 0 };
      subscriptions.set(cacheKey, entry);
    }

    entry.refCount += 1;

    return () => {
      entry.refCount -= 1;
      if (entry.refCount <= 0) {
        supabase.removeChannel(entry.channel);
        subscriptions.delete(cacheKey);
      }
    };
  }, [cacheKey, collectionName, mapAndSort, onError, queryClient, queryKey]);

  return useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData(queryKey) || [],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
