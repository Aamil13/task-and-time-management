"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/atoms/logo";
import { SidebarNavItem } from "@/components/molecules/sideNavItems";
import { PRIMARY_NAV } from "@/lib/sideNav";
import { usePathname } from "next/navigation";


export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <aside
      aria-label="Primary"
      className="fixed inset-y-0 left-0 z-40 hidden w-[76px] flex-col items-center justify-between border-r border-border bg-background py-2 md:flex"
    >
      <Logo />

      <nav aria-label="Main navigation" className="flex flex-col gap-1.5 rounded-2xl bg-background-secondary p-2">
        {PRIMARY_NAV.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            active={pathname === item.href}
          />
        ))}
      </nav>

      {/* spacer to balance the logo's height so the nav pill stays visually centered */}
      <div className="h-9 w-9" aria-hidden />
    </aside>
  );
}