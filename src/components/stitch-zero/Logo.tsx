import React from "react";

interface LogoProps {
  className?: string;
  variant?: "dark-text" | "light-text" | "mark-only";
}

export default function Logo({ className = "h-10", variant = "dark-text" }: LogoProps) {
  // Burgundy circle color: #5E1930
  // Peach loop/thread color: #F0C0B5
  
  if (variant === "mark-only") {
    return (
      <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Burgundy Circle */}
        <circle cx="40" cy="40" r="36" fill="#5E1930" />
        
        {/* Needle Line */}
        <line x1="26" y1="54" x2="54" y2="26" stroke="#F0C0B5" strokeWidth="4.5" strokeLinecap="round" />
        
        {/* Needle Eye */}
        <circle cx="50" cy="30" r="1.5" fill="#5E1930" />
        
        {/* Thread Loop */}
        <path
          d="M 28 32 C 18 36, 20 48, 30 48 C 42 48, 48 32, 50 30 C 53 27, 56 22, 48 20 C 38 18, 28 26, 32 36"
          stroke="#F0C0B5"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  const textColor = variant === "dark-text" ? "#1A1A1A" : "#FFFFFF";
  const accentColor = variant === "dark-text" ? "#5E1930" : "#F0C0B5";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg className="h-full aspect-square" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Burgundy Circle */}
        <circle cx="40" cy="40" r="36" fill="#5E1930" />
        
        {/* Needle Line */}
        <line x1="26" y1="54" x2="54" y2="26" stroke="#F0C0B5" strokeWidth="4.5" strokeLinecap="round" />
        
        {/* Needle Eye */}
        <circle cx="50" cy="30" r="1.5" fill="#5E1930" />
        
        {/* Thread Loop */}
        <path
          d="M 28 32 C 18 36, 20 48, 30 48 C 42 48, 48 32, 50 30 C 53 27, 56 22, 48 20 C 38 18, 28 26, 32 36"
          stroke="#F0C0B5"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span 
          className="font-display text-lg font-bold tracking-tight" 
          style={{ color: textColor }}
        >
          Stitch
        </span>
        <span 
          className="font-display text-lg font-light tracking-wide uppercase" 
          style={{ color: accentColor }}
        >
          Zero
        </span>
      </div>
    </div>
  );
}
