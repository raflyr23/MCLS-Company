// app/(public)/daftar-program/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function enrollProgram(formData: FormData) {
  const userId = formData.get("userId") as string;
  const programTitle = formData.get("programTitle") as string;
  const address = formData.get("address") as string;

  if (!userId || !programTitle) {
    return; // Atau handle error
  }

  try {
    // Simpan ke database
    await prisma.pendaftaran.create({
      data: {
        userId: userId,
        program: programTitle,
        alamat: address,
        status: "Pending",
      },
    });

    revalidatePath("/profile");
  } catch (error) {
    console.error("Error enrollment:", error);
  }
  
  // Redirect ke profile setelah sukses
  redirect("/profile");
}