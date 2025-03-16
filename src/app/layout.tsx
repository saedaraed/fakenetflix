"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";  
import "./globals.css";
import Navbar from "@/components/Navbar";
import SplashScreen from "./splash/page"; 
import Head from "next/head"; 
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { WatchlistProvider } from '../context/WatchListContext'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [showSplash, setShowSplash] = useState(true); 
  const pathname = usePathname();  

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      setShowSplash(false); 
    } else {
      sessionStorage.setItem("hasSeenSplash", "true"); 
      setTimeout(() => {
        setShowSplash(false); 
      }, 2000);
    }
  }, []); 

  const hideFooter = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Head>
          <title>Fake Netflix</title>
          <meta name="description" content="Fake Netflix site for movies" />
        </Head>

        {showSplash ? (
          <SplashScreen />
        ) : (
          <>
            <WatchlistProvider>   <Navbar /> 
            {children}  
            {!hideFooter && <Footer />}</WatchlistProvider>
         
          </>
        )}
      </body>
    </html>
  );
}
