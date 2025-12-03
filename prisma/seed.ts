// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const programs = [
  {
    title: 'Pelatihan Bahasa Jepang (N4)',
    slug: 'pelatihan-bahasa-jepang-n4',
    imageSrc: '/images/program-jepang.jpg',
    description: 'Program intensif untuk persiapan kerja di Jepang, mencakup bahasa, budaya, dan keterampilan kerja.',
    duration: '6 Bulan',
    price: 5000000,
  },
  {
    title: 'Digital Marketing & E-commerce',
    slug: 'digital-marketing',
    imageSrc: '/images/program-digital.jpg',
    description: 'Menjadi ahli pemasaran digital dengan menguasai SEO, SEM, Social Media Marketing, dan platform e-commerce.',
    duration: '3 Bulan',
    price: 3500000,
  },
  {
    title: 'Manajemen Perhotelan & Kapal Pesiar',
    slug: 'manajemen-perhotelan-kapal-pesiar',
    imageSrc: '/images/program-perhotelan.jpg',
    description: 'Pelatihan standar internasional untuk berkarir di industri perhotelan bintang lima dan kapal pesiar.',
    duration: '6 Bulan',
    price: 7000000,
  },
  {
    title: 'Pemrograman Web (Full-Stack)',
    slug: 'pemrograman-web-full-stack',
    imageSrc: '/images/program-web-dev.jpg',
    description: 'Mempelajari teknologi front-end (React) dan back-end (Node.js) untuk menjadi developer yang siap kerja.',
    duration: '4 Bulan',
    price: 4500000,
  },
  {
    title: 'Desain Grafis & Multimedia',
    slug: 'desain-grafis-multimedia',
    imageSrc: '/images/program-desain-grafis.jpg',
    description: 'Kuasai alat desain terpopuler (Adobe Suite) dan bangun portofolio desain yang mengesankan.',
    duration: '3 Bulan',
    price: 3000000,
  },
  {
    title: 'Teknisi Komputer & Jaringan',
    slug: 'teknisi-komputer-jaringan',
    imageSrc: '/images/program-teknisi-jaringan.jpg',
    description: 'Pelatihan praktis untuk menjadi teknisi handal yang mampu menangani masalah hardware, software, dan jaringan.',
    duration: '4 Bulan',
    price: 3500000,
  },
];

async function main() {
  console.log('🌱 Memulai proses seeding...');

  // 1. Buat Akun Admin
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mcls.com' },
    update: {},
    create: {
      email: 'admin@mcls.com',
      name: 'Super Admin',
      password: passwordHash,
      role: 'ADMIN',
      phone: '081234567890',
    },
  });
  console.log(`✅ Admin dibuat: ${admin.email}`);

  // 2. Buat Program Pelatihan
  for (const p of programs) {
    const program = await prisma.program.upsert({
      where: { slug: p.slug },
      update: {}, // Jika sudah ada, jangan diubah
      create: p,
    });
    console.log(`✅ Program dibuat: ${program.title}`);
  }

  console.log('🏁 Seeding selesai!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });