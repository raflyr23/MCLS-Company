// app/(public)/contact/page.tsx
import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300">
      
      {/* --- HERO HEADER (Soft Midnight) --- */}
      <div className="pt-24 pb-12 text-center relative">
        {/* Background Gradient Halus */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-3 block">
            Hubungi Kami
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 tracking-tight">
            Mari Terhubung
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed font-light">
            Punya pertanyaan tentang program? Tim kami siap membantu Anda memulai perjalanan karir baru.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20 animate-fade-in relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* --- KOLOM KIRI: FORMULIR (2/3 Lebar) --- */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/20 border border-slate-700/50 overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-xl font-bold text-slate-100 mb-8 flex items-center gap-3">
                <div className="h-px w-8 bg-indigo-500"></div>
                Kirim Pesan
              </h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 border border-slate-700/50 rounded-xl bg-slate-900/50 text-slate-200 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200 placeholder-slate-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="email@anda.com"
                      className="w-full px-4 py-3 border border-slate-700/50 rounded-xl bg-slate-900/50 text-slate-200 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200 placeholder-slate-600"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-400 mb-2">No. Telepon</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="0812..."
                      className="w-full px-4 py-3 border border-slate-700/50 rounded-xl bg-slate-900/50 text-slate-200 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200 placeholder-slate-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">Topik</label>
                    <div className="relative">
                        <select
                        id="subject"
                        className="w-full px-4 py-3 border border-slate-700/50 rounded-xl bg-slate-900/50 text-slate-200 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200 cursor-pointer appearance-none"
                        >
                        <option>Info Program Pelatihan</option>
                        <option>Kerjasama</option>
                        <option>Lainnya</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Pesan</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tuliskan pesan Anda di sini..."
                    className="w-full px-4 py-3 border border-slate-700/50 rounded-xl bg-slate-900/50 text-slate-200 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200 resize-none placeholder-slate-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-block w-full md:w-auto bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>

          {/* --- KOLOM KANAN: INFO & MAP (1/3 Lebar) --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Info Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl shadow-black/20 border border-slate-700/50">
              <h3 className="text-lg font-bold text-slate-100 mb-6">Kontak Info</h3>
              
              <ul className="space-y-8">
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0 border border-slate-600/50 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Lokasi</span>
                    <span className="text-slate-300 text-sm leading-relaxed block">
                      Jl. Pelatihan No. 123, <br/>Jakarta Pusat, Indonesia
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0 border border-slate-600/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Telepon</span>
                    <span className="text-slate-300 text-sm block hover:text-emerald-400 transition cursor-pointer">(021) 555-1234</span>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-2xl flex items-center justify-center text-purple-400 flex-shrink-0 border border-slate-600/50 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</span>
                    <span className="text-slate-300 text-sm block hover:text-purple-400 transition cursor-pointer">info@lpkmcls.com</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Card (Muted Colors) */}
            <div className="bg-slate-800/50 p-2 rounded-2xl shadow-xl shadow-black/20 border border-slate-700/50 h-64 overflow-hidden relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28327842776!2d106.75512763779977!3d-6.229571200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1648030000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                // Peta dibuat redup (opacity-60) dan grayscale agar menyatu dengan tema gelap
                className="rounded-xl w-full h-full object-cover grayscale opacity-60 invert-[.85] group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 transition duration-700 ease-in-out"
              ></iframe>
              
              {/* Overlay Label */}
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 shadow-lg border border-slate-700 pointer-events-none">
                Lihat Peta
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}