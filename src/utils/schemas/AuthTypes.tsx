import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})
    

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export default LoginSchema;

export const registSchema = z.object({
  username: z.string().min(6, "minimal 6 huruf"),
  email: z.string().email(),
  password: z.string().min(6, "password harus 6 huruf"),
  confirmPassword: z.string().min(6, "password harus 6 huruf"),
});

export type RegistSchemaDTO = z.infer<typeof registSchema>;

export const resetPassword = z.object({
  token: z.string(),
  newPassword: z.string().min(6, "password harus 6 huruf"),
  confirmPassword: z.string().min(6, "password harus 6 huruf"),
});
export type resetPasswordDTO =z.infer<typeof resetPassword>