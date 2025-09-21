import React from "react";
import Link from "next/link";
import { cn } from "../lib/utils";
import type { NavItem } from "../types/navigation";

interface NavigationLinkProps extends NavItem {
  isActive: boolean;
  variant?: "desktop" | "mobile";
  onClick?: () => void;
}

const NavigationLink = React.memo<NavigationLinkProps>(
  ({ href, label, isActive, variant = "desktop", onClick }) => {
    if (variant === "mobile") {
      return (
        <Link
          href={href}
          onClick={onClick}
          className={cn(
            "block px-3 py-2 text-base font-heading font-medium rounded-md transition-colors duration-150",
            isActive ? "text-black" : "text-black/70 hover:text-black"
          )}>
          {label}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          "text-sm font-heading font-medium transition-colors text-black/70 hover:text-black duration-150 relative",
          isActive ? "text-black" : ""
        )}>
        {label}
      </Link>
    );
  }
);

NavigationLink.displayName = "NavigationLink";

export default NavigationLink;
