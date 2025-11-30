// app/(public)/programs/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export default async function ProgramsPage() {
  const session = await auth();

  // Ambil data program dari database
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300">
      
      {/* --- HERO HEADER (Dark Theme) --- */}
      <div className="pt-24 pb-16 text-center relative overflow-hidden">
        {/* Efek Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-900/20 blur-[120px] rounded-full -z-10"></div>

        <div className="container mx-auto px-6 relative z-10">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-3 block">
            Investasi Masa Depan
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Katalog Program Pelatihan
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Tingkatkan kompetensi Anda dengan kurikulum standar industri dan bimbingan para ahli.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20 relative z-10">
        
        {/* Empty State (Dark) */}
        {programs.length === 0 && (
          <div className="text-center py-24 bg-slate-800/50 rounded-3xl border border-dashed border-slate-700">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50 text-slate-500 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <p className="text-slate-400 text-lg font-medium">Belum ada program pelatihan yang tersedia saat ini.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => {
            
            // Logika Link (Daftar/Login)
            const hrefLink = session 
              ? `/daftar-program?judul=${encodeURIComponent(program.title)}`
              : `/pendaftaran?program=${encodeURIComponent(program.title)}`;

            return (
              <div
                key={program.id}
                className="group flex flex-col bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 border border-slate-700/50 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Gambar Program */}
                <Link href={`/programs/${program.slug}`} className="relative h-56 w-full overflow-hidden block">
                  <Image
                    src={program.imageSrc}
                    alt={program.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  {/* Overlay Gradient Gelap di bawah gambar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80"></div>
                  
                  {/* Badge Durasi */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-600/50 flex items-center gap-1.5 shadow-sm">
                      <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {program.duration}
                    </span>
                  </div>
                </Link>

                {/* Konten Text */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-auto">
                    <Link href={`/programs/${program.slug}`}>
                      <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {program.title}
                      </h3>
                    </Link>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                      {program.description}
                    </p>
                  </div>

                  {/* Harga & Tombol Aksi */}
                  <div className="pt-5 border-t border-slate-700/50">
                    <div className="flex items-end justify-between mb-5">
                      <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Investasi</span>
                      <span className="text-lg font-bold text-emerald-400 tracking-tight">
                        {program.price === 0 ? (
                          "Gratis"
                        ) : (
                          `Rp ${program.price.toLocaleString('id-ID')}`
                        )}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {/* Tombol Detail (Dark Style) */}
                      <Link 
                        href={`/programs/${program.slug}`}
                        className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-700/50 rounded-xl hover:bg-slate-700 hover:text-white transition-colors border border-slate-600/50"
                      >
                        Detail
                      </Link>
                      {/* Tombol Daftar (Primary Indigo) */}
                      <Link 
                        href={hrefLink}
                        className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                      >
                        Daftar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}