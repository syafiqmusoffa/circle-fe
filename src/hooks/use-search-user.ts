// hooks/use-search-user.ts
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { SuggestedUserType } from "@/types/suggested-profile";

export const useSearchUser = (search: string) => {
  return useQuery<SuggestedUserType[]>({
    queryKey: ["search-user", search],
    queryFn: async () => {
      const res = await api.get(`/api/search?q=${search}`);
      
      return res.data;
    },
    enabled: !!search, 
  });
};
