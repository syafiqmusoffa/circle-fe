import api from "@/utils/api";
import { RegistSchemaDTO } from "@/utils/schemas/AuthTypes";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function useRegist() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    mutateAsync: mutateRegist,
    data: dataRegist,
    isPending,
  } = useMutation({
    mutationKey: ["regist"],
    mutationFn: async (data: RegistSchemaDTO) => {
      const res = await api.post("/register", data);
      return res.data;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Register failed");
    },
  });

  return {
    mutateRegist,
    dataRegist,
    isPending,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
}
