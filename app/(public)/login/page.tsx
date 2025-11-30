// app/(public)/login/page.tsx
"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GoogleButton from '@/components/ui/GoogleButton';

const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false, 
        email: email,
        password: password,
      });

      if (result?.error) {
        setError('Email atau password salah.');
        setIsLoading(false);
      } else {
        router.refresh();
        window.location.href = '/'; 
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan jaringan.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-900">
      
      {/* --- BAGIAN KIRI: BRANDING / IMAGE (Hidden di Mobile) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-800">
        {/* Background Image / Abstract */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-16 h-full text-white">
          <div>
           
          </div>
          
          <div>
            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              Mulai Perjalanan Karir Profesional Anda.
            </h2>
            <p className="text-slate-300 text-lg max-w-md leading-relaxed">
              Bergabunglah dengan ribuan alumni yang telah sukses meniti karir di berbagai industri ternama.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} LPK MCLS. All rights reserved.
          </div>
        </div>
      </div>

      {/* --- BAGIAN KANAN: FORM LOGIN --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-slate-900">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="mt-6 text-3xl font-bold text-white tracking-tight">
              Selamat Datang Kembali
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Silakan masuk untuk mengakses dashboard Anda.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <div className="mt-8 space-y-6">
            
            {/* Google Button Wrapper */}
            <div>
               <GoogleButton text="Lanjutkan dengan Google" />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900 text-slate-500 uppercase tracking-wider font-medium text-xs">Atau email</span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition sm:text-sm"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition sm:text-sm"
                  placeholder="••••••••"
                />
              </div>

              {/* Forgot Password Link (Opsional) */}
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition">
                    Lupa password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      <span className="ml-2">Memproses...</span>
                    </>
                  ) : (
                    'Masuk Sekarang'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500">
              Belum punya akun?{' '}
              <Link href="/pendaftaran" className="font-semibold text-indigo-400 hover:text-indigo-300 transition ml-1">
                Daftar Gratis
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}