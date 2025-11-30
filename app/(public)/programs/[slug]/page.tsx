// app/(public)/programs/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const session = await auth();
  const { slug } = await params;

  const program = await prisma.program.findUnique({
    where: { slug: slug },
  });

  if (!program) return notFound();

  const registerLink = session 
    ? `/daftar-program?judul=${encodeURIComponent(program.title)}`
    : `/pendaftaran?program=${encodeURIComponent(program.title)}`;

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300 pb-20">
      
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-900/20 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-24">
        
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          
          {/* --- KOLOM KIRI: KONTEN UTAMA --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Title Section */}
            <div className="mb-2">
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-3 inline-block border-b border-indigo-500/30 pb-1">
                Detail Program
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {program.title}
              </h1>
            </div>

            {/* Main Image with Soft Border */}
            <div className="relative w-full h-64 md:h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-slate-700/50">
              <Image
                src={program.imageSrc}
                alt={program.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
                className="opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
              {/* Overlay Gradient halus di bawah gambar */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            </div>

            {/* Content Box */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-10">
              <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                <div className="h-6 w-1 bg-indigo-500 rounded-full"></div>
                Deskripsi Program
              </h3>
              
              <div className="prose prose-invert max-w-none text-slate-400 leading-loose whitespace-pre-line">
                {program.description}
              </div>
              
              {/* Curriculum / Highlights */}
              <div className="mt-10 bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <h4 className="text-lg font-semibold text-slate-200 mb-4">Poin Utama Pembelajaran</h4>
                <ul className="grid md:grid-cols-2 gap-4">
                    {["Materi Standar Industri", "Mentor Berpengalaman", "Proyek Portofolio", "Sertifikat Kompetensi"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 border border-emerald-500/20">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            {item}
                        </li>
                    ))}
                </ul>
              </div>
            </div>

          </div>

          {/* --- KOLOM KANAN: STICKY SIDEBAR (CTA) --- */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl shadow-black/20 border border-slate-700/50 overflow-hidden">
              
              {/* Header Harga */}
              <div className="p-6 border-b border-slate-700/50 bg-slate-800">
                <p className="text-slate-400 text-sm font-medium mb-1">Biaya Investasi</p>
                <p className="text-3xl font-bold text-emerald-400 tracking-tight">
                  {program.price === 0 ? "Gratis" : `Rp ${program.price.toLocaleString('id-ID')}`}
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Info List */}
                <ul className="space-y-4">
                  <li className="flex items-center justify-between text-sm border-b border-slate-700/30 pb-3">
                    <span className="text-slate-500 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Durasi
                    </span>
                    <span className="font-semibold text-slate-200">{program.duration}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm border-b border-slate-700/30 pb-3">
                    <span className="text-slate-500 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      Metode
                    </span>
                    <span className="font-semibold text-slate-200">Hybrid Learning</span>
                  </li>
                   <li className="flex items-center justify-between text-sm pb-1">
                    <span className="text-slate-500 flex items-center gap-2">
                       <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Sertifikasi
                    </span>
                    <span className="font-semibold text-slate-200">Ya</span>
                  </li>
                </ul>

                {/* Main CTA Button */}
                <Link
                  href={registerLink}
                  className="block w-full bg-indigo-600 text-white text-center py-3.5 rounded-xl font-bold hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Daftar Program Ini
                </Link>

                <p className="text-xs text-center text-slate-500">
                  Kuota terbatas untuk batch bulan ini.
                </p>
              </div>
            </div>

            {/* Help Box */}
            <div className="mt-6 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 text-center">
                <p className="text-sm text-slate-400 mb-2">Masih ragu?</p>
                <Link href="/contact" className="text-indigo-400 font-medium text-sm hover:text-indigo-300 transition-colors">
                    Hubungi Admin Kami &rarr;
                </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// Generate Static Params (Opsional)
export async function generateStaticParams() {
  const programs = await prisma.program.findMany({
    select: { slug: true },
  });
 
  return programs.map((program) => ({
    slug: program.slug,
  }));
}