import React from "react";
import { cn } from "../../lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: "default" | "elegant" | "accent";
  children: React.ReactNode;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, variant = "default", children, ...props }, ref) => {
    const baseStyles = "font-heading font-semibold tracking-tight";

    const sizes = {
      1: "text-4xl md:text-5xl lg:text-6xl",
      2: "text-3xl md:text-4xl lg:text-5xl",
      3: "text-2xl md:text-3xl lg:text-4xl",
      4: "text-xl md:text-2xl lg:text-3xl",
      5: "text-lg md:text-xl lg:text-2xl",
      6: "text-base md:text-lg lg:text-xl",
    };

    const variants = {
      default: "text-sezane-primary",
      elegant: "text-sezane-primary font-light",
      accent: "text-sezane-accent",
    };

    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return React.createElement(
      Tag,
      {
        ref,
        className: cn(baseStyles, sizes[level], variants[variant], className),
        ...props,
      },
      children
    );
  }
);

Heading.displayName = "Heading";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "base" | "lg" | "xl";
  variant?: "default" | "muted" | "accent";
  children: React.ReactNode;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { className, size = "base", variant = "default", children, ...props },
    ref
  ) => {
    const sizes = {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    const variants = {
      default: "text-sezane-primary",
      muted: "text-sezane-muted",
      accent: "text-sezane-accent font-medium",
    };

    return (
      <p
        ref={ref}
        className={cn(
          "leading-relaxed",
          sizes[size],
          variants[variant],
          className
        )}
        {...props}>
        {children}
      </p>
    );
  }
);

Text.displayName = "Text";

export interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  author?: string;
  variant?: "default" | "elegant";
  children: React.ReactNode;
}

const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ className, author, variant = "default", children, ...props }, ref) => {
    const variants = {
      default:
        "border-l-4 border-sezane-accent pl-6 py-2 italic text-sezane-secondary font-medium text-lg leading-relaxed",
      elegant:
        "text-center italic text-sezane-secondary font-light text-xl leading-relaxed",
    };

    return (
      <blockquote
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}>
        <div className="mb-2">&ldquo;{children}&rdquo;</div>
        {author && (
          <cite className="text-base font-normal text-sezane-muted not-italic block mt-3">
            — {author}
          </cite>
        )}
      </blockquote>
    );
  }
);

Quote.displayName = "Quote";

// Badge élégant pour la galerie
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "rose";
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default:
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sezane-surface text-sezane-secondary border border-sezane",
      accent:
        "inline-flex items-center px-3 py-1 text-sm font-medium text-sezane-accent border border-sezane-accent bg-sezane-accent/10 rounded-full",
      rose: "inline-flex items-center px-3 py-1 text-sm font-medium text-sezane-rose border border-sezane-rose bg-sezane-rose/10 rounded-full",
    };

    return (
      <span ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Heading, Text, Quote, Badge };
