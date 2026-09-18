"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/atoms/logo";
import { SidebarNavItem } from "@/components/molecules/sideNavItems";
import { PRIMARY_NAV } from "@/lib/sideNav";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";

export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isOpen = useStore((state) => state.sidebarOpen);
  const closeSidebar = useStore((state) => state.closeSidebar);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Primary"
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-[76px] flex-col items-center justify-between border-r border-border bg-background py-2 transition-transform duration-200",
          // Mobile: slide in/out; Desktop: always visible
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
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
    </>
  );
}
