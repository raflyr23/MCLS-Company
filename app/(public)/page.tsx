// app/(public)/page.tsx
import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { ProgramCardSkeleton } from '@/components/ui/Skeleton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/banner.jpg" 
            alt="Background"
            className="w-full h-full object-cover opacity-20" 
          />
          {/* Gradient Overlay agar teks terbaca jelas */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* Badge Kecil */}
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-6">
            Lembaga Pelatihan Kerja Terpercaya
          </span>

          {/* Headline Besar */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Wujudkan Karir <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Impian Anda
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Bergabunglah dengan <strong> Mahardika Citra Lintas Semesta</strong>. Kami menyediakan pelatihan keterampilan standar industri untuk masa depan yang lebih cerah.
          </p>

          {/* Tombol CTA (Call to Action) */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/programs"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-1"
            >
              Lihat Program Kami
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl font-medium text-lg hover:bg-slate-700 hover:text-white transition-all"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURES / PHILOSOPHY SECTION (Updated) --- */}
      <div className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Kompetensi Global</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Kurikulum berbasis industri internasional untuk memastikan Anda siap bersaing dan bekerja di negara tujuan.
              </p>
            </div>
             {/* Feature 2 */}
             <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-amber-500/30 transition-colors">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Filosofi Mahardika</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Setiap langkah diarahkan untuk menanamkan nilai kemuliaan, profesionalisme, dan integritas pada setiap alumni.
              </p>
            </div>
             {/* Feature 3 */}
             <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Dampak Nyata</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Menciptakan cerita keberhasilan yang tidak hanya membawa pulang gaji kompetitif, tapi juga inspirasi bagi generasi berikutnya.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- PROGRAMS LIST SECTION (Logic tetap sama) --- */}
      
    </div>
  );
}

// --- COMPONENT PROGRAM LIST (Server Component) ---
async function ProgramList() {
  const session = await auth();
  const programs = await prisma.program.findMany({ orderBy: { createdAt: 'desc' } });

  if (programs.length === 0) {
    return (
      <div className="text-center py-24 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
        <p className="text-slate-400 text-lg font-medium">Belum ada program pelatihan yang tersedia.</p>
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
          <div key={program.id} className="group flex flex-col bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Link href={`/programs/${program.slug}`} className="relative h-56 w-full overflow-hidden block">
              <Image src={program.imageSrc} alt={program.title} fill style={{ objectFit: 'cover' }} className="transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-600/50">
                  {program.duration}
                </span>
              </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-auto">
                <Link href={`/programs/${program.slug}`}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">{program.title}</h3>
                </Link>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">{program.description}</p>
              </div>

              <div className="pt-5 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-end justify-between mb-5">
                  <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Investasi</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                    {program.price === 0 ? "Gratis" : `Rp ${program.price.toLocaleString('id-ID')}`}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/programs/${program.slug}`} className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Detail</Link>
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