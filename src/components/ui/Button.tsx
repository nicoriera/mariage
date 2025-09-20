import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "accent"
    | "elegant";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#9db380] text-white hover:bg-[#8ba370] focus:ring-[#9db380] shadow-sm hover:shadow-md",
      secondary:
        "bg-[#e8b3b3] text-white hover:bg-[#f4d7d7] focus:ring-[#e8b3b3] shadow-sm hover:shadow-md",
      outline:
        "border-2 border-[#9db380] text-[#9db380] hover:bg-[#9db380] hover:text-white focus:ring-[#9db380]",
      ghost:
        "text-[#5a5a5a] hover:bg-[#f3f1ef] hover:text-[#2a2a2a] focus:ring-[#9db380]",
      accent:
        "bg-[#9db380] text-white hover:bg-[#8ba370] focus:ring-[#9db380] shadow-sm hover:shadow-md",
      elegant:
        "text-white border border-white/70 bg-white/10 hover:bg-white/20 focus:ring-white/60 backdrop-blur-sm",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm rounded-md",
      md: "h-11 px-6 text-base rounded-lg",
      lg: "h-14 px-8 text-lg rounded-xl",
    };

    return (
      <button
        className={cn(
          baseStyles,
          "cursor-pointer",
          variants[variant],
          sizes[size],
          loading && "cursor-wait",
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
