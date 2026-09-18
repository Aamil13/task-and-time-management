"use client";

import { Sidebar } from "@/components/organisms/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex flex-col bg-background ">
      <Sidebar />
      <div className="flex-1 md:pl-[76px]">{children}</div>
    </div>
  );
}
