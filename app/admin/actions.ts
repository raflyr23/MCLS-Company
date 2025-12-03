// app/admin/programs/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob"; // 1. Import Vercel Blob

// --- HELPER UPLOAD KE VERCEL BLOB ---
async function uploadImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  // Generate nama file yang aman
  const cleanName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
  const filename = `programs/${Date.now()}-${cleanName}`; // Simpan di folder 'programs'
  
  // Upload ke Vercel Blob
  const blob = await put(filename, file, {
    access: 'public',
  });

  return blob.url; // Mengembalikan URL publik (https://...)
}

// --- HELPER DELETE DARI VERCEL BLOB ---
async function deleteImageFile(imageUrl: string) {
  try {
    // Vercel Blob cukup menghapus berdasarkan URL-nya
    await del(imageUrl);
  } catch (error) {
    console.error("Gagal menghapus file gambar:", error);
  }
}

// --- CREATE PROGRAM ---
export async function createProgram(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const duration = formData.get("duration") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("imageFile") as File;
    const priceRaw = formData.get("price");
    
    if (!title || !duration || !description) {
        throw new Error("Judul, Durasi, dan Deskripsi wajib diisi.");
    }

    const price = priceRaw ? Number(priceRaw) : 0;

    // Default image jika user tidak upload
    // Pastikan Anda punya gambar ini di folder public/images atau gunakan URL eksternal
    let imageSrc = "/images/placeholder.jpg"; 
    
    // Proses Upload
    if (imageFile && imageFile.size > 0) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) imageSrc = uploadedUrl;
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

  } catch (error: any) {
    console.error("❌ ERROR CREATE PROGRAM:", error);
    throw new Error(error.message || "Gagal menyimpan ke database");
  }
}

// --- UPDATE PROGRAM ---
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

    const dataToUpdate: {
      title: string;
      duration: string;
      description: string;
      price: number;
      imageSrc?: string;
    } = {
      title,
      duration,
      description,
      price,
    };

    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        dataToUpdate.imageSrc = uploadedUrl;
        
        // Hapus gambar lama di Blob jika ada (dan bukan placeholder default)
        // Ciri gambar Vercel Blob: URL dimulai dengan "https://"
        if (oldProgram?.imageSrc && oldProgram.imageSrc.startsWith("https")) {
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
    
  } catch (error: any) {
    console.error("❌ ERROR UPDATE PROGRAM:", error);
    throw new Error("Gagal mengupdate program");
  }
}

// --- DELETE PROGRAM ---
export async function deleteProgram(id: string) {
    try {
        const program = await prisma.program.findUnique({ where: { id } });
        if (program) {
            await prisma.program.delete({ where: { id } });
            
            // Hapus gambar di Blob
            if (program.imageSrc && program.imageSrc.startsWith("https")) {
                await deleteImageFile(program.imageSrc);
            }
        }
        revalidatePath("/admin/programs");
        revalidatePath("/programs");
    } catch (error) {
        console.error("Error delete:", error);
    }
}