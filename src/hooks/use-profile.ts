import { MyProfile } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { Profile } from "@/types/other-profile";

export function useProfile() {
  return useQuery<MyProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/api/my-profile");
      return res.data;
    },
  });
}
export function useOtherProfile(username: any) {
  return useQuery<Profile>({
    queryKey: ["profile", username],
    queryFn: async () => {
      const res = await api.get(`/api/user-profile/${username}`);
      return res.data;
    },
    enabled: !!username
  });
}
