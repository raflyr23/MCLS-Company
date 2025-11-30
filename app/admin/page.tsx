// app/admin/page.tsx
import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const userCount = await prisma.user.count();
  const programCount = await prisma.program.count();
  const pendaftaranCount = await prisma.pendaftaran.count();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-500">Total User</p>
          <p className="text-3xl font-bold text-gray-800">{userCount}</p>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-500">Program Aktif</p>
          <p className="text-3xl font-bold text-gray-800">{programCount}</p>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-500">Total Pendaftaran</p>
          <p className="text-3xl font-bold text-gray-800">{pendaftaranCount}</p>
        </div>
      </div>
    </div>
  );
}