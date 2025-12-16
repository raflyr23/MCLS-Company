// components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Inter, Playfair_Display } from 'next/font/google';

// Konfigurasi Font
const fontSans = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

const fontSerif = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'], 
  display: 'swap',
});

const Footer: React.FC = () => {
  const socialLinks = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      ), 
      href: "#", label: "Facebook" 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
      ), 
      href: "#", label: "Instagram" 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      ), 
      href: "#", label: "LinkedIn" 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
      ), 
      href: "#", label: "YouTube" 
    },
  ];

  return (
    <footer className={`${fontSans.className} bg-slate-950 text-slate-400 border-t border-slate-800/50 mt-auto`}>
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Desc */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
               {/* Container Gambar Logo */}
               <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logofix.png" 
                  alt="LPK MCLS Logo"
                  fill
                  className="object-contain" 
                />
              </div>
              
              <div className="flex flex-col">
                <span className={`${fontSerif.className} text-slate-100 tracking-tight font-bold text-xl leading-none group-hover:text-indigo-400 transition-colors`}>
                  Mahardika
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-[0.2em] uppercase mt-1">
                  Citra Lintas Semesta
                </span>
              </div>
            </Link>

            {/* UPDATE DESKRIPSI */}
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Lembaga pelatihan kerja yang didirikan tahun 2025 dengan semangat memuliakan tenaga kerja Indonesia melalui kompetensi global dan integritas profesional.
            </p>
            
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-slate-800 group"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Navigasi</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/programs" className="hover:text-indigo-400 transition-colors">Program Pelatihan</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Hubungi Kami</Link></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Karir</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Jl. Pelatihan No. 123,<br/>Jakarta Pusat, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>info@lpkmcls.com</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>(021) 555-1234</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} LPK MCLS. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;