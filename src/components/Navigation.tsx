"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Users, Info, Calendar, Camera } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { href: '/', label: 'Accueil', icon: Heart },
  { href: '/rsvp', label: 'RSVP', icon: Calendar },
  { href: '/galerie', label: 'Galerie', icon: Camera },
  { href: '/invites', label: 'Invités', icon: Users },
  { href: '/infos', label: 'Infos', icon: Info },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Titre */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-stone-600" />
            <span className="font-heading font-semibold text-xl text-stone-800">
              Sandra & Nicolas
            </span>
          </Link>

          {/* Navigation principale - Desktop */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium",
                    isActive
                      ? "bg-stone-900 text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Navigation mobile - Bottom nav style */}
          <div className="md:hidden">
            <Link
              href="/rsvp"
              className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
            >
              RSVP
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation mobile sticky bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center py-2 px-3 transition-all duration-200",
                  isActive
                    ? "text-stone-900"
                    : "text-stone-500"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 mb-1",
                  isActive ? "text-stone-900" : "text-stone-500"
                )} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}