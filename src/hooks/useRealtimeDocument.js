import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const subscriptions = new Map();

export function useRealtimeDocument(tableName, recordId, queryKey, fallbackData, mergeData, onError) {
  const queryClient = useQueryClient();
  const cacheKey = JSON.stringify(queryKey);

  useEffect(() => {
    let entry = subscriptions.get(cacheKey);

    if (!entry) {
      const fetchInitialData = async () => {
        try {
          const { data, error } = await supabase.from(tableName).select('*').eq('id', recordId).maybeSingle();
          if (error) throw error;
          const merged = data ? mergeData(data) : fallbackData;
          queryClient.setQueryData(queryKey, merged);
        } catch (error) {
          if (onError) onError(error);
        }
      };

      fetchInitialData();

      const channel = supabase
        .channel(`public:${tableName}:${recordId}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: tableName, filter: `id=eq.${recordId}` },
          () => {
            fetchInitialData();
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
  }, [cacheKey, fallbackData, mergeData, onError, tableName, recordId, queryClient, queryKey]);

  return useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData(queryKey) || fallbackData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
