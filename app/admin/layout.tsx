// app/admin/layout.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar'; // Import komponen baru

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Proteksi Keamanan: Hanya ADMIN yang boleh masuk
  if (session?.user?.role !== 'ADMIN') {
    redirect('/'); 
  }

  return (
    // Kita bungkus konten anak dengan Sidebar Client Component
    <AdminSidebar>
      {children}
    </AdminSidebar>
  );
}