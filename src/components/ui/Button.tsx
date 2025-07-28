import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
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
        "bg-sezane-primary text-white hover:bg-gray-800 focus:ring-gray-600 shadow-sezane-sm hover:shadow-sezane-md",
      secondary:
        "bg-sezane-rose text-white hover:bg-rose-600 focus:ring-rose-500 shadow-sezane-sm hover:shadow-sezane-md",
      outline:
        "border-2 border-sezane-accent text-sezane-accent hover:bg-sezane-accent hover:text-white focus:ring-amber-400",
      ghost:
        "text-sezane-secondary hover:bg-sezane-surface hover:text-sezane-primary focus:ring-gray-400",
      accent:
        "bg-sezane-accent text-white hover:bg-amber-500 focus:ring-amber-400 shadow-sezane-sm hover:shadow-sezane-md",
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
