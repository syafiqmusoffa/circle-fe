import { useResetPassword } from "@/hooks/use-auth-forgot";
import { Button } from "../ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function ResetPass() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const { mutate, isPending, isSuccess, isError, error } = useResetPassword();
  if (!token) {
    return <p className="text-red-500 text-3xl text-center ">Token tidak ditemukan di URL</p>;
  }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      mutate(
        { token, newPassword,confirmPassword },
        {
          onSuccess: () => {
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          },
        }
      );
  };

  return (
    <div className="p-8 flex items-center justify-center min-h-screen">
      <div className="border p-10 rounded-3xl w-full max-w-md bg-[#2a2b2a] ">
        <p className="title-form text-6xl font-extrabold text-center">Circle</p>
        <p className="title-order text-center text-xl mb-7">Reset Password</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                className="form-input w-full border-2 p-1 rounded-2xl border-gray-500 text-m text-white"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <div className="relative">
              <input
                className="form-input w-full border-2 p-1 rounded-2xl border-gray-500 text-m text-white"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              className="form-button-order bg-green-800 cursor-pointer text-white"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Menyimpan..." : "Reset Password"}
            </Button>
          </div>
          {isSuccess && (
            <p className="text-green-500 mt-2">Password berhasil direset!</p>
          )}
          {isError && (
            <p className="text-red-500 mt-2">
              {(error as any)?.response?.data?.message ??
                (error as any)?.response?.data?.error ??
                "Terjadi kesalahan."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPass;
