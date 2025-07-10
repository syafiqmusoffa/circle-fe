import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { SuggestedUserType } from "@/types/suggested-profile";

interface SuggestedResponse {
  suggested: SuggestedUserType[];
}

export const useSuggested = () => {
  return useQuery<SuggestedResponse>({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      const res = await api.get("/api/suggested");
      return res.data;
    },
  });
};
