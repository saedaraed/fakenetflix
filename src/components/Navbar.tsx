"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { logout } from '@/lib/auth';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('authToken'); // قراءة التوكن من الكوكيز
    setIsAuthenticated(!!token); // إذا كان هناك توكن، يعني المستخدم مسجل دخوله
  }, []);

  const handleLogout = async () => {
    console.log('logout')
    const sessionId = Cookies.get("sessionId"); // جلب الـ sessionId من الكوكيز
    if (sessionId) {
      const success = await logout(sessionId);
      if (success) {
        setIsAuthenticated(false);
        router.push("/login"); // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول بعد تسجيل الخروج
      }
    }
  };
  return (
    <nav className='bg-green-500 flex justify-between p-5 h-[50px]'>
      <h1>Fake Netflix</h1>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => router.push('/login')}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
