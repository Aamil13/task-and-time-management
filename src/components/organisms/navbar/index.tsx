"use client";

import { ThemeToggle } from "@/components/atoms/theme-toggle";

export function Navbar() {
  return (
    <header className="border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-heading">TaskFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
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
          </div>
        </div>
      </nav>
    </header>
  );
}
