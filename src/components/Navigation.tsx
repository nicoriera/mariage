"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/infos", label: "Informations" },
    { href: "/galerie", label: "Galerie" },
    { href: "/rsvp", label: "RSVP" },
    { href: "/invites", label: "Invités" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-sezane sticky top-0 z-50">
      <div className="container-sezane">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-heading font-semibold text-sezane-primary hover:text-sezane-accent transition-all duration-200">
            Mariage
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-200 relative",
                  isActive(item.href)
                    ? "text-sezane-accent"
                    : "text-sezane-secondary hover:text-sezane-primary"
                )}>
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-sezane-accent" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-sezane-secondary hover:text-sezane-primary transition-all duration-200"
            aria-label="Toggle menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              {isMenuOpen ? (
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
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-sezane bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-all duration-200",
                    isActive(item.href)
                      ? "text-sezane-accent bg-sezane-accent/10"
                      : "text-sezane-secondary hover:text-sezane-primary hover:bg-sezane-surface"
                  )}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
