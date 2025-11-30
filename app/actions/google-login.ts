// app/actions/google-login.ts
"use server";

import { signIn } from "@/lib/auth";

export async function googleAuthenticate() {
  try {
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    // Auth.js melempar error saat redirect, kita perlu melemparnya kembali
    // agar redirect berhasil
    throw error;
  }
}