// components/layout/HeaderClient.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/data';
import { signOut, useSession } from 'next-auth/react';

// 1. Import Font: Inter (Standar Profesional UI) & Playfair Display (Elegan untuk Logo)
import { Inter, Playfair_Display } from 'next/font/google';

// 2. Konfigurasi Font
const fontSans = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  // Inter memiliki variable font otomatis, jadi tidak perlu define weight satu per satu
});

const fontSerif = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'], 
  display: 'swap',
});

const HeaderClient: React.FC = () => {
  const { data: session } = useSession();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getInitials = (name: string) => {
    return name ? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <header 
      // 3. Terapkan fontSans (Inter) sebagai default untuk seluruh header
      className={`${fontSans.className} fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-lg border-slate-800/50 py-3 shadow-2xl shadow-black/20' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* --- LOGO AREA --- */}
        <Link href="/" className="flex items-center gap-3 group">
          
          {/* Container Gambar Logo */}
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/images/logofix.png" 
              alt="LPK MCLS Logo"
              fill
              className="object-contain" 
            />
          </div>

          {/* Teks Logo */}
          <div className="flex flex-col">
            {/* Menggunakan fontSerif (Playfair Display) untuk kesan Brand yang kuat */}
            <span className={`${fontSerif.className} text-slate-100 tracking-tight font-bold text-xl leading-none group-hover:text-indigo-400 transition-colors`}>
              Mahardika
            </span>
            {/* Menggunakan fontSans (Inter) untuk tagline agar mudah dibaca */}
            <span className="text-[10px] text-slate-400 font-medium tracking-[0.2em] uppercase mt-1">
              Citra Lintas Semesta
            </span>
          </div>
        </Link>

        {/* --- NAVIGASI DESKTOP --- */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                pathname === link.href ? 'text-white' : 'text-slate-400 hover:text-indigo-300'
              }`}
            >
              {link.name}
              {/* Indikator Aktif Halus */}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-500 rounded-full transition-all duration-300 ${
                 pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full opacity-50'
              }`} />
            </Link>
          ))}

          <div className="w-px h-6 bg-slate-800 mx-2"></div>

          {/* === LOGIKA AUTH === */}
          {session ? (
            // SUDAH LOGIN
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-slate-800/50 p-1.5 pr-4 rounded-full transition-all border border-transparent hover:border-slate-700 focus:outline-none group"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs border-2 border-slate-900 ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/40 transition-all">
                  {getInitials(session.user?.name || '')}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Akun</p>
                  <p className="text-sm font-bold text-slate-200 leading-none max-w-[100px] truncate group-hover:text-white transition-colors">
                    {session.user?.name?.split(' ')[0]}
                  </p>
                </div>
                <svg className={`w-4 h-4 text-slate-500 transition-transform duration-300 group-hover:text-slate-300 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Content */}
              <div className={`absolute right-0 mt-4 w-64 bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 py-2 transition-all duration-200 origin-top-right overflow-hidden ring-1 ring-white/5 ${isProfileOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="px-5 py-4 border-b border-slate-800 mb-2 bg-slate-900/50">
                  <p className="text-sm font-bold text-white truncate">{session.user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                </div>
                
                <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-indigo-400 transition-colors mx-2 rounded-lg font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Profil Saya
                </Link>
                
                <div className="border-t border-slate-800 my-2 mx-2"></div>
                
                <button onClick={() => signOut({ callbackUrl: '/' })} className="w-[calc(100%-16px)] text-left px-5 py-2.5 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors flex items-center gap-3 mx-2 rounded-lg font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Keluar
                </button>
              </div>
            </div>
          ) : (
            // BELUM LOGIN
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Masuk
              </Link>
              <Link href="/pendaftaran" className="bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 border border-indigo-500/50">
                Daftar Sekarang
              </Link>
            </div>
          )}
        </nav>

        {/* --- MENU MOBILE BUTTON --- */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-300 border border-transparent hover:border-slate-700 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 absolute w-full left-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-5 invisible'}`}>
        <div className="p-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-px bg-slate-800 my-4"></div>

          {session ? (
            <>
              <div className="px-4 py-3 flex items-center gap-3 mb-2 bg-slate-900 rounded-xl border border-slate-800">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border border-slate-700">
                  {getInitials(session.user?.name || '')}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-200 truncate">{session.user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                </div>
              </div>
              <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white">
                Profil Saya
              </Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-slate-900">
                Keluar
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 px-2 pb-2">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex justify-center py-3 border border-slate-700 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition-all">
                Masuk
              </Link>
              <Link href="/pendaftaran" onClick={() => setIsMenuOpen(false)} className="flex justify-center py-3 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-500 shadow-lg transition-all">
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;