// app/admin/pendaftaran/page.tsx
import { prisma } from '@/lib/prisma';
import { deletePendaftaran, updateStatus } from './actions';

export default async function AdminPendaftaranPage() {
  // Ambil data pendaftaran terbaru beserta data user
  const pendaftarans = await prisma.pendaftaran.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Kelola Pendaftaran Masuk</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Peserta</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Program</th>
              {/* KOLOM BARU: STATUS PEMBAYARAN */}
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Pembayaran</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status Admin</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendaftarans.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                
                {/* 1. Info Peserta */}
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{item.user.name}</div>
                  <div className="text-xs text-gray-500">{item.user.email}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.user.phone}</div>
                </td>

                {/* 2. Info Program & Alamat */}
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-blue-700">{item.program}</div>
                  <div className="text-xs text-gray-500 mt-1 max-w-xs truncate" title={item.alamat || ''}>
                    Domisili: {item.alamat || '-'}
                  </div>
                </td>

                {/* 3. STATUS PEMBAYARAN (BARU) */}
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${
                    item.paymentStatus === 'Paid' 
                      ? 'bg-green-100 text-green-700 border-green-200' 
                      : 'bg-orange-50 text-orange-600 border-orange-200'
                  }`}>
                    {item.paymentStatus === 'Paid' ? 'Lunas' : 'Belum Bayar'}
                  </span>
                </td>

                {/* 4. Status Admin */}
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                    item.status === 'Approved' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    item.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }`}>
                    {item.status}
                  </span>
                </td>

                {/* 5. Tombol Aksi */}
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    
                    {/* Tombol Terima (Hanya muncul jika belum diapprove) */}
                    {item.status !== 'Approved' && (
                      <form action={updateStatus.bind(null, item.id, 'Approved')}>
                        <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded transition border border-blue-200 text-xs font-bold">
                          ✓ Terima
                        </button>
                      </form>
                    )}

                    {/* Tombol Tolak (Hanya muncul jika belum direject) */}
                    {item.status !== 'Rejected' && (
                      <form action={updateStatus.bind(null, item.id, 'Rejected')}>
                        <button className="bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1 rounded transition border border-orange-200 text-xs font-bold">
                          ✕ Tolak
                        </button>
                      </form>
                    )}

                    {/* Tombol Hapus */}
                    <form action={deletePendaftaran.bind(null, item.id)}>
                      <button 
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded transition border border-red-200 ml-2 text-xs font-bold"
                        // Tambahkan konfirmasi sederhana di sisi client (opsional tapi disarankan)
                      >
                        Hapus
                      </button>
                    </form>

                  </div>
                </td>

              </tr>
            ))}

            {/* State Kosong */}
            {pendaftarans.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">
                        Belum ada data pendaftaran yang masuk.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}