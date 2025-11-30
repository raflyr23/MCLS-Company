// app/api/midtrans/notification/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    // 1. Ambil data notifikasi dari Midtrans
    const notificationJson = await request.json();

    const statusResponse = await notificationJson;
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;
    const grossAmount = statusResponse.gross_amount;
    const signatureKey = statusResponse.signature_key;

    // 2. Verifikasi Signature (Keamanan Wajib)
    // Rumus Midtrans: SHA512(order_id + status_code + gross_amount + ServerKey)
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json({ message: "Server Key missing" }, { status: 500 });
    }

    const inputString = orderId + statusResponse.status_code + grossAmount + serverKey;
    const mySignature = crypto.createHash("sha512").update(inputString).digest("hex");

    if (mySignature !== signatureKey) {
      return NextResponse.json({ message: "Invalid Signature" }, { status: 403 });
    }

    // 3. Ekstrak ID Pendaftaran dari Order ID
    // Format Order ID kita: "INV-123-1700000000" -> Kita butuh "123"
    const parts = orderId.split("-");
    const pendaftaranId = parseInt(parts[1]); // Bagian kedua adalah ID

    if (isNaN(pendaftaranId)) {
      return NextResponse.json({ message: "Invalid Order ID format" }, { status: 400 });
    }

    // 4. Tentukan Status Pembayaran Baru
    let newPaymentStatus = "";

    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        newPaymentStatus = "Challenge";
      } else if (fraudStatus == "accept") {
        newPaymentStatus = "Paid";
      }
    } else if (transactionStatus == "settlement") {
      newPaymentStatus = "Paid";
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      newPaymentStatus = "Failed";
    } else if (transactionStatus == "pending") {
      newPaymentStatus = "Unpaid";
    }

    // 5. Update Database jika Status Valid
    if (newPaymentStatus === "Paid") {
      await prisma.pendaftaran.update({
        where: { id: pendaftaranId },
        data: { 
          paymentStatus: "Paid",
          // Opsional: Anda bisa mengubah status admin jadi Approved otomatis jika mau
          // status: "Approved" 
        },
      });
    } else if (newPaymentStatus === "Failed") {
       await prisma.pendaftaran.update({
        where: { id: pendaftaranId },
        data: { paymentStatus: "Unpaid" }, // Kembalikan ke unpaid agar bisa coba bayar lagi
      });
    }

    console.log(`✅ Webhook processed for Order ${orderId}: ${newPaymentStatus}`);
    
    return NextResponse.json({ status: "OK" });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Error processing notification" }, { status: 500 });
  }
}