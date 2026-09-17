"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-background-secondary text-foreground hover:bg-border",
    outline: "border border-border text-foreground hover:bg-background-secondary",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
