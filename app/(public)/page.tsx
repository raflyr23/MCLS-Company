// app/(public)/page.tsx
import React from 'react';
import Link from 'next/link';
import { HOME_FEATURES } from '@/lib/data';

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
            Bergabunglah dengan <strong>Mahardika Change Life Solution</strong>. Kami menyediakan pelatihan keterampilan standar industri untuk masa depan yang lebih cerah.
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

      {/* --- FITUR UNGGULAN --- */}
      <section className="py-24 bg-slate-950/50 relative">
        {/* Dekorasi Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-indigo-900/10 blur-[100px] rounded-full -z-10"></div>

        <div className="container mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mengapa Memilih Kami?
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Kualitas dan integritas adalah prioritas kami dalam mencetak lulusan yang kompeten.
            </p>
          </div>

          {/* Grid Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {HOME_FEATURES.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                  <feature.icon className="w-7 h-7" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


    </div>
  );
}