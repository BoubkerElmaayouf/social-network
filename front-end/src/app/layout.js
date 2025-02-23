"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "./page";
// import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
    // useEffect(() => {
    //   document
    //     .querySelectorAll("[cz-shortcut-listen]")
    //     .forEach((el) => el.removeAttribute("cz-shortcut-listen"));
    // }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.png"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
            {/* <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div> */}
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
