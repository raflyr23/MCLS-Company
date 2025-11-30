// lib/data.ts
import React from 'react';

// PERUBAHAN: 'page' diubah menjadi 'href' untuk <Link> Next.js
export const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang Kami', href: '/about' },
  { name: 'Program Pelatihan', href: '/programs' },
  { name: 'Kontak', href: '/contact' },
];

type IconProps = React.SVGProps<SVGSVGElement>;

// Data untuk Halaman Beranda
export const HOME_FEATURES = [
 {
    title: 'Instruktur Profesional',
    description: 'Belajar langsung dari para ahli di bidangnya yang memiliki pengalaman industri bertahun-tahun.',
    icon: (props: IconProps) => (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: 'Kurikulum Relevan',
    description: 'Materi pelatihan disusun sesuai dengan kebutuhan terbaru dunia kerja dan industri.',
    icon: (props: IconProps) => (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m0 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0 0v.001M12 19.753a2.5 2.5 0 010-5M12 14.253V8.75m0 0c.39.049.777.102 1.158.16C14.802 9.06 16.32 9.7 17.5 10.75m-5.5-2.001c-.381.058-.768.111-1.158.16C9.198 9.06 7.68 9.7 6.5 10.75M12 8.75m0 0v-2.5m0 2.5c.39.049.777.102 1.158.16C14.802 9.06 16.32 9.7 17.5 10.75m-5.5-2.001c-.381.058-.768.111-1.158.16C9.198 9.06 7.68 9.7 6.5 10.75" /></svg>
    ),
  },
  {
    title: 'Penyaluran Kerja',
    description: 'Kami memiliki jaringan mitra perusahaan yang luas untuk membantu lulusan mendapatkan pekerjaan.',
    icon: (props: IconProps) => (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4m-4 0H9m4 0h1.5M12 15v4m-3-3l3 3 3-3" /></svg>
    ),
  },
  // ... (fitur lainnya)
];

// Data untuk Halaman Program
export const PROGRAMS = [
  {
    title: 'Pelatihan Bahasa Jepang (N4)',
    slug: 'pelatihan-bahasa-jepang-n4',
    imageSrc: '/images/program-jepang.jpg', // (simpan gambar di /public/images/program-jepang.jpg)
    description: 'Program intensif untuk persiapan kerja di Jepang, mencakup bahasa, budaya, dan keterampilan kerja.',
    duration: '6 Bulan',
  },
  {
    title: 'Digital Marketing & E-commerce',
    slug: 'digital-marketing',
    imageSrc: '/images/program-digital.jpg', // (simpan gambar di /public/images/program-digital.jpg)
    description: 'Menjadi ahli pemasaran digital dengan menguasai SEO, SEM, Social Media Marketing, dan platform e-commerce.',
    duration: '3 Bulan',
  },
  {
    title: 'Manajemen Perhotelan & Kapal Pesiar',
    slug: 'manajemen-perhotelan-kapal-pesiar',
    imageSrc: '/images/program-perhotelan.jpg', // (simpan gambar di /public/images/program-perhotelan.jpg)
    description: 'Pelatihan standar internasional untuk berkarir di industri perhotelan bintang lima dan kapal pesiar.',
    duration: '6 Bulan',
  },
  {
    title: 'Pemrograman Web (Full-Stack)',
    slug: 'pemrograman-web-full-stack',
    imageSrc: '/images/program-web-dev.jpg', // (simpan gambar di /public/images/program-web-dev.jpg)
    description: 'Mempelajari teknologi front-end (React) dan back-end (Node.js) untuk menjadi developer yang siap kerja.',
    duration: '4 Bulan',
  },
  {
    title: 'Desain Grafis & Multimedia',
    slug: 'desain-grafis-multimedia',
    imageSrc: '/images/program-desain-grafis.jpg', // (simpan gambar di /public/images/program-desain-grafis.jpg)
    description: 'Kuasai alat desain terpopuler (Adobe Suite) dan bangun portofolio desain yang mengesankan.',
    duration: '3 Bulan',
  },
  {
    title: 'Teknisi Komputer & Jaringan',
    slug: 'teknisi-komputer-jaringan',
    imageSrc: '/images/program-teknisi-jaringan.jpg', // (simpan gambar di /public/images/program-teknisi-jaringan.jpg)
    description: 'Pelatihan praktis untuk menjadi teknisi handal yang mampu menangani masalah hardware, software, dan jaringan.',
    duration: '44 Bulan',
  },
];