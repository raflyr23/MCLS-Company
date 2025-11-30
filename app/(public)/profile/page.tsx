// app/(public)/profile/page.tsx
import React from 'react';
import { auth } from '@/lib/auth'; 
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link'; // 👈 IMPORT INI DITAMBAHKAN
import PaymentButton from '@/components/ui/PaymentButton';
import EditProfileForm from '@/components/profile/EditProfileForm'; 
import SignOutButton from '@/components/ui/SignOutButton'; 

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const userData = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      pendaftarans: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!userData) return <div className="text-center py-20 text-slate-300">Data pengguna tidak ditemukan.</div>;

  const allPrograms = await prisma.program.findMany();
  const getPrice = (title: string) => allPrograms.find(p => p.title === title)?.price || 0;

  return (
    // 1. WRAPPER LUAR
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 animate-fade-in">
      
      {/* 2. CONTAINER DALAM */}
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          
          {/* --- HEADER PROFIL --- */}
          <div className="relative z-20 bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-700/50 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-1">
                 <h1 className="text-2xl md:text-3xl font-bold text-white">Halo, {userData.name} 👋</h1>
                 <div className="md:hidden">
                    <EditProfileForm user={userData} />
                 </div>
              </div>
              
              <p className="text-slate-400">{userData.email}</p>
              
              <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                  <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      {userData.phone || '-'}
                  </span>
                  <span className="hidden md:inline text-slate-600">|</span>
                  <span className="hidden md:flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {userData.address || '-'}
                  </span>
                  <div className="hidden md:block ml-2">
                      <EditProfileForm user={userData} />
                  </div>
              </div>
              
               <p className="md:hidden text-sm text-slate-500 mt-2 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {userData.address || '-'}
               </p>
            </div>
            
            <SignOutButton className="px-5 py-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg font-medium transition border border-rose-500/20 text-sm flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
               Keluar Akun
            </SignOutButton>
          </div>

          {/* --- RIWAYAT PENDAFTARAN --- */}
           <div className="relative z-10 bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 pb-4 border-b border-slate-700">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                  Program Pelatihan Saya
              </h2>

            {userData.pendaftarans && userData.pendaftarans.length > 0 ? (
              <div className="grid gap-4">
                {userData.pendaftarans.map((item) => {
                  const price = getPrice(item.program);
                  const isPaid = item.paymentStatus === 'Paid';
                  const isApproved = item.status === 'Approved';
                  const isRejected = item.status === 'Rejected';

                  return (
                    <div key={item.id} className="p-5 border border-slate-700 rounded-xl hover:border-indigo-500/50 transition-colors bg-slate-900/50 group relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-1 h-full ${
                          isPaid ? 'bg-emerald-500' :
                          isApproved ? 'bg-indigo-500' : 
                          isRejected ? 'bg-rose-500' : 'bg-amber-400'
                      }`}></div>

                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pl-3">
                          <div className="flex-1">
                              <h3 className="text-lg font-bold text-indigo-400 group-hover:text-indigo-300 transition">{item.program}</h3>
                              <div className="text-sm text-slate-400 mt-1 space-y-1">
                                  <p>Status Admin: <strong className={isApproved ? 'text-emerald-400' : 'text-slate-300'}>{item.status}</strong></p>
                                  <p>Status Bayar: <strong className="text-slate-300">{item.paymentStatus || 'Unpaid'}</strong></p>
                              </div>
                          </div>

                          <div className="flex-shrink-0">
                              {isPaid ? (
                                  <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg font-bold text-sm border border-emerald-500/20 flex items-center gap-2">
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                      Lunas
                                  </span>
                              ) : isApproved ? (
                                  <div className="flex flex-col items-end gap-1">
                                      <span className="text-xs text-slate-500 font-medium">
                                          Tagihan: Rp {price.toLocaleString('id-ID')}
                                      </span>
                                      <PaymentButton pendaftaranId={item.id} price={price} />
                                  </div>
                              ) : (
                                  <span className={`px-4 py-2 rounded-lg text-sm italic border ${
                                      isRejected 
                                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                  }`}>
                                      {item.status === 'Pending' ? 'Menunggu Konfirmasi Admin' : 'Pendaftaran Ditolak'}
                                  </span>
                              )}
                          </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/30 rounded-xl border border-dashed border-slate-700">
                <p className="text-slate-500 mb-4 text-lg">Anda belum mendaftar program pelatihan apapun.</p>
                {/* 👇 PERBAIKAN DI SINI: Menggunakan Link component */}
                <Link 
                    href="/programs" 
                    className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                >
                    Cari Program Pelatihan
                </Link>
              </div>
            )}
           </div>
        </div>
      </div>
    </div>
  );
}