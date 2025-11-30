// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Menambahkan 'role' ke tipe Session user
   */
  interface Session {
    user: {
      role: string; // Atau bisa lebih spesifik: "ADMIN" | "USER"
    } & DefaultSession["user"]
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Menambahkan 'role' ke tipe JWT
   */
  interface JWT {
    role: string;
  }
}