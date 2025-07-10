// src/hooks/use-follow.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import { toast } from "sonner";

export function useFollow(userId: any) {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: async () => {
      await api.post("/api/follow", { followingId: userId });
    },
    onSuccess: () => {
      toast.success("Berhasil follow user");
      queryClient.invalidateQueries({ queryKey: ["get-following"] });
      queryClient.invalidateQueries({ queryKey: ["get-follower"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Gagal follow user");
    },
  });

  return { followMutation };
}

export function useUnFollow(userId: any) {
  const queryClient = useQueryClient();

  const unfollowMutation = useMutation({
    mutationFn: async () => {
      await api.delete("/api/unfollow", {
        data: { followingId: userId },
      });
    },
    onSuccess: () => {
      toast.success("Berhasil unfollow user");
      queryClient.invalidateQueries({ queryKey: ["get-following"] });
      queryClient.invalidateQueries({ queryKey: ["get-follower"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Gagal unfollow user");
    },
  });

  return { unfollowMutation };
}

export function useGetFollowing() {
  return useQuery({
    queryKey: ["get-following"],
    queryFn: async () => {
      const res = await api.get("/api/following");
      return res.data;
    },
  });
}

export function useGetFollower() {
  return useQuery({
    queryKey: ["get-follower"],
    queryFn: async () => {
      const res = await api.get("/api/follower");
      return res.data;
    },
  });
}
