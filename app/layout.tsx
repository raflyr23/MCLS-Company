// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css'; 
import AuthProvider from '@/components/providers/SessionProvider';
import { auth } from '@/lib/auth'; 

export const metadata: Metadata = {
  title: 'LPK MCLS - Lembaga Pelatihan Kerja Terpercaya',
  description: 'Wujudkan Karir Impian Anda Bersama LPK MCLS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}