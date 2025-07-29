import React from 'react';

interface MobileMenuIconProps {
  isOpen: boolean;
  className?: string;
}

const MobileMenuIcon = React.memo<MobileMenuIconProps>(({ isOpen, className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    {isOpen ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    )}
  </svg>
));

MobileMenuIcon.displayName = 'MobileMenuIcon';

export default MobileMenuIcon;