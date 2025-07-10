import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function useCreate() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState("");
  
  const [isOpen, setIsopen] = useState<boolean>(false);
  function handleDialog() {
    setIsopen(false);
  }
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  
  const {
    mutateAsync: mutateCreate,
    data: dataCreate,
    isPending,
  } = useMutation({
    mutationKey: ["create-thread"],
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("content", content);
      if (file) formData.append("imageUrl", file);

      const res = await api.post("/api/thread", formData);
      return res.data;
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Gagal membuat thread");
    },
    onSuccess: () => {
      toast.success("Thread berhasil diunggah!");
      queryClient.invalidateQueries({ queryKey: ["thread"] }); 
      queryClient.invalidateQueries({ queryKey: ["profile"] }); 
      setContent("");
      setFile(null);
      setPreview(null);
      handleDialog()
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected))
    }
  };
  const clearImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateCreate();
  };

  return { mutateCreate,preview, setPreview,fileInputRef, dataCreate, isPending, setContent, content, handleFileChange, handleSubmit, clearImage, isOpen, setIsopen };
}
