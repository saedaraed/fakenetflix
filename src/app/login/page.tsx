"use client";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const { loginWithEmail, loginWithGoogle, loading, error } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginWithEmail(data.email, data.password);
  };


  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <Image
        src="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_auth_bg.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority
        className="absolute inset-0 -z-10"
      />

      <div className="absolute inset-0 bg-[black]/50"></div>
      <div className="relative z-10 w-full max-w-md p-8 rounded-lg shadow-lg bg-black/20 backdrop-blur-md">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white/20">
          <h2 className="text-2xl font-bold  text-white">Sign In</h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form className="space-y-6 mt-8 "  onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Email"
             />
            </div>
            <div>
              <input
                type="password"
              {...register("password")}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Password"

             />
            </div>
            <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-white">OR</span>
            <button
              onClick={loginWithGoogle}
              className="w-full mt-4 border border-white text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {loading ? "Logging in..." : "Login with Google"}
            </button>
          </div>
          <hr className="mt-6"/>
          <p className="mt-4 text-center text-white/50">
            Don’t have account? <Link className="text-red-700" href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
