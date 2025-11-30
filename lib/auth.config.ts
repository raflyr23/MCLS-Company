import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    // Google aman untuk Edge Runtime, jadi kita taruh di sini
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // Catatan: Credentials Provider TIDAK ditaruh di sini karena butuh bcrypt
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-expect-error: Property role belum ada di tipe default
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-expect-error: Property role belum ada di tipe default
        session.user.role = token.role as "ADMIN" | "USER";
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Selalu arahkan ke base URL (Homepage) setelah login apapun
      if (url === baseUrl || url === "/") {
        return baseUrl;
      }
      return url;
    },
  },
} satisfies NextAuthConfig;