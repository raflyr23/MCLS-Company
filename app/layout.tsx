import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/providers/SessionProvider';
import { Toaster } from 'react-hot-toast'; // 1. Import Toaster

export const metadata: Metadata = {
  title: {
    template: '%s | LPK MCLS',
    default: 'LPK MCLS - Lembaga Pelatihan Kerja Terpercaya',
  },
  description: 'Wujudkan Karir Impian Anda Bersama LPK MCLS.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
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
          {/* 2. Pasang Toaster dengan Style Dark Mode */}
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#1e293b', // Slate-800
                color: '#fff',
                border: '1px solid #334155',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#4ade80', secondary: '#1e293b' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#1e293b' },
              }
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}