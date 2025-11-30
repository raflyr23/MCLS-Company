"use client"; // Wajib use client agar refresh otomatis

import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function SignOutButton({ className, children }: SignOutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })} // Redirect ke home setelah logout
      className={className}
      type="button"
    >
      {children || "Keluar"}
    </button>
  );
}