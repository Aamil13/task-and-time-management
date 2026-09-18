"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiUser,
  FiMenu,
  FiArrowRight,
} from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { Modal } from "@/components/molecules/modal";
import { Button } from "@/components/atoms/button";
import { useStore } from "@/store";

export function Navbar() {
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <>
      <header className="  border-b border-border bg-background">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* ── Left: hamburger (mobile) + brand ── */}
            <div className="flex items-center gap-2 shrink-0">
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg text-foreground hover:bg-foreground/5 transition-colors md:hidden"
                  aria-label="Open navigation menu"
                >
                  <FiMenu className="w-5 h-5" />
                </button>
              )}

              {/* Brand — hidden on md+ when authenticated (sidebar shows the logo) */}
              <a
                href={isAuthenticated ? "/dashboard" : "/"}
                className={`flex items-center gap-2.5 ${isAuthenticated ? "md:hidden" : ""}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm shadow-indigo-500/30">
                  <AiFillThunderbolt className="h-4 w-4 text-white" aria-hidden />
                </div>
                <span className="text-lg font-bold text-heading tracking-tight">
                  Task<span className="text-primary">Flow</span>
                </span>
              </a>
            </div>

            {/* ── Right: actions ── */}
            {isAuthenticated ? (
              <>
                {/* Search — hidden on small screens */}
                <div className="hidden sm:flex flex-1 max-w-xs lg:max-w-md">
                  <label htmlFor="global-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                    <FiSearch
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                      aria-hidden="true"
                    />
                    <input
                      id="global-search"
                      type="search"
                      placeholder="Search anything…"
                      className="w-full rounded-lg border border-border bg-input pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <ThemeToggle />

                  {/* Notifications */}
                  <button
                    type="button"
                    className="relative p-2 rounded-lg text-foreground hover:bg-foreground/5 transition-colors"
                    aria-label="Notifications"
                  >
                    <FiBell className="w-5 h-5" />
                    <span
                      className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"
                      aria-hidden="true"
                    />
                  </button>

                  {/* Divider */}
                  <div className="h-6 w-px bg-border mx-1 hidden sm:block" aria-hidden />

                  {/* User menu */}
                  <div className="relative" ref={menuRef}>
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen((open) => !open)}
                      className="flex items-center gap-1.5 rounded-lg px-1 py-1 hover:bg-foreground/5 transition-colors"
                      aria-haspopup="menu"
                      aria-expanded={isMenuOpen}
                      aria-label="User menu"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-xs font-semibold shadow-sm shadow-indigo-500/20">
                        {initials || <FiUser className="w-4 h-4" />}
                      </span>
                      {user?.name && (
                        <span className="hidden sm:block text-sm font-medium text-foreground max-w-[100px] truncate">
                          {user.name.split(" ")[0]}
                        </span>
                      )}
                      <FiChevronDown
                        className={`w-3.5 h-3.5 text-text-muted transition-transform duration-150 ${
                          isMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isMenuOpen && (
                      <div
                        role="menu"
                        className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-background shadow-xl shadow-black/10 py-1.5 z-50"
                      >
                        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border mb-1">
                          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-semibold shrink-0">
                            {initials || <FiUser className="w-4 h-4" />}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-heading truncate">{user?.name}</p>
                            {user?.email && (
                              <p className="text-xs text-text-secondary truncate">{user.email}</p>
                            )}
                          </div>
                        </div>
                        <button
                          role="menuitem"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsLogoutModalOpen(true);
                          }}
                          className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition-colors"
                        >
                          <FiLogOut className="w-4 h-4 text-text-secondary" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Unauthenticated — matches home page navbar style */
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <a
                  href="/login"
                  className="hidden sm:inline-flex text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-1.5"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get started
                  <FiArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Logout confirmation modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Logout"
      >
        <div className="space-y-4">
          <p className="text-foreground">
            Are you sure you want to log out? You will need to sign in again to
            access your account.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsLogoutModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
