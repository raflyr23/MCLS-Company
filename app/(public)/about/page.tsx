// app/(public)/about/page.tsx
import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    // PERUBAHAN: pt-32 diubah menjadi pt-24
    <div className="min-h-screen bg-white dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-300 pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER --- */}
        {/* Mengurangi margin bottom header agar konten juga lebih naik (mb-12 dari mb-16) */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in-up">
        
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Membentuk Generasi <span className="text-indigo-600"> Unggul</span>: <br className="hidden md:block"/>
Berlandaskan Integritas & Kemuliaan

          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Berdiri sejak 2025, kami berkomitmen menjadi jembatan talenta Indonesia menuju panggung dunia dengan standar profesionalisme tertinggi.
          </p>
        </div>

        {/* --- MAIN CONTENT (SEJARAH & FILOSOFI) --- */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          
          {/* KOLOM KIRI: GAMBAR */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-slate-200 dark:border-slate-700/50 group">
              <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative">
                 <Image 
                   src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                   alt="Gedung LPK MCLS"
                   fill
                   className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                   sizes="(max-width: 768px) 100vw, 50vw"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-lg max-w-[200px]">
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase mb-1">Est. 2025</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                  Mencetak tenaga kerja siap global.
                </p>
              </div>
            </div>
          </div>
          
          {/* KOLOM KANAN: TEKS NARASI */}
          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg order-1 lg:order-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                Sejarah & Filosofi
              </h2>
            </div>
            
            <p>
              <strong>Mahardika Citra Lintas Semesta (MCLS)</strong> lahir dari visi besar sang pendiri, <strong>Ibu (Uchy) Suciati</strong>. Beliau melihat potensi besar tenaga kerja Indonesia yang belum sepenuhnya siap bersaing di kancah internasional.
            </p>
            
            <p>
              Dengan pengalaman panjang di bidang pendidikan dan penempatan kerja, Ibu Uchy ingin menyiapkan generasi muda yang tidak hanya sekadar &quot;bekerja&quot;, tetapi mampu <strong>&quot;memuliakan&quot;</strong> keluarga dan bangsa melalui kesuksesan global.
            </p>

            <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-6 bg-slate-50 dark:bg-slate-800/50 rounded-r-xl italic text-slate-700 dark:text-slate-300">
              &quot;Setiap langkah kami diarahkan untuk menanamkan nilai kemuliaan, profesionalisme, dan integritas pada setiap alumni.&quot;
            </blockquote>

            <p>
              Sejak resmi berdiri pada tahun <strong>2025</strong>, MCLS terus bergerak menjadi jembatan kokoh yang mengantarkan talenta Indonesia menuju kesuksesan di panggung dunia.
            </p>
          </div>

        </div>

        {/* --- VISI & MISI SECTION --- */}
        <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-8 md:p-16 border border-slate-100 dark:border-slate-800">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">Visi & Misi</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* KARTU VISI */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Visi</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Menjadi lembaga terdepan yang melahirkan tenaga kerja Indonesia berkualitas tinggi, mampu bersaing, dan menginspirasi di tingkat global.
                    </p>
                </div>

                {/* KARTU MISI */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Misi</h3>
                    </div>
                    
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                       <li className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                          <span>Menyalurkan, melatih, dan mendidik calon pekerja dengan skill terkini.</span>
                       </li>
                       <li className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                          <span>Menanamkan etika kerja yang berstandar internasional.</span>
                       </li>
                       <li className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                          <span>Meraih karier yang membanggakan dan memberikan dampak positif bagi keluarga serta negara.</span>
                       </li>
                    </ul>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
}