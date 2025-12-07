// components/admin/AdminSidebar.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignOutButton from '@/components/ui/SignOutButton';

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Helper untuk style link aktif
  const getLinkClass = (path: string) => {
    const isActive = pathname === path || pathname.startsWith(`${path}/`);
    return `block px-4 py-2.5 rounded-lg transition font-medium ${
      isActive 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* --- MOBILE OVERLAY (Hanya muncul di HP saat menu buka) --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- SIDEBAR --- */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span>🛡️</span> MCLS ADMIN
          </h2>
          {/* Tombol Close di Mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">
            Menu Utama
          </p>
          <Link href="/admin" className={getLinkClass('/admin')}>
            Dashboard
          </Link>
          <Link href="/admin/programs" className={getLinkClass('/admin/programs')}>
            Kelola Program
          </Link>
          <Link href="/admin/users" className={getLinkClass('/admin/users')}>
            Kelola User
          </Link>
          <Link href="/admin/pendaftaran" className={getLinkClass('/admin/pendaftaran')}>
            Data Pendaftaran
          </Link>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {/* <Link href="/" className="block px-4 py-2 text-sm text-gray-500 hover:text-blue-600 mb-2 transition">
            &larr; Lihat Website
          </Link> */}
          <SignOutButton className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 bg-white border border-gray-200 rounded-lg transition font-medium shadow-sm">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
             Keluar
          </SignOutButton>
        </div>
      </aside>

      {/* --- KONTEN UTAMA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header Mobile (Hanya muncul di HP) */}
        <header className="md:hidden bg-white border-b border-gray-200 flex items-center px-4 h-16 flex-shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="ml-4 text-lg font-bold text-gray-800">MCLS Admin</span>
        </header>

        {/* Area Scroll Konten */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}