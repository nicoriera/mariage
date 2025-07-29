export interface NavItem {
  href: string;
  label: string;
}

export interface NavigationProps {
  navItems?: NavItem[];
  logoText?: string;
  className?: string;
}