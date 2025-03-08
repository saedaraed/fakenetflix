import axios from "axios";
import Cookies from "js-cookie";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getRequestToken = async () => {
  const res = await axios.get(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
  return res.data.request_token;
};

export const createSession = async (requestToken: string) => {
  const res = await axios.post(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
    request_token: requestToken,
  });
  return res.data.session_id;
};

export const getUserDetails = async (sessionId: string) => {
  const res = await axios.get(`${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`);
  return res.data;
};

export const logout = async (sessionId: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/authentication/session?api_key=${API_KEY}`, {
      data: { session_id: sessionId }, // إرسال الـ session_id للحذف
    });

    if (res.status === 200) {
      Cookies.remove("authToken"); // حذف التوكن من الكوكيز
      Cookies.remove("sessionId"); // حذف الـ sessionId من الكوكيز أيضًا
      console.log("User logged out, authToken removed."); // للتأكد أن الدالة تعمل

      return true;
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
  return false;
};