"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiBell, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { Modal } from "@/components/molecules/modal";
import { Button } from "@/components/atoms/button";
import { useStore } from "@/store";

export function Navbar() {
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

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
      <header className="border-b border-border bg-background">
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <h1 className="text-xl font-bold text-heading shrink-0">
              TaskFlow
            </h1>

            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex flex-1 max-w-md">
                  <label htmlFor="global-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <FiSearch
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50"
                      aria-hidden="true"
                    />
                    <input
                      id="global-search"
                      type="search"
                      placeholder="Search anything..."
                      className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <ThemeToggle />

                  <button
                    type="button"
                    className="relative p-2 rounded-lg text-foreground hover:bg-foreground/5 transition-colors"
                    aria-label="Notifications"
                  >
                    <FiBell className="w-5 h-5" />
                    <span
                      className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"
                      aria-hidden="true"
                    />
                  </button>

                  {/* User menu */}
                  <div className="relative" ref={menuRef}>
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen((open) => !open)}
                      className="flex items-center gap-1.5 rounded-lg p-1 hover:bg-foreground/5 transition-colors"
                      aria-haspopup="menu"
                      aria-expanded={isMenuOpen}
                      aria-label="User menu"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-semibold">
                        {initials || <FiUser className="w-4 h-4" />}
                      </span>
                      <FiChevronDown
                        className={`w-4 h-4 text-foreground/60 transition-transform ${
                          isMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isMenuOpen && (
                      <div
                        role="menu"
                        className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-background shadow-lg py-1 z-50"
                      >
                        <div className="px-4 py-2 border-b border-border">
                          <p className="text-sm font-medium text-heading truncate">
                            {user?.name}
                          </p>
                          {user?.email && (
                            <p className="text-xs text-foreground/60 truncate">
                              {user.email}
                            </p>
                          )}
                        </div>
                        <button
                          role="menuitem"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsLogoutModalOpen(true);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition-colors"
                        >
                          <FiLogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <a
                  href="/login"
                  className="text-foreground hover:text-primary transition-colors text-sm"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Logout"
      >
        <div className="space-y-4">
          <p className="text-foreground">
            Are you sure you want to log out? You will need to sign in again
            to access your account.
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