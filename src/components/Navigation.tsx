"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useNavigation } from "../hooks/useNavigation";
import {
  useKeyboardNavigation,
  useFocusTrap,
} from "../hooks/useKeyboardNavigation";
import NavigationLink from "./NavigationLink";
import MobileMenuIcon from "./MobileMenuIcon";
import type { NavigationProps, NavItem } from "../types/navigation";
import { env } from "../lib/env";

const defaultNavItems: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/infos", label: "Informations" },
  { href: "/galerie", label: "Galerie" },
  { href: "/rsvp", label: "Confirmer" },
];

const Navigation = React.memo<NavigationProps>(
  ({ navItems = defaultNavItems, logoText = "Mariage", className }) => {
    const { isMenuOpen, toggleMenu, closeMenu, isActive } = useNavigation();
    const [isAfterWedding, setIsAfterWedding] = React.useState(false);
    React.useEffect(() => {
      setIsAfterWedding(new Date() >= new Date(`${env.WEDDING_DATE}T00:00:00`));
    }, []);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Keyboard navigation for mobile menu
    useKeyboardNavigation({
      onEscape: () => {
        if (isMenuOpen) {
          closeMenu();
        }
      },
      enabled: isMenuOpen,
    });

    // Focus trap for mobile menu
    useFocusTrap(mobileMenuRef as React.RefObject<HTMLElement>, isMenuOpen);

    return (
      <nav
        className={`bg-white/95 backdrop-blur-sm border-b border-june sticky top-0 z-50 px-4 py-2 ${
          className || ""
        }`}>
        <div className="container-june">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-heading font-semibold text-june-primary hover:text-june-accent transition-all duration-200">
              {logoText}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {(navItems || defaultNavItems)
                .filter((item) =>
                  item.href === "/galerie" ? isAfterWedding : true
                )
                .map((item) => (
                  <NavigationLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={isActive(item.href)}
                    variant="desktop"
                  />
                ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-june-secondary hover:text-june-primary transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}>
              <MobileMenuIcon isOpen={isMenuOpen} className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="md:hidden border-t border-june bg-white"
              role="menu"
              aria-label="Navigation mobile">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {(navItems || defaultNavItems)
                  .filter((item) =>
                    item.href === "/galerie" ? isAfterWedding : true
                  )
                  .map((item) => (
                    <NavigationLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      isActive={isActive(item.href)}
                      variant="mobile"
                      onClick={closeMenu}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
);

Navigation.displayName = "Navigation";

export default Navigation;
