// hooks/use-me.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/api/me");
      return res.data;
    },
  });
}
