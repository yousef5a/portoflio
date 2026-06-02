import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../lib/firebase";

const subscriptions = new Map();

export function useRealtimeCollection(collectionName, queryKey, mapAndSort, onError) {
  const queryClient = useQueryClient();
  const cacheKey = JSON.stringify(queryKey);

  useEffect(() => {
    let entry = subscriptions.get(cacheKey);

    if (!entry) {
      const unsubscribe = onSnapshot(
        collection(db, collectionName),
        (snapshot) => {
          const data = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          queryClient.setQueryData(queryKey, mapAndSort ? mapAndSort(data) : data);
        },
        onError
      );

      entry = { unsubscribe, refCount: 0 };
      subscriptions.set(cacheKey, entry);
    }

    entry.refCount += 1;

    return () => {
      entry.refCount -= 1;
      if (entry.refCount <= 0) {
        entry.unsubscribe();
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
