// components/ui/PaymentButton.tsx
"use client";

import { useState, useEffect } from "react";
import { createPaymentToken } from "@/app/actions/payment";
import { useRouter } from "next/navigation";

// 1. Definisikan tipe data untuk Respon Midtrans (Snap Result)
interface SnapResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status?: string;
  pdf_url?: string;
  finish_redirect_url?: string;
}

// 2. Definisikan tipe untuk properti window.snap
declare global {
  interface Window {
    snap: {
      pay: (
        token: string, 
        callbacks: {
          onSuccess: (result: SnapResult) => void;
          onPending: (result: SnapResult) => void;
          onError: (result: SnapResult) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}

interface PaymentButtonProps {
  pendaftaranId: number;
  price: number; 
}

export default function PaymentButton({ pendaftaranId, price }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Load Script Midtrans Snap secara manual
  useEffect(() => {
    const snapUrl = process.env.MIDTRANS_IS_PRODUCTION === "true" 
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";
      
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
    
    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    
    // 1. Panggil Server Action
    const { token, error } = await createPaymentToken(pendaftaranId);

    if (error) {
      alert(error);
      setLoading(false);
      return;
    }

    // 2. Buka Snap Popup
    if (window.snap) {
      window.snap.pay(token, {
        // Ganti 'any' dengan 'SnapResult'
        onSuccess: function (result: SnapResult) {
          console.log("Success:", result);
          alert("Pembayaran Berhasil!");
          router.refresh();
        },
        onPending: function (result: SnapResult) {
          console.log("Pending:", result);
          alert("Menunggu pembayaran...");
          router.refresh();
        },
        onError: function (result: SnapResult) {
          console.log("Error:", result);
          alert("Pembayaran Gagal!");
        },
        onClose: function () {
          console.log("Popup ditutup");
          setLoading(false);
        },
      });
    } else {
        // Fallback jika script belum terload sempurna
        alert("Sistem pembayaran sedang memuat, silakan coba sesaat lagi.");
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <span className="text-xs text-gray-500 font-medium">
        Total: Rp {price.toLocaleString('id-ID')}
      </span>
      
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition shadow-md disabled:opacity-50 flex items-center gap-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>
            Memuat...
          </span>
        ) : (
          "Bayar Sekarang"
        )}
      </button>
    </div>
  );
}