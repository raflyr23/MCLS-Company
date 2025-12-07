// app/(public)/programs/page.tsx
import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { ProgramCardSkeleton } from '@/components/ui/Skeleton';

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300">
      
      {/* Hero Header */}
      <div className="pt-24 pb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-900/20 blur-[120px] rounded-full -z-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-3 block">
            Investasi Masa Depan
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Katalog Program Pelatihan
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Tingkatkan kompetensi Anda dengan kurikulum standar industri.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20 relative z-10">
        {/* Suspense: Menampilkan Skeleton saat data sedang diambil */}
        <Suspense fallback={
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[...Array(6)].map((_, i) => <ProgramCardSkeleton key={i} />)}
          </div>
        }>
          <ProgramList />
        </Suspense>
      </div>
    </div>
  );
}

// Komponen Async untuk mengambil data
async function ProgramList() {
  const session = await auth();
  const programs = await prisma.program.findMany({ orderBy: { createdAt: 'desc' } });

  if (programs.length === 0) {
    return (
      <div className="text-center py-24 bg-slate-800/50 rounded-3xl border border-dashed border-slate-700">
        <p className="text-slate-400 text-lg font-medium">Belum ada program pelatihan.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {programs.map((program) => {
        const hrefLink = session 
          ? `/daftar-program?judul=${encodeURIComponent(program.title)}`
          : `/pendaftaran?program=${encodeURIComponent(program.title)}`;

        return (
          <div key={program.id} className="group flex flex-col bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 overflow-hidden hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
            <Link href={`/programs/${program.slug}`} className="relative h-56 w-full overflow-hidden block">
              <Image src={program.imageSrc} alt={program.title} fill style={{ objectFit: 'cover' }} className="transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-600/50 flex items-center gap-1.5 shadow-sm">
                  {program.duration}
                </span>
              </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-auto">
                <Link href={`/programs/${program.slug}`}>
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2 min-h-[3.5rem]">{program.title}</h3>
                </Link>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">{program.description}</p>
              </div>

              <div className="pt-5 border-t border-slate-700/50">
                <div className="flex items-end justify-between mb-5">
                  <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Investasi</span>
                  <span className="text-lg font-bold text-emerald-400 tracking-tight">
                    {program.price === 0 ? "Gratis" : `Rp ${program.price.toLocaleString('id-ID')}`}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/programs/${program.slug}`} className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-700/50 rounded-xl hover:bg-slate-700 hover:text-white transition-colors border border-slate-600/50">Detail</Link>
                  <Link href={hrefLink} className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/40">Daftar</Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}