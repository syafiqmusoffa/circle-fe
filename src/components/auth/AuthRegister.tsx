import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useRegist } from "@/hooks/use-regist";
import { registSchema, RegistSchemaDTO } from "@/utils/schemas/AuthTypes";
import { Input } from "../ui/input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
function AuthRegister() {
  const navigate = useNavigate()
  const {  isPending, showPassword, setShowPassword, mutateRegist } = useRegist()
    const [showConfirmPassword, setShowConfirmPassword]=useState(false);
  const { register, handleSubmit, formState:{errors} } = useForm<RegistSchemaDTO>({
    resolver: zodResolver(registSchema),
  });
  const onSubmit = async (data: RegistSchemaDTO) => {
    await mutateRegist(data);

    navigate("/login");
  };
  return (
    <>
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="border p-10 rounded-3xl w-full max-w-md bg-[#2a2b2a] ">
          <p className="title-form text-6xl font-extrabold text-center">
            Circle
          </p>
          <p className="title-order text-center text-xl mb-7">
            Create account Circle
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <Input
                className="form-input w-full border-2 p-1 rounded-2xl border-gray-500 text-m text-white"
                type="text"
                id="username"
                placeholder="Username"
                required
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
              <Input
                className="form-input w-full border-2 p-1 rounded-2xl border-gray-500 text-m text-white"
                type="text"
                id="email"
                placeholder="Email"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <div className="relative">
                <Input
                  className="form-input w-full border-2 p-1 rounded-2xl border-gray-500 text-m text-white"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
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
              <div className="relative">
                <Input
                  className="form-input w-full border-2 p-1 rounded-2xl border-gray-500 text-m text-white"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  {...register("confirmPassword")}
                />
                <Button
                  type="button"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  className="absolute right-2 top-0 text-white bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                  variant={"ghost"}
                >
                  {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
              </div>

              <Button
                className="form-button-order bg-green-800 hover:bg-green-500 text-white cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Regist..." : "Submit"}
              </Button>

              <p className="text-white">
                Already have account?{" "}
                <NavLink to="/login" className="title-order">
                  login
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthRegister;
