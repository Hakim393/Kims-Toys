  <h1>Proyek Next.js</h1>
    <p>
        Ini adalah proyek Next.js yang dibuat menggunakan <code>create-next-app</code>. 
        Proyek ini adalah sebuah platform e-commerce untuk toko mainan, dirancang agar mudah 
        dikembangkan, dioptimalkan, dan dikelola.
    </p>

  <h2>Teknologi Utama yang Digunakan</h2>
    <p>Proyek ini dibangun dengan beberapa teknologi utama berikut:</p>
    <ul>
        <li><strong>Next.js</strong>: Framework React modern yang mendukung server-side rendering (SSR), static site generation (SSG), dan berbagai fitur lain untuk membangun aplikasi web yang cepat dan SEO-friendly.</li>
        <li><strong>React</strong>: Library JavaScript untuk membangun antarmuka pengguna (UI) yang dinamis dan interaktif.</li>
        <li><strong>Tailwind CSS</strong>: Framework CSS berbasis utilitas yang memungkinkan pengembang untuk dengan cepat menerapkan desain UI tanpa perlu menulis CSS secara manual.</li>
        <li><strong>Clerk</strong>: Layanan autentikasi untuk menangani login, registrasi, dan pengelolaan pengguna di aplikasi Next.js.</li>
        <li><strong>Cloudinary</strong>: Layanan cloud yang digunakan untuk mengelola dan mengoptimalkan media, termasuk gambar dan video, guna memastikan performa aplikasi tetap cepat.</li>
        <li><strong>PayPal React SDK</strong>: Integrasi dengan layanan pembayaran PayPal untuk memproses transaksi secara aman.</li>
        <li><strong>pg</strong>: Library PostgreSQL untuk koneksi dan eksekusi kueri database dari Node.js.</li>
        <li><strong>Nodemailer</strong>: Library yang digunakan untuk mengirimkan email, seperti konfirmasi pesanan atau pemberitahuan lain.</li>
    </ul>
    <p>Teknologi ini dipilih untuk memberikan kinerja, skalabilitas, dan pengalaman pengguna yang optimal.</p>

  <h2>Variabel Lingkungan (Environment Variables)</h2>
    <p>
        Proyek ini membutuhkan file <code>.env</code> yang berisi variabel lingkungan penting untuk menjalankan aplikasi. 
        File ini harus diletakkan di direktori root proyek Anda.
    </p>
    <p>Berikut adalah deskripsi untuk setiap variabel lingkungan yang dibutuhkan:</p>
    <ul>
        <li><code>DATABASE_URL</code>: URL koneksi ke database PostgreSQL yang digunakan oleh aplikasi.</li>
        <li><code>NEXT_PUBLIC_DATABASE_URL</code>: URL koneksi ke database PostgreSQL, diakses dari bagian frontend aplikasi.</li>
        <li><code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>: Kunci publik dari Clerk untuk autentikasi pengguna.</li>
        <li><code>CLERK_SECRET_KEY</code>: Kunci rahasia dari Clerk untuk operasi backend.</li>
        <li><code>NEXT_PUBLIC_CLERK_SIGN_IN_URL</code>: URL untuk halaman login pengguna.</li>
        <li><code>NEXT_PUBLIC_CLERK_SIGN_UP_URL</code>: URL untuk halaman registrasi pengguna.</li>
        <li><code>CLOUDINARY_CLOUD_NAME</code>: Nama cloud pada akun Cloudinary Anda.</li>
        <li><code>CLOUDINARY_API_KEY</code>: API Key dari Cloudinary untuk otentikasi.</li>
        <li><code>CLOUDINARY_API_SECRET</code>: API Secret dari Cloudinary untuk operasi backend.</li>
        <li><code>CLOUDINARY_UPLOAD_PRESET</code>: Preset unggahan untuk konfigurasi pengelolaan media.</li>
        <li><code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code>: Client ID dari PayPal untuk memproses pembayaran.</li>
        <li><code>EMAIL_USER</code>: Alamat email yang digunakan untuk mengirimkan email melalui Nodemailer.</li>
        <li><code>EMAIL_PASS</code>: Password atau token autentikasi untuk alamat email tersebut.</li>
    </ul>
    <p><strong>Catatan Penting:</strong> Jangan pernah membagikan file <code>.env</code> Anda secara publik. Pastikan file ini tetap aman untuk menjaga kerahasiaan data.</p>

  <h2>Memulai</h2>
    <p>Ikuti langkah-langkah berikut untuk menjalankan proyek ini:</p>
    <ol>
        <li><strong>Clone Repository</strong>: Salin repository ke komputer lokal Anda:
            <pre><code>git clone https://github.com/username/toko-mainan-ecommerce.git
cd toko-mainan-ecommerce</code></pre>
        </li>
        <li><strong>Instal Dependensi</strong>: Instal semua dependensi yang diperlukan:
            <pre><code>npm install
# atau
yarn install</code></pre>
        </li>
        <li><strong>Buat File <code>.env</code></strong>: Buat file <code>.env</code> di direktori root dan tambahkan variabel lingkungan sesuai format di atas.</li>
        <li><strong>Jalankan Server Pengembangan</strong>: Jalankan aplikasi dalam mode pengembangan:
            <pre><code>npm run dev
# atau
yarn dev</code></pre>
        </li>
        <li><strong>Akses Aplikasi</strong>: Buka <a href="http://localhost:3000">http://localhost:3000</a> di browser Anda untuk melihat aplikasi.</li>
    </ol>

    <h2>Deploy</h2>
    <p>
        Aplikasi ini dapat dengan mudah dideploy menggunakan <a href="https://vercel.com/">Vercel</a>. 
        Untuk informasi lebih lanjut, silakan baca 
        <a href="https://nextjs.org/docs/app/building-your-application/deploying">dokumentasi deployment Next.js</a>.
    </p>
