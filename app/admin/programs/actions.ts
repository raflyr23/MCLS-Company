"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

// --- HELPER FUNCTIONS (Tetap Sama) ---
async function uploadImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const cleanName = file.name.replace(/\s+/g, '-');
  const filename = `${Date.now()}-${cleanName}`;
  const uploadDir = path.join(process.cwd(), "public/uploads/programs");
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e) {}
  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);
  return `/uploads/programs/${filename}`;
}

async function deleteImageFile(imageUrl: string) {
  try {
    if (imageUrl.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", imageUrl);
      await unlink(filePath);
    }
  } catch (error) {
    console.error("Gagal menghapus file gambar:", error);
  }
}

// --- MAIN ACTIONS (Update di sini) ---

// 1. Tambah Program Baru
export async function createProgram(formData: FormData) {
  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("imageFile") as File;
  
  // PERBAIKAN: Ambil harga dari form, convert ke Number. Default 0.
  const price = Number(formData.get("price")) || 0; 

  let imageSrc = "/images/placeholder.jpg"; 
  const uploadedPath = await uploadImage(imageFile);
  if (uploadedPath) {
    imageSrc = uploadedPath;
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  await prisma.program.create({
    data: {
      title,
      slug,
      duration,
      description,
      imageSrc,
      price, // Simpan harga ke DB
    },
  });

  revalidatePath("/admin/programs");
  revalidatePath("/programs");
}

// 2. Update Program
export async function updateProgram(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("imageFile") as File;
  
  // PERBAIKAN: Ambil harga dari form
  const price = Number(formData.get("price")) || 0;

  const oldProgram = await prisma.program.findUnique({ where: { id } });

  const dataToUpdate: any = {
    title,
    duration,
    description,
    price, // Update harga
  };

  if (imageFile && imageFile.size > 0) {
    const uploadedPath = await uploadImage(imageFile);
    if (uploadedPath) {
      dataToUpdate.imageSrc = uploadedPath;
      if (oldProgram?.imageSrc && oldProgram.imageSrc !== "/images/placeholder.jpg") {
        await deleteImageFile(oldProgram.imageSrc);
      }
    }
  }

  await prisma.program.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin/programs");
  revalidatePath("/programs");
}

// 3. Hapus Program (Tetap)
export async function deleteProgram(id: string) {
  const program = await prisma.program.findUnique({ where: { id } });
  if (program) {
    await prisma.program.delete({ where: { id } });
    if (program.imageSrc && program.imageSrc !== "/images/placeholder.jpg") {
      await deleteImageFile(program.imageSrc);
    }
  }
  revalidatePath("/admin/programs");
  revalidatePath("/programs");
}