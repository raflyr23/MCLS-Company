// app/admin/page.tsx
import { prisma } from '@/lib/prisma';
import DashboardCharts from '@/components/admin/DashboardCharts'; // Import komponen grafik

export default async function AdminDashboard() {
  // 1. Ambil Data Ringkasan (Card Statis)
  const userCount = await prisma.user.count({ where: { role: 'USER' } });
  const programCount = await prisma.program.count();
  const pendaftaranCount = await prisma.pendaftaran.count();

  // 2. Olah Data untuk Grafik Pembayaran (Pie Chart)
  // Hitung jumlah berdasarkan paymentStatus
  const paidCount = await prisma.pendaftaran.count({ where: { paymentStatus: 'Paid' } });
  const unpaidCount = await prisma.pendaftaran.count({ where: { paymentStatus: 'Unpaid' } });
  
  // Format untuk Recharts
  const paymentStats = [
    { name: 'Lunas', value: paidCount },
    { name: 'Belum Bayar', value: unpaidCount },
  ].filter(item => item.value > 0); // Hanya tampilkan yang ada nilainya


  // 3. Olah Data untuk Grafik Bulanan (Bar Chart)
  // Ambil semua tanggal pendaftaran
  const allPendaftarans = await prisma.pendaftaran.findMany({
    select: { createdAt: true }
  });

  // Siapkan array 6 bulan terakhir
  const monthlyStats = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  
  const today = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthIndex = d.getMonth();
    const year = d.getFullYear();
    const monthName = monthNames[monthIndex];

    // Hitung berapa pendaftar di bulan & tahun ini
    const count = allPendaftarans.filter(p => {
        const pDate = new Date(p.createdAt);
        return pDate.getMonth() === monthIndex && pDate.getFullYear() === year;
    }).length;

    monthlyStats.push({
        name: monthName,
        total: count
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      
      {/* --- KARTU STATISTIK RINGKAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">Total Peserta</p>
            <p className="text-3xl font-extrabold text-gray-800 mt-1">{userCount}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">Program Aktif</p>
            <p className="text-3xl font-extrabold text-gray-800 mt-1">{programCount}</p>
          </div>
           <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">Pendaftaran Masuk</p>
            <p className="text-3xl font-extrabold text-gray-800 mt-1">{pendaftaranCount}</p>
          </div>
           <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      {/* --- KOMPONEN GRAFIK (DATA VISUALIZATION) --- */}
      <DashboardCharts 
        monthlyStats={monthlyStats} 
        paymentStats={paymentStats} 
      />

    </div>
  );
}