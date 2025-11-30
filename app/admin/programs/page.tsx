import React from 'react';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { deleteProgram } from './actions';
import ProgramForm from './ProgramForm'; // Import komponen Modal

export default async function ManageProgramsPage() {
  // Ambil data program dari database, urutkan dari yang terbaru
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      {/* Header Halaman */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Program</h1>
          <p className="text-gray-500 text-sm">Tambah, edit, atau hapus program pelatihan.</p>
        </div>
        
        {/* Tombol Tambah (Tanpa props, jadi mode Tambah) */}
        <ProgramForm />
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Info Program</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Durasi</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {programs.map((program) => (
              <tr key={program.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap w-24">
                  <div className="relative h-16 w-24 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                    {/* Gambar Thumbnail */}
                    <Image
                      src={program.imageSrc}
                      alt={program.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900 mb-1">{program.title}</div>
                  <div className="text-xs text-gray-500 line-clamp-2 max-w-md">
                    {program.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {program.duration}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end items-center gap-3">
                    
                    {/* Tombol Edit (Kirim props program, jadi mode Edit) */}
                    <ProgramForm program={program} />

                    {/* Tombol Hapus */}
                    <form action={deleteProgram.bind(null, program.id)}>
                      <button 
                        type="submit"
                        className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded text-sm font-medium hover:bg-red-100 transition"
                      >
                        Hapus
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Tampilan jika data kosong */}
            {programs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    <p>Belum ada program pelatihan.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}