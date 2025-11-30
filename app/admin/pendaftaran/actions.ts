// app/admin/pendaftaran/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Action untuk Mengubah Status (Terima/Tolak)
export async function updateStatus(id: number, newStatus: string) {
  try {
    await prisma.pendaftaran.update({
      where: { id }, // Cari pendaftaran berdasarkan ID
      data: { status: newStatus }, // Update kolom status
    });

    // Refresh halaman admin agar perubahan langsung terlihat
    revalidatePath("/admin/pendaftaran");
    
    // (Opsional) Refresh halaman profil user agar user juga langsung lihat perubahannya
    revalidatePath("/profile"); 
  } catch (error) {
    console.error("Gagal update status:", error);
  }
}

// 2. Action untuk Menghapus (Sudah ada sebelumnya)
export async function deletePendaftaran(id: number) {
  try {
    await prisma.pendaftaran.delete({
      where: { id }
    });
    revalidatePath("/admin/pendaftaran");
  } catch (error) {
    console.error("Gagal hapus:", error);
  }
}