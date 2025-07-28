import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'elegant';
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', error = false, ...props }, ref) => {
    const baseStyles = "w-full px-4 py-3 text-base transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-stone-400";
    
    const variants = {
      default: "border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent",
      elegant: "border-0 border-b-2 border-stone-300 rounded-none bg-transparent focus:outline-none focus:border-stone-600 px-0"
    };

    const errorStyles = error 
      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
      : "";

    return (
      <input
        className={cn(
          baseStyles,
          variants[variant],
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

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'elegant';
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', error = false, ...props }, ref) => {
    const baseStyles = "w-full px-4 py-3 text-base transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-stone-400 resize-vertical min-h-[100px]";
    
    const variants = {
      default: "border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent",
      elegant: "border-0 border-b-2 border-stone-300 rounded-none bg-transparent focus:outline-none focus:border-stone-600 px-0"
    };

    const errorStyles = error 
      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
      : "";

    return (
      <textarea
        className={cn(
          baseStyles,
          variants[variant],
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

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required = false, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-medium text-stone-700 mb-2",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
);

Label.displayName = "Label";

export { Input, Textarea, Label };