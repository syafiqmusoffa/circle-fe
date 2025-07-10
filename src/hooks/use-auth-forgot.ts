import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";


export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post("/request-reset", {
        email,
      });
      return data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({
      token,
      newPassword,
      confirmPassword
    }: {
      token: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      const { data } = await api.post("/reset-password", {
        token,
        newPassword,
        confirmPassword
      });
      return data;
    },
  });
};
