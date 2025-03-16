"use client";
import { useState } from "react";
import { signInWithEmail, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleEmailLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await signInWithEmail(email, password);
      console.log("success login", user);
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (err) {
      console.error("failed login:", error);

      setError("email or password invalid");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signInWithGoogle();
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
          <h2 className="text-2xl font-bold  text-white">Sign In</h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form className="space-y-6 mt-8 ">
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
            <button
              type="button"
              onClick={handleEmailLogin}
              className="w-full bg-red-700 text-white py-3 rounded-md hover:bg-red-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login with Email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-white">OR</span>
            <button
              onClick={handleGoogleLogin}
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
