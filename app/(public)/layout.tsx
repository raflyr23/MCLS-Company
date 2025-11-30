// app/(public)/layout.tsx
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { auth } from '@/lib/auth'; 
import { redirect } from 'next/navigation';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  // PERBAIKAN: Tambahkan deskripsi alasan
//   if (session?.user?.role === 'ADMIN') {
//     redirect('/admin');
//   }

  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}