// app/admin/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addProgram(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  
  // Slug otomatis dari title (contoh: "Belajar Web" -> "belajar-web")
  const slug = title.toLowerCase().replace(/ /g, "-") + "-" + Date.now();
  
  // Untuk simplifikasi, imageSrc kita input manual URL-nya dulu
  // Nanti bisa diupgrade pakai upload file sungguhan
  const imageSrc = "/images/program-digital.jpg"; 

  await prisma.program.create({
    data: { title, slug, description, duration, imageSrc }
  });

  revalidatePath("/admin/programs");
  revalidatePath("/programs"); // Update halaman public juga
}

export async function deleteProgram(id: string) {
  await prisma.program.delete({ where: { id } });
  revalidatePath("/admin/programs");
  revalidatePath("/programs");
}