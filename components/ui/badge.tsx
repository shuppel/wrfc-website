import { cn } from "@/app/utils"
import React, { ReactNode } from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  icon?: ReactNode;
  variant?: "default" | "outline" | "glow";
  index?: number;
}

export function Badge({ 
  text, 
  icon,
  variant = "default", 
  index = 0,
  className,
  ...props 
}: BadgeProps) {
  const baseStyles = "px-4 py-2 rounded-lg transform transition-all duration-500 font-mono text-sm whitespace-nowrap flex items-center gap-2"
  
  const variants = {
    default: "bg-wrfc-blue-100/80 dark:bg-wrfc-blue-900/30 text-wrfc-blue-700 dark:text-wrfc-blue-300 hover:scale-105 hover:bg-wrfc-blue-200 dark:hover:bg-wrfc-blue-800/40 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all",
    outline: "border-2 border-wrfc-blue-200 dark:border-wrfc-blue-800 text-wrfc-blue-700 dark:text-wrfc-blue-300 hover:border-wrfc-blue-300 dark:hover:border-wrfc-blue-700 hover:bg-wrfc-blue-100/10 transition-all",
    glow: "bg-wrfc-blue-100/10 backdrop-blur-sm dark:bg-wrfc-blue-900/10 text-wrfc-blue-700 dark:text-wrfc-blue-300 hover:scale-105 hover:bg-wrfc-blue-100/20 dark:hover:bg-wrfc-blue-800/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={{
        animation: `fadeInSlide 600ms ${index * 100}ms ease-out forwards`,
        opacity: 0,
        transform: 'translateY(10px)'
      }}
      {...props}
    >
      {icon}
      {text}
    </div>
  )
} 