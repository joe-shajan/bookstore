"use client";

import { cn } from "@/lib";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  className?: string;
}

const defaultButtonClasses =
  "bg-black text-white px-4 h-9 inline-flex items-center justify-center rounded-md text-sm font-medium";

export function Button({
  className,
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button className={cn(defaultButtonClasses, className)} {...props}>
      {children}
    </button>
  );
}
