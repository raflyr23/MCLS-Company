Website Pendaftaran Pelatihan LPK MCLS

Website ini dibangun menggunakan Next.js, Tailwind CSS, Prisma, dan Midtrans Payment Gateway sebagai sistem pembayaran. Ikuti langkah-langkah di bawah ini untuk menjalankan project di komputer Anda.

🚀 Prasyarat

Pastikan komputer Anda sudah terpasang:

Node.js (Versi 18 atau terbaru)

Git

PostgreSQL Database (Lokal atau menggunakan layanan seperti Supabase/Neon)

Ngrok (Untuk mengekspos localhost ke internet agar Midtrans dapat melakukan callback)

📥 Cara Instalasi
1. Clone Repository

Buka terminal/CMD lalu jalankan:

git clone https://github.com/raflyr23/MCLS-Company.git

2. Install Dependencies

Jalankan perintah:

npm install

3. Konfigurasi Environment

Buat file .env di folder utama, lalu salin isi dari .env.example.

🌐 Setup Ngrok (Wajib untuk Midtrans)

Midtrans membutuhkan URL publik untuk proses redirect setelah pembayaran dan mengirim notification callback.

1. Jalankan Ngrok

Buka terminal baru (jangan tutup terminal npm run dev):

ngrok http 3000

2. Ambil URL Forwarding

Copy URL HTTPS yang muncul, contoh:

https://abcd-1234.ngrok-free.app

3. Update File .env
NEXT_PUBLIC_BASE_URL="https://abcd-1234.ngrok-free.app"


Note: Restart npm run dev setiap kali mengubah file .env

🔧 Update Dashboard Midtrans (Sandbox)

Login ke Dashboard Midtrans

Masuk ke Settings > Payment > Notification URL

Isi Notification URL sebagai berikut:

https://abcd-1234.ngrok-free.app/profile

⚠️ Catatan Penting

Gunakan Midtrans Access Keys versi SANDBOX di .env

URL Ngrok selalu berubah jika Ngrok dimatikan → update .env dan dashboard Midtrans kembali

Jika database masih kosong, buat user baru melalui halaman Register

🛠️ Teknologi yang Digunakan

Next.js (App Router)

Tailwind CSS

Prisma ORM

NextAuth.js

Midtrans Payment Gateway
