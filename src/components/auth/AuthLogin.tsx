import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { useLogin } from "@/hooks/use-login";
import LoginSchema, { LoginSchemaType } from "@/utils/schemas/AuthTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useAuth } from "../connection/contexts/AuthContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect } from "react";
function LoginForm() {
  const navigate = useNavigate();
  const { login, isAuth } = useAuth();
  const { mutateLogin, isPending, showPassword, setShowPassword } = useLogin();
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    await mutateLogin(data); 

    login();
    navigate("/");
  };
  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="border p-10 rounded-3xl w-full max-w-md bg-[#2a2b2a] ">
          <p className="title-form text-6xl font-extrabold text-center">
            Circle
          </p>
          <p className="title-order text-center text-xl mb-7">
            Login to Circle
          </p>
          <div className="flex flex-col gap-4">
            <Input
              className="w-full border-2 p-1 rounded-2xl border-gray-500 text-m text-white"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <div className="relative">
              <Input
                className="w-full border-2 p-1 rounded-2xl border-gray-500 text-m text-white"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />
              <Button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-2 top-0 text-white bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                variant={"ghost"}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <NavLink to="/forgot" className="ask-acc text-sm">
              Forgot Password?
            </NavLink>
            <Button
              className="form-button-order bg-green-800 hover:bg-green-500 text-white"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Submit"}
            </Button>
            <p className="text-white">
              Register?{" "}
              <NavLink to="/register" className="title-order">
                here
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
