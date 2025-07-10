// hooks/useEditThread.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchThreadById } from "./use-thread-by-id";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateThread, CreateThreadDTO } from "@/utils/schemas/ThreadTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/utils/api";
import { toast } from "sonner";

export function useEditThread(id: any) {
  const queryClient = useQueryClient();
  const { data: thread } = fetchThreadById(id);
  useEffect(() => {
    if (thread) {
      setContent(thread.content || "");
    }
  }, [thread]);
  const [image, setImage] = useState<File | null>(null);
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); function handleDialog() {
    setIsopen(false);
  }
  const form = useForm<CreateThreadDTO>({
    mode: "onChange",
    resolver: zodResolver(CreateThread),
  });
  const { mutateAsync: mutateThread, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      
      if (image) {
        formData.append("imageUrl", "true");
      } else if (imageDeleted) {
        formData.append("imageDeleted", "true");
      }
      
      
      const res = await api.put(`/api/edit-thread/${id}`, formData);
      
      
      return res.data;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal update thread");
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      setImageDeleted(false);
      queryClient.invalidateQueries({ queryKey: ["threadById"] });
      queryClient.invalidateQueries({ queryKey: ["thread"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["my-thread"] });
      handleDialog();
    },
  });
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setImage(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };
  const clearImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPreview(null);
    setImage(null);
    setImageDeleted(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("foto dalam konten akan dihapus setelah update");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (content !== thread?.content) formData.append("content", content);
    if (image) {
      formData.append("imageUrl", image);
    } else if (imageDeleted) {
      formData.append("imageUrl", "true");
    }

    await mutateThread(formData);
  };
  
  return {
    form,
    handleSubmit,
    isPending,
    setImage,
    setPreview,
    fileInputRef,
    handleFileChange,
    setContent,
    preview,
    clearImage,
    content,
    setImageDeleted,
    isOpen, setIsopen,
    handleDialog
  };
}
