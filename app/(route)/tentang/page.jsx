"use client";
import React from "react";

function Tentang() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-gray-100 min-h-screen font-mono">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-800 via-blue-800 to-teal-700 py-8 shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-teal-300 neon-effect animate-neon">
            Kims <span className="neon-letter">T</span>oys
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            Kenal lebih jauh tentang kami dan cerita di balik toko ini
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10 space-y-16">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-teal-300">Tentang Kami</h2>
          <p className="text-gray-300 mt-4 leading-relaxed">
            Kami adalah sebuah toko mainan yang berkomitmen untuk menghadirkan
            pengalaman belanja terbaik bagi pelanggan dari berbagai kalangan.
            Produk kami menggabungkan kreativitas, edukasi, dan hiburan dengan
            teknologi modern.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-teal-300">Visi & Misi</h2>
            <ul className="list-disc list-inside text-gray-300 mt-4 space-y-3">
              <li>
                Memberikan produk berkualitas tinggi yang mendukung kreativitas.
              </li>
              <li>
                Menggunakan teknologi terkini untuk meningkatkan kenyamanan
                belanja.
              </li>
              <li>Membangun hubungan jangka panjang dengan pelanggan.</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/fikhihakim-project/image/upload/v1736341425/Kims_ogkzna.webp"
              alt="Visi dan Misi Kims Toys"
              className="rounded-lg shadow-xl w-96 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row md:space-x-10 items-center">
          <div className="flex-shrink-0">
            <img
              src="Assets/FikhiHakim.jpg"
              alt="Fikhi Hakim"
              className="rounded-full w-48 h-48 md:w-64 md:h-64 border-4 border-teal-300 shadow-lg hover:rotate-6 transition-transform duration-500"
            />
          </div>
          <div className="mt-5 md:mt-0 text-center md:text-left">
            <h2 className="text-4xl font-semibold text-teal-300">
              Fikhi Hakim
            </h2>
            <p className="text-lg text-gray-300 mt-2">NPM: 50422575</p>
            <p className="text-lg text-gray-300 mt-2">Kelas: 3IA28</p>
            <p className="text-lg text-gray-300 mt-2">Jurusan: Informatika</p>
            <p className="text-lg text-gray-300 mt-1">
              Pekerjaan: Junior Web Developer
            </p>
            <p className="text-gray-300 mt-3">
              Halo, saya adalah developer website Kims Toys. Dengan semangat
              untuk menghadirkan pengalaman belanja online yang nyaman dan
              modern ditoko saya. Saya membangun platform ini menggunakan
              teknologi modern yang banyak digunakan oleh perusahaan perusahaan
              besar, Website ini dirancang menggunakan framework dari sebuah
              library ReactJS yaitu Next.js untuk memastikan performa lebih
              optimal, responsivitas, dan tampilan yang interaktif. Untuk sistem
              autentikasi yang aman, saya menggunakan Clerk Auth, sementara
              manajemen data saya menggunakan Drizzle ORM, untuk database
              menggunakan PostgreSQL dan pengelolaannya menggunakan Neon, yang
              memberikan skalabilitas dan keandalan tinggi. Untuk pengelolaan
              media saya menggunakan Cloudinary, yang membuat gambar ditampilkan
              dengan kualitas terbaik. Backend dikembangkan menggunakan
              Express.js, memastikan pengolahan data yang efisien dan cepat.
              Selain itu, saya memanfaatkan Tailwind CSS untuk desain yang
              modern dan menarik, serta animasi yang dinamis dengan bantuan
              Tailwind Merge, Tailwind CSS Animate dan saya menggunakan tools
              component UI yaitu shacnd. Seluruh teknologi ini dirangkai untuk
              menciptakan platform e-commerce yang tidak hanya fungsional,
              tetapi juga memberikan pengalaman yang berkesan bagi setiap
              pengguna platform saya ini.
            </p>
            <div className="mt-5">
              <h3 className="text-lg font-semibold text-teal-300">Kontak</h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  LinkedIn:{" "}
                  <a
                    href="https://www.linkedin.com/in/fikhi-hakim-b1779a17b/"
                    target="_blank"
                    className="text-teal-300 underline hover:text-teal-500"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  GitHub:{" "}
                  <a
                    href="https://github.com/Hakim393"
                    target="_blank"
                    className="text-teal-300 underline hover:text-teal-500"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  Instagram:{" "}
                  <a
                    href="https://www.instagram.com/kimmm.393/"
                    target="_blank"
                    className="text-teal-300 underline hover:text-teal-500"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-purple-800 via-blue-800 to-teal-700 py-6">
        <div className="container mx-auto px-6 text-center text-gray-300">
          <p>&copy; 2024 Fikhi Hakim. All rights reserved.</p>
        </div>
      </footer>

      {/* Neon Effect Styles */}
      <style jsx>{`
        .neon-effect {
          text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14,
            0 0 40px #ff6ec7, 0 0 80px #ff6ec7, 0 0 90px #ff6ec7;
        }
        .animate-neon {
          animation: neon-blink 2s infinite;
        }
        @keyframes neon-blink {
          0%,
          49%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .neon-letter {
          animation: flicker 3s infinite;
        }
        @keyframes flicker {
          0%,
          19%,
          21%,
          23%,
          25%,
          54%,
          56%,
          100% {
            opacity: 1;
          }
          20%,
          24%,
          55% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}

export default Tentang;
