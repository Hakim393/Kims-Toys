Proyek Next.js
Ini adalah proyek Next.js yang dibuat menggunakan create-next-app. Proyek ini adalah sebuah platform e-commerce untuk toko mainan, dirancang agar mudah dikembangkan, dioptimalkan, dan dikelola.

Teknologi Utama yang Digunakan
Proyek ini dibangun dengan beberapa teknologi utama berikut:

Next.js: Framework React modern yang mendukung server-side rendering (SSR), static site generation (SSG), dan berbagai fitur lain untuk membangun aplikasi web yang cepat dan SEO-friendly.

React: Library JavaScript untuk membangun antarmuka pengguna (UI) yang dinamis dan interaktif.

Tailwind CSS: Framework CSS berbasis utilitas yang memungkinkan pengembang untuk dengan cepat menerapkan desain UI tanpa perlu menulis CSS secara manual.

Clerk: Layanan autentikasi untuk menangani login, registrasi, dan pengelolaan pengguna di aplikasi Next.js.

Cloudinary: Layanan cloud yang digunakan untuk mengelola dan mengoptimalkan media, termasuk gambar dan video, guna memastikan performa aplikasi tetap cepat.

PayPal React SDK: Integrasi dengan layanan pembayaran PayPal untuk memproses transaksi secara aman.

pg: Library PostgreSQL untuk koneksi dan eksekusi kueri database dari Node.js.

Nodemailer: Library yang digunakan untuk mengirimkan email, seperti konfirmasi pesanan atau pemberitahuan lain.

Teknologi ini dipilih untuk memberikan kinerja, skalabilitas, dan pengalaman pengguna yang optimal.

Variabel Lingkungan (Environment Variables)
Proyek ini membutuhkan file .env yang berisi variabel lingkungan penting untuk menjalankan aplikasi. File ini harus diletakkan di direktori root proyek Anda.

Berikut adalah deskripsi untuk setiap variabel lingkungan yang dibutuhkan:

env
Copy code
DATABASE_URL=postgresql://username_anda:password_anda@host_anda/database_anda?sslmode=require
DATABASE_URL: URL koneksi ke database PostgreSQL yang digunakan oleh aplikasi.
env
Copy code
NEXT_PUBLIC_DATABASE_URL=postgresql://username_anda:password_anda@host_anda/database_anda?sslmode=require
NEXT_PUBLIC_DATABASE_URL: URL koneksi ke database PostgreSQL, diakses dari bagian frontend aplikasi.
env
Copy code
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=publishable_key_anda
CLERK_SECRET_KEY=secret_key_anda
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Kunci publik dari Clerk untuk autentikasi pengguna.
CLERK_SECRET_KEY: Kunci rahasia dari Clerk untuk operasi backend.
env
Copy code
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_URL: URL untuk halaman login pengguna.
NEXT_PUBLIC_CLERK_SIGN_UP_URL: URL untuk halaman registrasi pengguna.
env
Copy code
CLOUDINARY_CLOUD_NAME=nama_cloudinary_anda
CLOUDINARY_API_KEY=api_key_cloudinary_anda
CLOUDINARY_API_SECRET=api_secret_cloudinary_anda
CLOUDINARY_UPLOAD_PRESET=upload_preset_anda
CLOUDINARY_CLOUD_NAME: Nama cloud pada akun Cloudinary Anda.
CLOUDINARY_API_KEY: API Key dari Cloudinary untuk otentikasi.
CLOUDINARY_API_SECRET: API Secret dari Cloudinary untuk operasi backend.
CLOUDINARY_UPLOAD_PRESET: Preset unggahan untuk konfigurasi pengelolaan media.
env
Copy code
NEXT_PUBLIC_PAYPAL_CLIENT_ID=client_id_paypal_anda
NEXT_PUBLIC_PAYPAL_CLIENT_ID: Client ID dari PayPal untuk memproses pembayaran.
env
Copy code
EMAIL_USER=email_anda
EMAIL_PASS=password_email_anda
EMAIL_USER: Alamat email yang digunakan untuk mengirimkan email melalui Nodemailer.
EMAIL_PASS: Password atau token autentikasi untuk alamat email tersebut.
Catatan Penting: Jangan pernah membagikan file .env Anda secara publik. Pastikan file ini tetap aman untuk menjaga kerahasiaan data.

Memulai
Ikuti langkah-langkah berikut untuk menjalankan proyek ini:

Clone Repository Salin repository ke komputer lokal Anda:

bash
Copy code
git clone <https://github.com/username/toko-mainan-ecommerce.git>
cd toko-mainan-ecommerce
Instal Dependensi Instal semua dependensi yang diperlukan:

bash
Copy code
npm install

# atau

yarn install
Buat File .env Buat file .env di direktori root dan tambahkan variabel lingkungan sesuai format di atas.

Jalankan Server Pengembangan Jalankan aplikasi dalam mode pengembangan:

bash
Copy code
npm run dev

# atau

yarn dev
Akses Aplikasi Buka <http://localhost:3000> di browser Anda untuk melihat aplikasi.

Deploy
Aplikasi ini dapat dengan mudah dideploy menggunakan Vercel. Untuk informasi lebih lanjut, silakan baca dokumentasi deployment Next.js.
