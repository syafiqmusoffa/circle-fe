import api from "@/utils/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useThreads() {
  return useQuery({
    queryKey: ["thread"],
    queryFn: async () => {
      const res = await api.get("/api/threads");
      return res.data;
    },
  });
}

export const useInfiniteThreads = () => {
  return useInfiniteQuery({
    queryKey: ["threads"],
    queryFn: async ({ pageParam = null }) => {
      const res = await api.get("/api/threads", {
        params: {
          cursor: pageParam,
        },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
    initialPageParam: null,
  });
};