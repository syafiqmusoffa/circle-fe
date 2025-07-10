import { PostWithRelativeTime } from "@/types/profile";
import { ThreadProps } from "@/types/thread";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const fetchThreadById = (id: any) => {
  return useQuery({
    queryKey: ["threadById", id],
    queryFn: async () => {
      const res = await api.get(`/api/thread/${id}`);
      return res.data;
    },
    enabled: !!id,
    retry: false,
  });
};

interface ThreadPropsResponse {
  message: string;
  result: PostWithRelativeTime[];
}

export const fetchMyThread = () => {
  return useQuery({
    queryKey: ["my-thread"],
    queryFn: async () => {
      const res = await api.get<ThreadPropsResponse>("/api/my-threads");
      return res.data.result;
    },
  });
};
export const fetchOtherThread = (username:any) => {
  return useQuery({
    queryKey: ["other-thread", username],
    queryFn: async () => {
      const res = await api.get<ThreadPropsResponse>(
        `/api/user-thread/${username}`
      );
      return res.data.result;
    },
    enabled: !!username,
  });
};
