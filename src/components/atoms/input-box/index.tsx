"use client";

interface InputBoxProps {
  label: string;
  placeholder?: string;
  type?: string;
  err?: boolean;
  [key: string]: any;
}

export function InputBox({
  label,
  placeholder,
  type = "text",
  err = false,
  ...props
}: InputBoxProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border ${
          err ? "border-error" : "border-border-input"
        } bg-input placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
        {...props}
      />
    </div>
  );
}
