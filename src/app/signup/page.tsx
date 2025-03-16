"use client";
import { useState } from "react";
import { registerWithEmail } from "@/lib/auth";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import Image from "next/image";
const SignUPPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter(); 
  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    await registerWithEmail(email, password);
    setLoading(false);
    router.push("/");
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
        <form className="space-y-6 mt-8">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="button"
            onClick={handleRegistration}
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign up with Email"}
          </button>
        </form>
        <hr className="mt-6"/>

        <p className="mt-6 text-center text-white/50">Have account? <Link  className="text-red-700"  href="/login">login</Link></p>

      </div>
    </div>
    </div>
  );
};

export default SignUPPage;