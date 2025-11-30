// app/(public)/pendaftaran/RegistrationForm.tsx
"use client";

import React, { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerUser } from '@/app/actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type ProgramOption = {
  id: string;
  title: string;
  duration: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3.5 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-500/30 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 flex justify-center items-center gap-2"
    >
      {pending ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Memproses...</span>
        </>
      ) : (
        'Daftar Akun & Program'
      )}
    </button>
  );
}

export default function RegistrationForm({ programs }: { programs: ProgramOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedProgram = searchParams.get('program') || ""; 

  const [state, dispatch] = useActionState(registerUser, { message: null, success: false });

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <form action={dispatch} className="space-y-5">
      
      {state.message && (
        <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${state.success ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {state.success ? (
             <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ) : (
             <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          {state.message}
        </div>
      )}

      {/* --- PILIH PROGRAM --- */}
      <div>
        <label htmlFor="program" className="block text-sm font-medium text-slate-400 mb-1.5">
          Program Pilihan <span className="text-indigo-500">*</span>
        </label>
        <div className="relative">
          <select
            name="program"
            id="program"
            defaultValue={selectedProgram}
            className="w-full pl-4 pr-10 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 appearance-none cursor-pointer"
            required
          >
            <option value="" disabled className="text-slate-500">-- Pilih Program --</option>
            {programs.map((program) => (
              <option key={program.id} value={program.title}>
                {program.title} ({program.duration})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {/* Nama Lengkap */}
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Nama Lengkap</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <input name="name" type="text" required placeholder="Nama Lengkap Anda" 
                className="w-full pl-10 px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 placeholder-slate-600" />
        </div>
      </div>

      {/* Email & Telepon */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <input name="email" type="email" required placeholder="email@anda.com" 
                className="w-full pl-10 px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 placeholder-slate-600" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">No. Telepon (WA)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <input name="phone" type="tel" required placeholder="0812..." 
                className="w-full pl-10 px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 placeholder-slate-600" />
          </div>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <input name="password" type="password" required placeholder="Min. 6 karakter" minLength={6} 
                className="w-full pl-10 px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 placeholder-slate-600" />
        </div>
      </div>

      {/* Alamat */}
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Alamat Lengkap</label>
        <textarea name="address" required rows={3} placeholder="Masukkan alamat domisili..." 
            className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 placeholder-slate-600 resize-none"></textarea>
      </div>

      <div className="pt-2">
        <SubmitButton />
      </div>

      <p className="text-center text-slate-500 text-sm">
        Sudah punya akun? <Link href="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline transition">Login disini</Link>
      </p>
    </form>
  );
}