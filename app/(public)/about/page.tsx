// app/(public)/about/page.tsx
import React from 'react';
import Image from 'next/image'; // Gunakan Image dari Next.js untuk performa
// import PlaceholderImage from '@/components/ui/placeholderImage'; // Kita ganti dengan Image asli/demo agar lebih menjual

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300">
      
      {/* --- HERO HEADER --- */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/20 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-4 block">
            Profil Lembaga
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Membentuk Generasi <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Kompeten & Profesional
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Lebih dari sekadar tempat kursus, LPK MCLS adalah mitra perjalanan karir Anda menuju kesuksesan di dunia industri global.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 pb-24">
        
        {/* Section 1: Sejarah / Intro */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Image Column */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-slate-700/50 group">
              {/* Menggunakan gambar kantor/gedung yang profesional */}
              <div className="aspect-[4/3] bg-slate-800 relative">
                 <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                    alt="Gedung LPK MCLS"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white shadow-lg max-w-xs">
                <p className="text-xs text-indigo-300 font-bold uppercase mb-1">Sejak 2010</p>
                <p className="text-sm font-medium leading-snug">Telah meluluskan ribuan tenaga kerja siap pakai.</p>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-600/20 rounded-full blur-2xl -z-10"></div>
          </div>

          {/* Text Column */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-indigo-500 rounded-full"></span>
              Dedikasi Untuk Pendidikan
            </h2>
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p>
                LPK MCLS didirikan pada tahun 2010 dengan satu tujuan mulia: menjembatani kesenjangan antara kurikulum pendidikan formal dan kebutuhan nyata di dunia industri.
              </p>
              <p>
                Kami percaya bahwa setiap individu memiliki potensi luar biasa. Dengan metode pembelajaran yang tepat, fasilitas modern, dan mentor praktisi, kami berkomitmen mengubah potensi tersebut menjadi kompetensi yang bernilai tinggi.
              </p>
              <p>
                Kini, alumni kami telah tersebar di berbagai perusahaan multinasional, startup teknologi, dan instansi pemerintahan, membuktikan kualitas pelatihan yang kami berikan.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* VISI CARD */}
          <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors duration-300 group">
            <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Visi Kami</h3>
            <p className="text-slate-400 leading-relaxed">
              Menjadi lembaga pelatihan kerja terdepan di Indonesia yang diakui secara global, menghasilkan SDM yang tidak hanya kompeten secara teknis, tetapi juga memiliki etos kerja profesional dan integritas tinggi.
            </p>
          </div>

          {/* MISI CARD */}
          <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors duration-300 group">
            <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Misi Kami</h3>
            <ul className="space-y-3 text-slate-400">
              {[
                "Menyelenggarakan pelatihan berbasis kompetensi industri terkini.",
                "Membangun kemitraan strategis dengan perusahaan nasional & global.",
                "Mengembangkan kurikulum yang adaptif terhadap teknologi.",
                "Mencetak lulusan yang siap kerja dan berdaya saing tinggi."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}