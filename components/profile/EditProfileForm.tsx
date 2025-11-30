// components/profile/EditProfileForm.tsx
"use client";

import { useState } from "react";
import { updateProfile } from "@/app/actions/user";

type UserData = {
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
};

export default function EditProfileForm({ user }: { user: UserData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setIsOpen(false);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* --- TOMBOL EDIT (Versi Desktop & Mobile) --- */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-400 hover:text-indigo-300 text-xs font-semibold transition-all shadow-sm"
      >
        <svg className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span>Edit</span>
      </button>

      {/* --- MODAL (FIXED OVERLAY) --- */}
      {isOpen && (
        // UBAH DISINI: 
        // 1. ganti 'items-center' jadi 'items-start'
        // 2. tambah 'pt-24' (mobile) dan 'md:pt-36' (desktop) biar turun jauh dari navbar
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-6 pt-24 md:pt-2">
          
          {/* 1. Backdrop Blur (Background Gelap Transparan) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* 2. Modal Content (Kotak Form) */}
          <div className="relative w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden transform transition-all scale-100 animate-fade-in-up">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Ubah Data Diri
              </h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white transition p-1 rounded-full hover:bg-slate-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <form action={handleSubmit} className="space-y-5">
                
                {/* Email (Read Only) */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email (Terkunci)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email || ""}
                    className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-slate-500 cursor-not-allowed font-mono text-sm focus:outline-none"
                  />
                </div>

                {/* Nama Lengkap */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nama Lengkap</label>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={user.name || ""}
                    className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-slate-600"
                  />
                </div>

                {/* No Telepon */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nomor WhatsApp</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    defaultValue={user.phone || ""}
                    className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-slate-600"
                  />
                </div>

                {/* Alamat */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Alamat Domisili</label>
                  <textarea
                    name="address"
                    rows={3}
                    defaultValue={user.address || ""}
                    className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-slate-600 resize-none"
                  ></textarea>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 flex items-center gap-2 font-bold text-sm hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Menyimpan...</span>
                        </>
                    ) : (
                        'Simpan Perubahan'
                    )}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      )}
    </>
  );
}