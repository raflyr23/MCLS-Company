"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();

  // 1. Validasi Sesi
  if (!session?.user?.email) {
    return { success: false, message: "Unauthorized" };
  }

  // 2. Ambil data baru dari form
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  // 3. Validasi Data
  if (!name || !phone) {
    return { success: false, message: "Nama dan Nomor Telepon wajib diisi." };
  }

  try {
    // 4. Update Database (Berdasarkan email dari sesi, bukan input form)
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        phone,
        address: address || null, // Simpan null jika kosong
      },
    });

    // 5. Refresh halaman agar data baru tampil
    revalidatePath("/profile");
    revalidatePath("/admin/users"); // Agar admin juga melihat perubahan
    return { success: true, message: "Profil berhasil diperbarui." };
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { success: false, message: "Gagal memperbarui profil." };
  }
}