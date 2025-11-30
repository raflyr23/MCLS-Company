// lib/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config"; // Import config dasar yang kita buat tadi

// --- PERBAIKAN UTAMA: Pastikan export ini ada ---
export const {
  handlers,
  auth,       // <--- INI YANG DICARI OLEH LAYOUT ANDA
  signIn,
  signOut,
} = NextAuth({
  ...authConfig, // Gabungkan config dasar (agar middleware & server action sinkron)
  
  // Adapter Database (Hanya jalan di Server)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  
  // Providers yang butuh Node.js Runtime (Bcrypt)
  providers: [
    ...authConfig.providers, // Google Provider dari auth.config.ts
    
    // Credentials Provider (Login Manual)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const email = credentials.email as string;
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user || !user.password) return null;
        
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string, 
          user.password
        );

        if (passwordsMatch) {
          return user;
        }
        return null;
      },
    }),
  ],
});