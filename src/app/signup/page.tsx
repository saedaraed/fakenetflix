"use client";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Image from "next/image";
import { SignUpFormData } from "@/types/types";
import { useAuth } from "../../hooks/useAuth";

const SignUPPage = () => {
  const { registerWithEmailAndPassword, loading, error } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    await registerWithEmailAndPassword(data.email, data.password);
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
          <h2 className="text-2xl font-bold  text-white">Sign Up</h2>
          <form className="space-y-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
                          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            </div>
            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign up with Email"}
            </button>
          </form>
          <hr className="mt-6" />

          <p className="mt-6 text-center text-white/50">
            Have account?{" "}
            <Link className="text-red-700" href="/login">
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUPPage;
