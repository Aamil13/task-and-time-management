"use client";

interface InputWarningTextProps {
  children: React.ReactNode;
}

export function InputWarningText({ children }: InputWarningTextProps) {
  return <span className="text-sm text-error">{children}</span>;
}
