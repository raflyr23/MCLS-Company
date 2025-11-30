Website Pendaftaran Pelatihan LPK MCLS

Website ini dibangun menggunakan Next.js, Tailwind CSS, Prisma, dan Midtrans Payment Gateway. Ikuti langkah di bawah ini untuk menjalankan program di komputer Anda.

Prasyarat

Pastikan komputer Anda sudah terinstall:

Node.js (Versi 18 atau terbaru)

Git

Database PostgreSQL (Bisa lokal atau online seperti Supabase/Neon)

Ngrok (Untuk mengekspos localhost ke internet)

Cara Instalasi

Download atau Clone Repository
Buka terminal atau CMD, lalu jalankan:
git clone https://www.google.com/search?q=https://github.com/raflyr23/MCLS-Company.git

Install Dependencies
Download semua library yang dibutuhkan dengan perintah:
npm install

Konfigurasi Environment (.env) Buat file baru bernama .env di folder utama proyek. Copy dan paste .env.example

6. Setup Ngrok (Penting untuk Midtrans)

Agar Midtrans bisa mengarahkan user kembali ke website Anda setelah bayar (Redirect) dan mengirim notifikasi status, localhost harus bisa diakses publik.

Jalankan Ngrok
Buka terminal baru (jangan tutup terminal npm run dev), lalu ketik:
ngrok http 3000

Ambil URL Forwarding
Copy URL HTTPS yang muncul (Contoh: https://abcd-1234.ngrok-free.app).

Update file .env
Ganti NEXT_PUBLIC_BASE_URL dengan URL Ngrok tersebut:
NEXT_PUBLIC_BASE_URL="https://www.google.com/search?q=https://abcd-1234.ngrok-free.app"

(Restart terminal npm run dev setiap kali mengubah file .env)

Update Dashboard Midtrans (Sandbox)

Login ke Midtrans Dashboard.

Masuk ke Settings > Payment> Notification URL.

Isi Notification URL endpoint dengan: https://abcd-1234.ngrok-free.app/profile

Catatan Penting

Akses Midtrans: Pastikan Access Keys di .env adalah versi SANDBOX.

URL Ngrok Berubah: Setiap kali Anda mematikan Ngrok, URL-nya akan berubah. Anda harus update .env dan Dashboard Midtrans lagi (kecuali Anda punya akun Ngrok berbayar).

Login User: Jika database masih kosong, daftar akun baru lewat menu Register di website.

Teknologi yang Dipakai

Next.js (App Router)

Tailwind CSS (Styling)

Prisma ORM (Database)

NextAuth.js (Otentikasi)

Midtrans (Pembayaran)
