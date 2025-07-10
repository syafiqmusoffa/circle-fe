import type { LoginSchemaType } from "@/utils/schemas/AuthTypes";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useState } from "react";

export function useLogin() {
  const [showPassword, setShowPassword]= useState(false)
  const {
    mutateAsync: mutateLogin,
    data: dataLogin,
    isPending,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginSchemaType) => {
      const res = await api.post("/login", data);
      Cookies.set("token", res.data.token);
      return res.data;
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  return { mutateLogin, dataLogin, isPending, showPassword, setShowPassword };
}
