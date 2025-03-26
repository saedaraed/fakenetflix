import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmail, signInWithGoogle, registerWithEmail } from "@/lib/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithEmail(email, password);
      console.log("Success login", user);
      router.replace("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await registerWithEmail(email, password);
      router.push("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loginWithEmail, loginWithGoogle, registerWithEmailAndPassword, loading, error };
};
