// app/pendaftaran/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Skema validasi (Hanya validasi apa yang perlu disimpan di tabel Pendaftaran)
const PendaftaranSchema = z.object({
  program: z.string().min(1, "Program harus dipilih"),
  alamat: z.string().optional(),
  userId: z.string().min(1, "User ID tidak valid"),
});

export type State = {
  message?: string | null;
  success: boolean;
  errors?: {
    program?: string[];
    alamat?: string[];
  };
};

export async function createPendaftaran(
  prevState: State,
  formData: FormData
): Promise<State> {
  // 1. Ambil data dari form
  const validatedFields = PendaftaranSchema.safeParse({
    program: formData.get("program"),
    alamat: formData.get("alamat"),
    userId: formData.get("userId"), // Ini diambil dari hidden input
  });

  // 2. Jika validasi gagal
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal mendaftar. Periksa data Anda.",
    };
  }

  const { program, alamat, userId } = validatedFields.data;

  try {
    // 3. Simpan ke database (Tabel Pendaftaran)
    // Perhatikan: Kita TIDAK menyimpan 'nama', 'email', dll di sini.
    await prisma.pendaftaran.create({
      data: {
        program: program,
        alamat: alamat || null,
        userId: userId, // Menghubungkan kursus ini dengan User yang login
      },
    });

    revalidatePath("/profile"); // Update halaman profile agar data baru muncul
    return {
      success: true,
      message: "Pendaftaran berhasil! Cek status di profil Anda.",
    };

  } catch (error) {
    console.error("Error createPendaftaran:", error);
    return {
      success: false,
      message: "Terjadi kesalahan server saat menyimpan pendaftaran.",
    };
  }
}