import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useForgotPassword } from "@/hooks/use-auth-forgot";
import { useState } from "react";

function AuthForgot() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, isError } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="border p-10 rounded-3xl w-full max-w-md bg-[#2a2b2a]  ">
          <p className="title-form text-6xl font-extrabold text-center">
            Circle
          </p>
          <p className="title-order text-center text-xl mb-7">
            Forgot Password
          </p>
          <div className="flex flex-col gap-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="form-input w-full border-2 p-1 rounded-2xl border-gray-500 text-m text-white"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <Button
              className="form-button-order bg-green-800"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Mengirim..." : "Kirim Link Reset"}
            </Button>
          </div>

          <p className="text-white">
            Already have account?{" "}
            <NavLink to="/login" className="title-order">
              login
            </NavLink>
          </p>
          {isSuccess && (
            <p className="text-green-500 mt-2">
              Cek email untuk reset password.
            </p>
          )}
          {isError && (
            <p className="text-red-500 mt-2">Terjadi kesalahan, coba lagi.</p>
          )}
        </div>
      </div>
    </form>
  );
}

export default AuthForgot;
