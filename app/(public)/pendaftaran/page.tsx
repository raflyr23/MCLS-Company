import React, { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import RegistrationForm from './RegistrationForm';
import GoogleButton from '@/components/ui/GoogleButton';

export default async function PendaftaranPage() {
  const programs = await prisma.program.findMany({
    select: { id: true, title: true, duration: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen flex bg-slate-900">
      
      {/* --- BAGIAN KIRI: BRANDING (Hidden di Mobile) --- */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-slate-800">
        {/* Background Image Abstract */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/60 to-slate-900"></div>
        
        <div className="relative z-10 flex flex-col justify-center p-12 h-full text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">M</div>
              <span className="text-xl font-bold tracking-tight">LPK MCLS</span>
            </div>
            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              Mulai Karir <br/> <span className="text-indigo-400">Profesional Anda.</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Bergabunglah dengan komunitas pembelajar yang berdedikasi untuk meningkatkan keterampilan dan masa depan.
            </p>
          </div>
          
          {/* Bagian Testimoni telah dihapus */}

        </div>
      </div>

      {/* --- BAGIAN KANAN: FORMULIR (Scrollable) --- */}
      <div className="w-full lg:w-7/12 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-6 lg:p-12">
          <div className="max-w-lg w-full">
            
            <div className="text-center lg:text-left mb-10">
              <h1 className="text-3xl font-bold text-white mb-2">Buat Akun Baru</h1>
              <p className="text-slate-400">Lengkapi data diri Anda untuk melanjutkan pendaftaran.</p>
            </div>

            {/* Tombol Google */}
            <div className="mb-8">
              <GoogleButton text="Daftar dengan Google" />
              <div className="relative mt-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-slate-500 font-medium uppercase tracking-wider text-xs">Atau Manual</span>
                </div>
              </div>
            </div>

            <Suspense fallback={<div className="text-center py-10 text-slate-500">Memuat formulir...</div>}>
              <RegistrationForm programs={programs} />
            </Suspense>

          </div>
        </div>
      </div>

    </div>
  );
}