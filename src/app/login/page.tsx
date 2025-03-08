"use client";
import { useState } from "react";
import { getRequestToken } from "@/lib/auth";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const requestToken = await getRequestToken();
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}`;
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Redirecting..." : "Login with TMDB"}
      </button>
    </div>
  );
};

export default LoginPage;
