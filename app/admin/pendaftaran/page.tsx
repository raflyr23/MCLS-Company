// app/admin/pendaftaran/page.tsx
import { prisma } from '@/lib/prisma';
import { deletePendaftaran, updateStatus } from './actions';
import SearchInput from '@/components/ui/SearchInput'; 

export default async function AdminPendaftaranPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>; 
}) {
  const params = await searchParams;
  const query = params?.query || '';

  // Query database dengan filter pencarian
  const pendaftarans = await prisma.pendaftaran.findMany({
    where: {
      OR: [
        { user: { name: { contains: query, mode: 'insensitive' } } },
        { user: { email: { contains: query, mode: 'insensitive' } } },
        { program: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
         <h1 className="text-2xl font-bold text-gray-800">Kelola Pendaftaran Masuk</h1>
         <SearchInput placeholder="Cari nama, email, atau program..." />
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Peserta</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Pembayaran</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status Admin</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendaftarans.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{item.user.name}</div>
                  <div className="text-xs text-gray-500">{item.user.email}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.user.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-blue-700">{item.program}</div>
                  <div className="text-xs text-gray-500 mt-1 max-w-xs truncate" title={item.alamat || ''}>Domisili: {item.alamat || '-'}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${item.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'}`}>
                    {item.paymentStatus === 'Paid' ? 'Lunas' : 'Belum Bayar'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${item.status === 'Approved' ? 'bg-blue-50 text-blue-700 border-blue-200' : item.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {item.status !== 'Approved' && (
                      <form action={updateStatus.bind(null, item.id, 'Approved')}>
                        <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded transition border border-blue-200 text-xs font-bold">✓ Terima</button>
                      </form>
                    )}
                    {item.status !== 'Rejected' && (
                      <form action={updateStatus.bind(null, item.id, 'Rejected')}>
                        <button className="bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1 rounded transition border border-orange-200 text-xs font-bold">✕ Tolak</button>
                      </form>
                    )}
                    <form action={deletePendaftaran.bind(null, item.id)}>
                      <button className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded transition border border-red-200 ml-2 text-xs font-bold">Hapus</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {pendaftarans.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">Tidak ada data ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}