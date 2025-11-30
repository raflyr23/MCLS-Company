// app/actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

type RegisterState = {
  message?: string | null;
  success?: boolean;
};

export async function registerUser(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  // Tangkap program dari hidden input
  const program = formData.get("program") as string | null; 

  if (!name || !email || !password || !phone) {
    return { success: false, message: "Mohon lengkapi semua kolom yang wajib diisi." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, message: "Email ini sudah terdaftar. Silakan login." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Gunakan Transaction agar User dan Pendaftaran dibuat bersamaan (atomic)
    await prisma.$transaction(async (tx) => {
      // 1. Buat User
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          address: address || null,
        },
      });

      // 2. Jika ada Program yang dipilih, Buat Pendaftaran
      if (program) {
        await tx.pendaftaran.create({
          data: {
            userId: newUser.id,
            program: program,
            alamat: address || null, // Gunakan alamat yang sama dengan user
            status: "Pending",
          },
        });
      }
    });

    return { success: true, message: "Registrasi berhasil! Silakan login." };

  } catch (error) {
    console.error("Register Error:", error);
    return { success: false, message: "Terjadi kesalahan server. Coba lagi nanti." };
  }
}