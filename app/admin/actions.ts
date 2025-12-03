"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

// --- HELPER FUNCTIONS ---
async function uploadImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Bersihkan nama file
  const cleanName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
  const filename = `${Date.now()}-${cleanName}`;
  
  const uploadDir = path.join(process.cwd(), "public/uploads/programs");
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e) {
    // Folder sudah ada, lanjut
  }

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

// --- MAIN ACTIONS ---

// 1. Tambah Program Baru
export async function createProgram(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const duration = formData.get("duration") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("imageFile") as File;
    const priceRaw = formData.get("price");
    
    // Validasi sederhana
    if (!title || !duration || !description) {
        throw new Error("Judul, Durasi, dan Deskripsi wajib diisi.");
    }

    const price = priceRaw ? Number(priceRaw) : 0;

    let imageSrc = "/images/placeholder.jpg"; 
    if (imageFile && imageFile.size > 0) {
        const uploadedPath = await uploadImage(imageFile);
        if (uploadedPath) imageSrc = uploadedPath;
    }

    // Generate Slug
    let slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
    const checkSlug = await prisma.program.findUnique({ where: { slug } });
    if (checkSlug) {
        slug = `${slug}-${Date.now()}`;
    }

    await prisma.program.create({
      data: {
        title,
        slug,
        duration,
        description,
        imageSrc,
        price,
      },
    });

    revalidatePath("/admin/programs");
    revalidatePath("/programs");

  } catch (error) {
    // PERBAIKAN: Menghapus ': any' dan menggunakan casting
    console.error("❌ ERROR CREATE PROGRAM:", error);
    throw new Error((error as Error).message || "Gagal menyimpan ke database");
  }
}

// 2. Update Program
export async function updateProgram(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const duration = formData.get("duration") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("imageFile") as File;
    const priceRaw = formData.get("price");
    
    const price = priceRaw ? Number(priceRaw) : 0;

    const oldProgram = await prisma.program.findUnique({ where: { id } });

    // PERBAIKAN: Definisi tipe eksplisit, bukan 'any'
    const dataToUpdate: {
      title: string;
      duration: string;
      description: string;
      price: number;
      imageSrc?: string; // Opsional
    } = {
      title,
      duration,
      description,
      price,
    };

    if (imageFile && imageFile.size > 0) {
      const uploadedPath = await uploadImage(imageFile);
      if (uploadedPath) {
        dataToUpdate.imageSrc = uploadedPath;
        
        // Hapus gambar lama
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
    
  } catch (error) {
    // PERBAIKAN: Menghapus ': any'
    console.error("❌ ERROR UPDATE PROGRAM:", error);
    throw new Error("Gagal mengupdate program");
  }
}

// 3. Hapus Program
export async function deleteProgram(id: string) {
    try {
        const program = await prisma.program.findUnique({ where: { id } });
        if (program) {
            await prisma.program.delete({ where: { id } });
            if (program.imageSrc && program.imageSrc !== "/images/placeholder.jpg") {
                await deleteImageFile(program.imageSrc);
            }
        }
        revalidatePath("/admin/programs");
        revalidatePath("/programs");
    } catch (error) {
        console.error("Error delete:", error);
    }
}