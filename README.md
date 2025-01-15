<h1>Proyek Next.js</h1>
Ini adalah proyek Next.js yang dibuat menggunakan <code>create-next-app</code>. Proyek ini adalah sebuah platform e-commerce untuk toko mainan, dirancang agar mudah dikembangkan, dioptimalkan, dan dikelola. Anda dapat mengakses aplikasi yang sudah dideploy di Klick disini..

Teknologi Utama yang Digunakan
Proyek ini dibangun dengan beberapa teknologi utama berikut:

Next.js: Framework React modern yang mendukung server-side rendering (SSR), static site generation (SSG), dan berbagai fitur lain untuk membangun aplikasi web yang cepat dan SEO-friendly.
React: Library JavaScript untuk membangun antarmuka pengguna (UI) yang dinamis dan interaktif.
Tailwind CSS: Framework CSS berbasis utilitas yang memungkinkan pengembang untuk dengan cepat menerapkan desain UI tanpa perlu menulis CSS secara manual.
Clerk: Layanan autentikasi untuk menangani login, registrasi, dan pengelolaan pengguna di aplikasi Next.js.
Cloudinary: Layanan cloud yang digunakan untuk mengelola dan mengoptimalkan media, termasuk gambar dan video, guna memastikan performa aplikasi tetap cepat.
pg: Library PostgreSQL untuk koneksi dan eksekusi kueri database dari Node.js.
drizzle-orm: ORM untuk berinteraksi dengan database PostgreSQL.
axios: Library untuk melakukan HTTP request yang memudahkan komunikasi antara frontend dan backend.
Teknologi ini dipilih untuk memberikan kinerja, skalabilitas, dan pengalaman pengguna yang optimal.

Environment Variables
Proyek ini membutuhkan file .env yang berisi environment variables penting untuk menjalankan aplikasi. File ini harus diletakkan di direktori root proyek Anda.

Berikut adalah deskripsi untuk setiap environment variable yang dibutuhkan:

Database URLs:

DATABASE_URL: URL koneksi ke database PostgreSQL yang digunakan oleh aplikasi.
NEXT_PUBLIC_DATABASE_URL: URL koneksi ke database PostgreSQL, diakses dari bagian frontend aplikasi.
Clerk keys:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Kunci publik dari Clerk untuk autentikasi pengguna.
CLERK_SECRET_KEY: Kunci rahasia dari Clerk untuk operasi backend.
NEXT_PUBLIC_CLERK_SIGN_IN_URL: URL untuk halaman login pengguna.
NEXT_PUBLIC_CLERK_SIGN_UP_URL: URL untuk halaman registrasi pengguna.
Cloudinary keys:

CLOUDINARY_CLOUD_NAME: Nama cloud pada akun Cloudinary Anda.
CLOUDINARY_API_KEY: API Key dari Cloudinary untuk otentikasi.
CLOUDINARY_API_SECRET: API Secret dari Cloudinary untuk operasi backend.
CLOUDINARY_UPLOAD_PRESET: Preset unggahan untuk konfigurasi pengelolaan media.
Email credentials:

EMAIL_USER: Alamat email yang digunakan untuk mengirimkan email melalui Nodemailer.
EMAIL_PASS: Password atau token autentikasi untuk alamat email tersebut.
Midtrans API keys:

NEXT_PUBLIC_CLIENT: Kunci klien Midtrans.
NEXT_PUBLIC_SECRET: Kunci server Midtrans.
NEXT_PUBLIC_API: URL API Midtrans.
Catatan Penting: Jangan pernah membagikan file .env Anda secara publik. Pastikan file ini tetap aman untuk menjaga kerahasiaan data.

Format .env yang Diperlukan:
env
Copy code
# Database URLs
DATABASE_URL=
NEXT_PUBLIC_DATABASE_URL=

# Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=

# Cloudinary keys
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_PRESET=

# Email credentials
EMAIL_USER=
EMAIL_PASS=

# Midtrans API keys
NEXT_PUBLIC_CLIENT=
NEXT_PUBLIC_SECRET=
NEXT_PUBLIC_API=
Memulai
Ikuti langkah-langkah berikut untuk menjalankan proyek ini:

Clone Repository: Salin repository ke komputer lokal Anda:
bash
Copy code
git clone https://github.com/username/toko-mainan-ecommerce.git
cd toko-mainan-ecommerce
Instal Dependensi: Instal semua dependensi yang diperlukan:
bash
Copy code
npm install
# atau
yarn install
Buat File .env: Buat file .env di direktori root dan tambahkan variabel lingkungan sesuai format di atas.
Jalankan Server Pengembangan: Jalankan aplikasi dalam mode pengembangan:
bash
Copy code
npm run dev
# atau
yarn dev
Akses Aplikasi: Buka http://localhost:3000 di browser Anda untuk melihat aplikasi.
Deploy
Aplikasi ini dapat dengan mudah dideploy menggunakan Vercel. Untuk informasi lebih lanjut, silakan baca dokumentasi deployment Next.js.
