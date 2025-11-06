"use client"
import React, { useState, useEffect } from 'react';


const Header = ({ setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', page: 'home' },
    { name: 'Tentang Kami', page: 'about' },
    { name: 'Program Pelatihan', page: 'programs' },
    { name: 'Kontak', page: 'contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo LPK */}
        <div 
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => setPage('home')}
        >
          LPK <span className="text-gray-800">Harapan Bangsa</span>
        </div>

        {/* Navigasi Desktop */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.page}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(link.page);
              }}
              className="text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Tombol Pendaftaran */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setPage('contact'); // Arahkan ke kontak atau halaman pendaftaran khusus
          }}
          className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Daftar Sekarang
        </a>

        {/* Tombol Menu Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full z-40">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.page}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(link.page);
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:bg-blue-50 px-4 py-2 rounded"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage('contact');
                setIsMenuOpen(false);
              }}
              className="bg-blue-600 text-white text-center px-5 py-2 rounded-full hover:bg-blue-700 transition duration-300 mt-2"
            >
              Daftar Sekarang
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

// --- KOMPONEN FOOTER ---
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tentang LPK */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              LPK Harapan Bangsa
            </h3>
            <p className="text-gray-400">
              Menyiapkan tenaga kerja terampil dan profesional yang siap bersaing
              di dunia industri global.
            </p>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white">Program Pelatihan</a></li>
              <li><a href="#" className="hover:text-white">Galeri</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Hubungi Kami</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Jl. Pelatihan No. 123, Jakarta, Indonesia</li>
              <li>(021) 555-1234</li>
              <li>info@lpkharapanbangsa.com</li>
            </ul>
            {/* Ikon Social Media */}
            <div className="flex space-x-4 mt-4">
              {/* Anda bisa menggunakan ikon dari 'react-icons' di proyek sebenarnya */}
              <a href="#" className="hover:text-white">FB</a>
              <a href="#" className="hover:text-white">IG</a>
              <a href="#" className="hover:text-white">LI</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          &copy; {new Date().getFullYear()} LPK Harapan Bangsa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- "HALAMAN" BERANDA (HOME) ---
const PageHome = ({ setPage }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Wujudkan Karir Impian Anda
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan LPK Harapan Bangsa dan dapatkan pelatihan
            keterampilan kerja terbaik untuk masa depan yang cerah.
          </p>
          <button
            onClick={() => setPage('programs')}
            className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition duration-300"
          >
            Lihat Program Kami
          </button>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Fitur 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Instruktur Profesional
              </h3>
              <p className="text-gray-600">
                Belajar langsung dari para ahli di bidangnya yang memiliki
                pengalaman industri bertahun-tahun.
              </p>
            </div>
            {/* Fitur 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Kurikulum Relevan
              </h3>
              <p className="text-gray-600">
                Materi pelatihan disusun sesuai dengan kebutuhan terbaru dunia
                kerja dan industri.
              </p>
            </div>
            {/* Fitur 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Penyaluran Kerja
              </h3>
              <p className="text-gray-600">
                Kami memiliki jaringan mitra perusahaan yang luas untuk membantu
                lulusan mendapatkan pekerjaan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- "HALAMAN" TENTANG KAMI (ABOUT) ---
const PageAbout = () => {
  return (
    <div className="container mx-auto px-6 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Tentang LPK Harapan Bangsa
      </h1>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Placeholder untuk gambar. Di Next.js, Anda akan menggunakan <Image> */}
        <div className="bg-gray-200 w-full h-80 rounded-lg shadow-lg flex items-center justify-center text-gray-500">
          (Gambar Gedung LPK atau Ruang Kelas)
        </div>
        <div>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            LPK Harapan Bangsa didirikan pada tahun 2010 dengan komitmen
            tinggi untuk menjembatani kesenjangan antara dunia pendidikan dan
            kebutuhan industri. Kami percaya bahwa setiap individu berhak
            mendapatkan kesempatan untuk mengembangkan potensi dan meraih karir
            yang sukses.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Selama lebih dari satu dekade, kami telah meluluskan ribuan tenaga
            kerja terampil yang kini tersebar di berbagai perusahaan nasional
            dan multinasional.
          </p>
        </div>
      </div>

      {/* Visi dan Misi */}
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="bg-blue-50 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Visi Kami</h2>
          <p className="text-gray-700">
            Menjadi lembaga pelatihan kerja terdepan dan terpercaya di
            Indonesia yang menghasilkan lulusan berstandar global.
          </p>
        </div>
        <div className="bg-green-50 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Misi Kami</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Menyelenggarakan pelatihan yang berkualitas dan relevan.
            </li>
            <li>Mengembangkan kurikulum yang inovatif dan adaptif.</li>
            <li>Membangun kemitraan strategis dengan industri.</li>
            <li>Memberikan layanan penyaluran kerja yang optimal.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- "HALAMAN" PROGRAM PELATIHAN ---
const PagePrograms = () => {
  const programs = [
    {
      title: 'Pelatihan Bahasa Jepang (N4)',
      description: 'Program intensif untuk persiapan kerja di Jepang, mencakup bahasa, budaya, dan keterampilan kerja.',
      duration: '6 Bulan',
    },
    {
      title: 'Digital Marketing & E-commerce',
      description: 'Menjadi ahli pemasaran digital dengan menguasai SEO, SEM, Social Media Marketing, dan platform e-commerce.',
      duration: '3 Bulan',
    },
    {
      title: 'Manajemen Perhotelan & Kapal Pesiar',
      description: 'Pelatihan standar internasional untuk berkarir di industri perhotelan bintang lima dan kapal pesiar.',
      duration: '6 Bulan',
    },
    {
      title: 'Pemrograman Web (Full-Stack)',
      description: 'Mempelajari teknologi front-end (React) dan back-end (Node.js) untuk menjadi developer yang siap kerja.',
      duration: '4 Bulan',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Program Pelatihan Unggulan
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
          >
            {/* Placeholder Gambar */}
            <div className="bg-gray-200 h-48 w-full flex items-center justify-center text-gray-400">
              (Gambar {program.title})
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                {program.title}
              </h3>
              <p className="text-gray-600 mb-4">{program.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Durasi: {program.duration}</span>
                <a href="#" className="text-blue-600 font-medium hover:underline">
                  Detail...
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- "HALAMAN" KONTAK ---
const PageContact = () => {
  return (
    <div className="container mx-auto px-6 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Hubungi Kami
      </h1>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Ada pertanyaan atau ingin mendaftar? Jangan ragu untuk menghubungi kami
        melalui formulir di bawah ini atau datang langsung ke kantor kami.
      </p>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg">
        {/* Form Kontak */}
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Alamat Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Pesan
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
          >
            Kirim Pesan
          </button>
        </form>

        {/* Info Kontak & Peta */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Informasi Kontak
          </h3>
          <ul className="space-y-4 text-lg text-gray-700 mb-6">
            <li>
              <strong>Alamat:</strong> Jl. Pelatihan No. 123, Jakarta, Indonesia
            </li>
            <li><strong>Telepon:</strong> (021) 555-1234</li>
            <li><strong>Email:</strong> info@lpkharapanbangsa.com</li>
            <li><strong>Jam Kerja:</strong> Senin - Jumat (08:00 - 17:00)</li>
          </ul>

          {/* Placeholder Peta */}
          <div className="bg-gray-200 h-64 w-full rounded-lg flex items-center justify-center text-gray-500">
            (Google Maps Placeholder)
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN APLIKASI UTAMA (APP) ---
// Ini bertindak seperti `_app.js` dan router di Next.js
export default function App() {
  // State untuk mengontrol halaman mana yang ditampilkan
  // Di Next.js, ini dikelola oleh router (file-based routing)
  const [page, setPage] = useState('home');

  // Fungsi untuk me-render halaman yang sesuai
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <PageHome setPage={setPage} />;
      case 'about':
        return <PageAbout />;
      case 'programs':
        return <PagePrograms />;
      case 'contact':
        return <PageContact />;
      default:
        return <PageHome setPage={setPage} />;
    }
  };
  
  // Tambahkan sedikit CSS untuk animasi (opsional)
  // Di Next.js, ini akan ada di `globals.css`
  const globalStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
  `;

  return (
    <div className="font-sans text-gray-800">
      {/* Sisipkan style global */}
      <style>{globalStyles}</style>

      {/* Header bersifat persisten di semua halaman */}
      <Header setPage={setPage} />

      {/* Konten halaman dinamis */}
      <main>
        {renderPage()}
      </main>

      {/* Footer bersifat persisten di semua halaman */}
      <Footer />
    </div>
  );
}