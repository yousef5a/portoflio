import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../lib/firebase";

const subscriptions = new Map();

export function useRealtimeDocument(pathSegments, queryKey, fallbackData, mergeData, onError) {
  const queryClient = useQueryClient();
  const cacheKey = JSON.stringify(queryKey);

  useEffect(() => {
    let entry = subscriptions.get(cacheKey);

    if (!entry) {
      const unsubscribe = onSnapshot(
        doc(db, ...pathSegments),
        (docSnap) => {
          const data = docSnap.exists()
            ? mergeData(docSnap.data())
            : fallbackData;
          queryClient.setQueryData(queryKey, data);
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
  }, [cacheKey, fallbackData, mergeData, onError, pathSegments, queryClient, queryKey]);

  return useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData(queryKey) || fallbackData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
