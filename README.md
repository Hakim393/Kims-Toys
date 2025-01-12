Proyek Next.js
Ini adalah proyek Next.js yang dibuat menggunakan create-next-app.

Memulai
Pertama, jalankan server pengembangan:

bash
Copy code
npm run dev

# atau

yarn dev

# atau

pnpm dev

# atau

bun dev
Buka <http://localhost:3000> di browser untuk melihat hasilnya.

Anda dapat mulai mengedit halaman dengan memodifikasi file app/page.js. Halaman akan diperbarui secara otomatis saat Anda mengedit file.

Proyek ini menggunakan next/font untuk mengoptimalkan dan memuat font Geist secara otomatis, sebuah keluarga font baru dari Vercel.

Environment Variables
Jangan lupa untuk membuat file .env di direktori root proyek Anda. Berikut adalah contoh format file .env yang diperlukan. Sesuaikan isi dengan data Anda sendiri:

env
Copy code
DATABASE_URL=postgresql://username_anda:password_anda@host_anda/database_anda?sslmode=require

NEXT_PUBLIC_DATABASE_URL=postgresql://username_anda:password_anda@host_anda/database_anda?sslmode=require

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=publishable_key_anda
CLERK_SECRET_KEY=secret_key_anda

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

CLOUDINARY_CLOUD_NAME=nama_cloudinary_anda
CLOUDINARY_API_KEY=api_key_cloudinary_anda
CLOUDINARY_API_SECRET=api_secret_cloudinary_anda
CLOUDINARY_UPLOAD_PRESET=upload_preset_anda

NEXT_PUBLIC_PAYPAL_CLIENT_ID=client_id_paypal_anda
EMAIL_USER=email_anda
EMAIL_PASS=password_email_anda
Pelajari Lebih Lanjut
Untuk mempelajari lebih lanjut tentang Next.js, lihat sumber daya berikut:

Dokumentasi Next.js - Pelajari tentang fitur dan API Next.js.
Belajar Next.js - Tutorial interaktif Next.js.
Anda juga dapat melihat repositori GitHub Next.js - kami menyambut umpan balik dan kontribusi Anda!

Deploy di Vercel
Cara termudah untuk melakukan deploy aplikasi Next.js Anda adalah menggunakan Platform Vercel dari pembuat Next.js.

Lihat dokumentasi deployment Next.js untuk informasi lebih lanjut.
