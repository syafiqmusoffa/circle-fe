import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useToggleLike(postId: number, liked: boolean) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (liked) {
        await api.delete("/api/unlike", { data: { postId } });
      } else {
        await api.post("/api/like", { postId });
      }
    },
    onSuccess: () => {
      toast.success(liked ? "Unlike berhasil" : "Berhasil like");
      queryClient.invalidateQueries({ queryKey: ["thread"] });
      queryClient.invalidateQueries({ queryKey: ["my-thread"] });
      queryClient.invalidateQueries({ queryKey: ["thread", postId] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Gagal memproses like");
    },
  });

  return { toggleLike: mutation };
}
