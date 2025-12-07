// app/(public)/pendaftaran/RegistrationForm.tsx
"use client";

import React, { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerUser } from '@/app/actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast'; // Import Toast

type ProgramOption = { id: string; title: string; duration: string; };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full py-3.5 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-500/30 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 flex justify-center items-center gap-2">
      {pending ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span>Memproses...</span>
        </>
      ) : 'Daftar Akun & Program'}
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
      // TOAST SUKSES
      toast.success(state.message || "Pendaftaran Berhasil!", { duration: 4000, icon: '🎉' });
      const timer = setTimeout(() => { router.push('/login'); }, 2000);
      return () => clearTimeout(timer);
    } else if (state.message) {
      // TOAST ERROR
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={dispatch} className="space-y-5">
      {/* ... (Isi input form nama, email, dropdown program, dll sama seperti kode sebelumnya) ... */}
      {/* Agar tidak terlalu panjang, salin saja bagian input dari kode sebelumnya dan paste di sini */}
      
      {/* ... Kode input ... */}
      {/* Copy bagian Dropdown Program dari kode RegistrationForm.tsx yang saya berikan di respons sebelumnya */}
       <div>
        <label htmlFor="program" className="block text-sm font-medium text-slate-400 mb-1.5">Program Pilihan <span className="text-indigo-500">*</span></label>
        <div className="relative">
          <select name="program" id="program" defaultValue={selectedProgram} className="w-full pl-4 pr-10 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 appearance-none cursor-pointer" required>
            <option value="" disabled className="text-slate-500">-- Pilih Program --</option>
            {programs.map((program) => (<option key={program.id} value={program.title}>{program.title} ({program.duration})</option>))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Nama Lengkap</label>
        <input name="name" type="text" required placeholder="Nama Lengkap Anda" className="w-full pl-4 px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition placeholder-slate-600" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
          <input name="email" type="email" required placeholder="email@anda.com" className="w-full pl-4 px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition placeholder-slate-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">No. Telepon</label>
          <input name="phone" type="tel" required placeholder="0812..." className="w-full pl-4 px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition placeholder-slate-600" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
        <input name="password" type="password" required placeholder="Min. 6 karakter" minLength={6} className="w-full pl-4 px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition placeholder-slate-600" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Alamat Lengkap</label>
        <textarea name="address" required rows={3} placeholder="Masukkan alamat domisili..." className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800/50 text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition placeholder-slate-600 resize-none"></textarea>
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