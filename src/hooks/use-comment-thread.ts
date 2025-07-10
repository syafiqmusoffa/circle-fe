import { ReplyProps } from "@/types/thread";
import api from "@/utils/api";
import { UpdateComment, UpdateCommentType } from "@/utils/schemas/ContentTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const fetchComments = (id: string | number) => {
  return useQuery<ReplyProps[]>({
    queryKey: ["reply", id],
    queryFn: async () => {
      const res = await api.get(`/api/comments/${id}`);
      
      return res.data;
    },
  });
};

export const addComment = (postId: string | undefined) => {
  const [content, setContent] = useState<string>("");
  const queryClient = useQueryClient();
  const {
    mutateAsync: mutateAddComment,
    data: dataCreate,
    isPending,
  } = useMutation({
    mutationKey: ["add-comment", postId],
    mutationFn: async ({
      content,
    }: {
      content: string;
     
    }) => {
      const res = await api.post(`/api/reply/${postId}`, { content });
      return res.data;
    },
    onError: () => {
      toast.error("gagal komen");
    },
    onSuccess: () => {
      toast.success("berhasil komen");
      queryClient.invalidateQueries({ queryKey: ["reply"] });
      queryClient.invalidateQueries({ queryKey: ["thread"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["my-thread"] });
      setContent("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAddComment({ content});
  };
  return {
    mutateAddComment,
    content,
    setContent,
    dataCreate,
    handleSubmit,
    isPending,
  };
};

export function useEditComment(replyId: string | number) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateCommentType>({
    mode: "onChange",
    resolver: zodResolver(UpdateComment),
  });

  const { mutateAsync: mutateEditComment, isPending } = useMutation({
    mutationFn: async (data: { content: string }) => {
      const res = await api.patch(`/api/update-reply/${replyId}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Komentar berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["reply"] });
      queryClient.invalidateQueries({ queryKey: ["thread"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["my-thread"] });
    },
    onError: () => {
      toast.error("Gagal mengedit komentar");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = form.getValues("content");
    if (!content?.trim()) return toast.error("Komentar tidak boleh kosong");

    await mutateEditComment({ content });
  };

  return { form, isPending, handleSubmit };
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: any) => {
      const res = await api.delete(`/api/delete-reply/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["reply"] });
      queryClient.invalidateQueries({ queryKey: ["thread"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["my-thread"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "error delete");
    },
  });
}