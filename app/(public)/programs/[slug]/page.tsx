// app/(public)/programs/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. GENERATE METADATA (UNTUK SEO & SOSMED)
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const program = await prisma.program.findUnique({ where: { slug } });

  if (!program) return { title: 'Program Tidak Ditemukan' };

  return {
    title: `${program.title} | LPK MCLS`,
    description: program.description.substring(0, 160) + '...',
    openGraph: {
      title: program.title,
      description: `Ikuti pelatihan ${program.title} di LPK MCLS. Durasi: ${program.duration}. Daftar sekarang!`,
      images: [program.imageSrc],
      type: 'website',
    },
  };
}

// 2. HALAMAN UTAMA (Sama seperti sebelumnya, tapi dengan tema Midnight Slate)
export default async function ProgramDetailPage({ params }: PageProps) {
  const session = await auth();
  const { slug } = await params;
  const program = await prisma.program.findUnique({ where: { slug: slug } });

  if (!program) return notFound();

  const registerLink = session 
    ? `/daftar-program?judul=${encodeURIComponent(program.title)}`
    : `/pendaftaran?program=${encodeURIComponent(program.title)}`;

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300 pb-20">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-900/20 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          
          {/* Kolom Kiri */}
          <div className="lg:col-span-2 space-y-8">
            <div className="mb-2">
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-3 inline-block border-b border-indigo-500/30 pb-1">Detail Program</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{program.title}</h1>
            </div>
            <div className="relative w-full h-64 md:h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-slate-700/50">
              <Image src={program.imageSrc} alt={program.title} fill style={{ objectFit: 'cover' }} priority className="opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-10">
              <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-3"><div className="h-6 w-1 bg-indigo-500 rounded-full"></div>Deskripsi Program</h3>
              <div className="prose prose-invert max-w-none text-slate-400 leading-loose whitespace-pre-line">{program.description}</div>
            </div>
          </div>

          {/* Kolom Kanan (Sticky) */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl shadow-black/20 border border-slate-700/50 overflow-hidden">
              <div className="p-6 border-b border-slate-700/50 bg-slate-800">
                <p className="text-slate-400 text-sm font-medium mb-1">Biaya Investasi</p>
                <p className="text-3xl font-bold text-emerald-400 tracking-tight">{program.price === 0 ? "Gratis" : `Rp ${program.price.toLocaleString('id-ID')}`}</p>
              </div>
              <div className="p-6 space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-center justify-between text-sm border-b border-slate-700/30 pb-3">
                    <span className="text-slate-500">Durasi</span>
                    <span className="font-semibold text-slate-200">{program.duration}</span>
                  </li>
                  {/* ... item list lain ... */}
                </ul>
                <Link href={registerLink} className="block w-full bg-indigo-600 text-white text-center py-3.5 rounded-xl font-bold hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5">Daftar Program Ini</Link>
                <p className="text-xs text-center text-slate-500">Kuota terbatas.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const programs = await prisma.program.findMany({ select: { slug: true } });
  return programs.map((program) => ({ slug: program.slug }));
}