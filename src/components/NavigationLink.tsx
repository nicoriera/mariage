import React from 'react';
import Link from 'next/link';
import { cn } from '../lib/utils';
import type { NavItem } from '../types/navigation';

interface NavigationLinkProps extends NavItem {
  isActive: boolean;
  variant?: 'desktop' | 'mobile';
  onClick?: () => void;
}

const NavigationLink = React.memo<NavigationLinkProps>(({ 
  href, 
  label, 
  isActive, 
  variant = 'desktop',
  onClick 
}) => {
  if (variant === 'mobile') {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "block px-3 py-2 text-base font-heading font-medium rounded-md transition-all duration-200",
          isActive
            ? "text-june-accent bg-june-accent/10"
            : "text-june-secondary hover:text-june-primary hover:bg-june-surface"
        )}>
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-heading font-medium transition-all text-june-secondary hover:text-june-primary duration-200 relative",
        isActive
          ? "text-june-accent"
          : "text-june-secondary hover:text-june-primary"
      )}>
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-june-accent" />
      )}
    </Link>
  );
});

NavigationLink.displayName = 'NavigationLink';

export default NavigationLink;