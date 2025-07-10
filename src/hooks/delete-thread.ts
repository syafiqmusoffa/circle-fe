import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: any) => {
        const res = await api.delete(`/api/delete-thread/${id}`);
          return res.data;
        
    },
    onSuccess: (data) => {
      toast.success(data.message || "berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["thread"] });
      queryClient.removeQueries({ queryKey: ["threadById"] });

    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "error delete");
    },
    
  });
};
