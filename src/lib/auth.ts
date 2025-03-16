import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "@/lib/firebase";
import Cookies from "js-cookie";

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      const token = await user.getIdToken(); 
      Cookies.set("authToken", token, { expires: 7, path: "/", secure: true, sameSite: "Strict" });
      console.log(" Token stored:", Cookies.get("authToken"));
    }else {
      console.log(" No accessToken found");
    }

    return user;
  } catch (error) {
    console.error(" Error signing in:", error);
    throw new Error("Failed to sign in. Please check your credentials.");
  }
};
export const registerWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering with email:", error);
    throw new Error("Failed to sign in. Please check your credentials.");

  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw new Error("Failed to sign in with Google.");

  }
};

export const logout = async () => {
  try {
    await auth.signOut();
    Cookies.remove("authToken")
    console.log("User logged out");
    return true; 
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
};