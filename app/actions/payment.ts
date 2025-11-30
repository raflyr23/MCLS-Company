"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
// @ts-expect-error: Midtrans types missing
import midtransClient from "midtrans-client";

// Definisikan tipe Error Midtrans kustom untuk menangani properti dinamis
interface MidtransError extends Error {
  httpStatusCode?: number;
  ApiResponse?: unknown;
}

export async function createPaymentToken(pendaftaranId: number) {
  // 1. Cek Session
  const session = await auth();
  if (!session) return { error: "Anda harus login kembali." };

  // 2. Cek Server Key
  if (!process.env.MIDTRANS_SERVER_KEY) {
    console.error("❌ MIDTRANS_SERVER_KEY tidak ditemukan di file .env");
    return { error: "Konfigurasi server pembayaran belum lengkap." };
  }

  // 3. Ambil data database
  const pendaftaran = await prisma.pendaftaran.findUnique({
    where: { id: pendaftaranId },
    include: { user: true },
  });

  if (!pendaftaran) return { error: "Data pendaftaran tidak ditemukan." };

  const programData = await prisma.program.findFirst({
    where: { title: pendaftaran.program }
  });

  // 4. Validasi Harga
  const price = Math.round(programData?.price || 0);

  if (price <= 0) {
    return { error: "Harga program tidak valid (0)." };
  }

  // 5. Inisialisasi Midtrans
  const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  // 6. Parameter Transaksi
  const parameter = {
    transaction_details: {
      order_id: `INV-${pendaftaran.id}-${Date.now()}`, 
      gross_amount: price,
    },
    customer_details: {
      first_name: pendaftaran.user.name,
      email: pendaftaran.user.email,
      phone: pendaftaran.user.phone,
    },
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
      error: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
      pending: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`
    },
    item_details: [
      {
        id: `PROG-${programData?.id}`,
        price: price,
        quantity: 1,
        name: pendaftaran.program.substring(0, 50),
      },
    ],
  }; 

  try {
    console.log("⏳ Mengirim request ke Midtrans...", JSON.stringify(parameter, null, 2));
    
    const transaction = await snap.createTransaction(parameter);
    const token = transaction.token;

    console.log("✅ Token berhasil didapat:", token);

    // Simpan token ke database
    await prisma.pendaftaran.update({
      where: { id: pendaftaranId },
      data: { snapToken: token },
    });

    return { token };
    
  // 👇 PERBAIKAN DI SINI: Gunakan 'unknown' lalu casting
  } catch (e: unknown) {
    const error = e as MidtransError; // Casting ke tipe interface yang kita buat di atas

    console.error("❌ MIDTRANS ERROR MESSAGE:", error.message);
    
    if (error.ApiResponse) {
      console.error("❌ MIDTRANS API RESPONSE:", JSON.stringify(error.ApiResponse, null, 2));
    } else {
      console.error("❌ MIDTRANS FULL ERROR:", error);
    }
    
    // Optional chaining (?.) aman digunakan setelah casting
    if (error?.message?.includes("Access denied") || error?.httpStatusCode === 401) {
      return { error: "Gagal otentikasi Midtrans. Cek Server Key di file .env Anda." };
    }
    
    return { error: "Gagal membuat transaksi pembayaran." };
  }
}