"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
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

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="border-b border-border bg-background">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-heading">TaskFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <>
                  <span className="text-foreground">{user?.name}</span>
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    aria-label="Logout"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
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
            Are you sure you want to log out? You will need to sign in again to
            access your account.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsLogoutModalOpen(false)}
            >
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
