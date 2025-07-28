import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "elegant" | "accent";
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      inputSize = "md",
      error = false,
      type,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
      default:
        "border border-sezane bg-white text-sezane-primary placeholder:text-sezane-muted focus:border-sezane-accent focus:ring-sezane-accent/20",
      elegant:
        "border border-sezane bg-sezane-surface text-sezane-primary placeholder:text-sezane-muted focus:border-sezane-accent focus:ring-sezane-accent/20",
      accent:
        "border border-sezane-accent bg-sezane-accent/5 text-sezane-primary placeholder:text-sezane-muted focus:border-sezane-accent focus:ring-sezane-accent/20",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm rounded-md",
      md: "h-11 px-4 text-base rounded-lg",
      lg: "h-14 px-6 text-lg rounded-xl",
    };

    const errorStyles = error
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
      : "";

    return (
      <input
        type={type}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[inputSize],
          errorStyles,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "elegant" | "accent";
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = "default",
      inputSize = "md",
      error = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical min-h-[100px]";

    const variants = {
      default:
        "border border-sezane bg-white text-sezane-primary placeholder:text-sezane-muted focus:border-sezane-accent focus:ring-sezane-accent/20",
      elegant:
        "border border-sezane bg-sezane-surface text-sezane-primary placeholder:text-sezane-muted focus:border-sezane-accent focus:ring-sezane-accent/20",
      accent:
        "border border-sezane-accent bg-sezane-accent/5 text-sezane-primary placeholder:text-sezane-muted focus:border-sezane-accent focus:ring-sezane-accent/20",
    };

    const sizes = {
      sm: "h-20 px-3 py-2 text-sm rounded-md",
      md: "h-24 px-4 py-3 text-base rounded-lg",
      lg: "h-32 px-6 py-4 text-lg rounded-xl",
    };

    const errorStyles = error
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
      : "";

    return (
      <textarea
        className={cn(
          baseStyles,
          variants[variant],
          sizes[inputSize],
          errorStyles,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required = false, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block text-sm font-medium text-sezane-primary mb-2",
          className
        )}
        {...props}>
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Input, Textarea, Label };
