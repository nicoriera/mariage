import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";

interface UseNavigationReturn {
  isMenuOpen: boolean;
  pathname: string;
  toggleMenu: () => void;
  closeMenu: () => void;
  isActive: (href: string) => boolean;
}

export function useNavigation(): UseNavigationReturn {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      return pathname === href;
    },
    [pathname]
  );

  return {
    isMenuOpen,
    pathname,
    toggleMenu,
    closeMenu,
    isActive,
  };
}
