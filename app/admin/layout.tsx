import React from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth'; 
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/ui/SignOutButton'; // 1. Import Komponen Baru

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user?.role !== 'ADMIN') {
    redirect('/'); 
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:flex flex-col fixed h-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition font-medium">
            Dashboard
          </Link>
          <Link href="/admin/programs" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition font-medium">
            Kelola Program
          </Link>
          <Link href="/admin/users" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition font-medium">
            Kelola User
          </Link>
          <Link href="/admin/pendaftaran" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition font-medium">
            Data Pendaftaran
          </Link>
        </nav>

        {/* Tombol Logout & Kembali */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          
          
          {/* 2. GANTI FORM LAMA DENGAN INI */}
          <SignOutButton className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded transition font-medium">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              Keluar
          </SignOutButton>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}