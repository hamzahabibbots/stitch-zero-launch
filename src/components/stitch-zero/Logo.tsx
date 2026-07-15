import React from "react";
import logoImg from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  variant?: "dark-text" | "light-text" | "mark-only";
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <img 
      src={logoImg} 
      alt="Stitch Zero Logo" 
      className={`${className} object-contain`}
    />
  );
}
