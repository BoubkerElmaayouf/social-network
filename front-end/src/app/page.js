"use client";
// import { Login } from "./login/page.js"
import Image from "next/image";
import Link from "next/link";
import "./page.module.css";

export default function Home() {
  return (
   <a href="/login">iluhESFLKHZE</a>
  )
}

export function Navbarrend({ NavButton }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-section">
          <Link href="/" className="logo-link">
            <Image 
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="logo-image"
            />
            <span className="logo-text">UNION</span>
          </Link>
        </div>
        {NavButton && <NavButton />} {/* Render the passed component */}
      </div>
    </nav>
  );
}

export function Footer() { 
  return (
    <footer className="footer">
      <p>&copy; 2025 Union. All rights reserved.</p>
    </footer>
  )
}

