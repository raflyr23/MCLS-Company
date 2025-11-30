"use client";

import React, { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { enrollProgram } from './actions';
import Link from 'next/link';

// --- DEFINISI IKON SVG INLINE (Pengganti Lucide React) ---
const Loader2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const User = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// Komponen Loading Sederhana untuk Suspense
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
      <p>Memuat data pendaftaran...</p>
    </div>
  );
}

function EnrollmentForm() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const programTitle = searchParams.get('judul');

  if (status === 'loading') return <LoadingState />;

  // --- STATE: BELUM LOGIN (Desain Dark Modern) ---
  if (status === 'unauthenticated') {
    return (
      <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl text-center">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500/50 via-indigo-500/50 to-indigo-500/50"></div>
        
        <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-700">
           <AlertCircle className="w-8 h-8 text-rose-400" />
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-3 tracking-tight">Akses Dibatasi</h2>
        <p className="text-slate-400 mb-8 leading-relaxed max-w-md mx-auto">
          Untuk melanjutkan pendaftaran program ini, mohon login ke akun Anda atau daftar jika belum memiliki akun.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/login" className="px-8 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-800 hover:text-white transition font-semibold">
            Masuk Akun
          </Link>
          <Link href="/pendaftaran" className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group">
            Buat Akun Baru
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  // --- STATE: FORMULIR PENDAFTARAN (Desain Glassmorphism Dark) ---
  return (
    <form action={enrollProgram} className="relative overflow-hidden bg-slate-900/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-slate-800/80 shadow-[0_0_40px_-15px_rgba(99,102,241,0.2)] space-y-8">
      <input type="hidden" name="userId" value={session?.user?.id} />
      <input type="hidden" name="programTitle" value={programTitle || ''} />

      {/* Section Highlight Program */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 p-6 group">
        {/* Background Gradient Halus */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 to-slate-950/50 opacity-80"></div>
        
        <div className="relative z-10 flex items-start md:items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    Program Pilihan
                </p>
                <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                    {programTitle || 'Program tidak ditemukan'}
                </h3>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Input Nama (Read-only) */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <User className="w-4 h-4 mb-0.5" /> Nama Peserta
          </label>
          <input 
            type="text" 
            disabled 
            value={session?.user?.name || ''} 
            className="w-full px-4 py-3.5 border border-slate-800 rounded-xl bg-slate-950/50 text-slate-400 font-medium cursor-not-allowed select-none shadow-inner" 
          />
          <p className="text-xs text-slate-500 mt-2 italic">*Nama diambil dari data akun Anda.</p>
        </div>

        {/* Input Alamat (Active) */}
        <div>
           <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4 mb-0.5 text-indigo-400" /> Konfirmasi Alamat Domisili
          </label>
          <textarea 
            name="address" 
            required 
            rows={4} 
            placeholder="Contoh: Jl. Sudirman No. 45, Jakarta Pusat..." 
            className="w-full px-5 py-4 border border-slate-700/80 rounded-xl bg-slate-950/60 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all shadow-sm resize-none"
          ></textarea>
          <p className="text-xs text-slate-500 mt-2">Alamat ini akan digunakan untuk keperluan administrasi dan pengiriman sertifikat.</p>
        </div>
      </div>

      {/* Tombol Submit Premium */}
      <button 
        type="submit" 
        className="w-full relative overflow-hidden group bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-[0.99]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Konfirmasi & Lanjutkan Pembayaran
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        {/* Efek Kilau pada Tombol */}
        <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
      </button>

      <p className="text-center text-xs text-slate-500">
        Dengan melanjutkan, Anda menyetujui syarat & ketentuan yang berlaku.
      </p>
    </form>
  );
}

export default function DaftarProgramPage() {
  return (
    // Background utama gelap total dengan gradient halus di pojok
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden flex items-center justify-center py-16 sm:py-24 px-6 animate-fade-in">
      
      {/* Dekorasi Background (Spotlight Effect) */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Header Halaman */}
        <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3 tracking-tight">
              Finalisasi Pendaftaran
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
              Langkah terakhir untuk memulai perjalanan belajar Anda.
            </p>
        </div>

        <Suspense fallback={<LoadingState />}>
          <EnrollmentForm />
        </Suspense>
      </div>
    </div>
  );
}