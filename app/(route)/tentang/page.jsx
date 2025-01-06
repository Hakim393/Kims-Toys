"use client";
import React from "react";

function Tentang() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-gray-100 min-h-screen font-mono">
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
      <main className="container mx-auto px-6 py-10 space-y-16">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-teal-300">Tentang Kami</h2>
          <p className="text-gray-300 mt-4 leading-relaxed">
            Kami adalah sebuah toko mainan yang berkomitmen untuk menghadirkan
            pengalaman belanja terbaik bagi pelanggan dari berbagai kalangan.
            Berawal dari ide sederhana untuk menyediakan mainan berkualitas
            tinggi, kami telah berkembang menjadi platform inovatif yang
            menggabungkan teknologi modern dengan pelayanan ramah dan personal.
            Di toko kami, Anda dapat menemukan beragam mainan yang tidak hanya
            menghibur, tetapi juga mendukung perkembangan kreativitas dan
            edukasi anak-anak. Kami percaya bahwa setiap mainan memiliki cerita,
            dan misi kami adalah membantu menciptakan momen berharga melalui
            produk yang kami tawarkan. Dengan fokus pada kualitas,
            keberlanjutan, dan inovasi, kami terus berusaha menjadi tujuan utama
            bagi para pecinta mainan di mana saja.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-teal-300">Visi & Misi</h2>
            <ul className="list-disc list-inside text-gray-300 mt-4 space-y-3">
              <li>
                Memberikan produk berkualitas tinggi yang mendukung kebutuhan
                pelanggan.
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
              src="Assets/vision.jpg"
              alt="Visi dan Misi"
              className="rounded-lg shadow-xl w-96 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>
        <section className="flex flex-col md:flex-row md:space-x-10 items-center">
          <div className="flex-shrink-0">
            <img
              src="Assets/FikhiHakim.jpg"
              alt="Foto Pembuat"
              className="rounded-full w-48 h-48 md:w-64 md:h-64 border-4 border-teal-300 shadow-lg hover:rotate-6 transition-transform duration-500"
            />
          </div>
          <div className="mt-5 md:mt-0 text-center md:text-left">
            <h2 className="text-4xl font-semibold text-teal-300">
              Fikhi Hakim
            </h2>
            <p className="text-lg text-gray-300 mt-2">Kelas: 3IA28</p>
            <p className="text-lg text-gray-300 mt-2">Jurusan: Informatika</p>
            <p className="text-lg text-gray-300 mt-1">Universitas Gunadarma</p>
            <p className="text-lg text-gray-300 mt-1">
              Pekerjaan: Junior Software Engineer at Pt Indo Pro Teknologi
            </p>
            <p className="text-gray-300 mt-3">
              Saya seorang Junior Software Engineer yang punya pengalaman bikin
              aplikasi web menggunakan teknologi seperti ReactJS, NextJS,
              PostgreSQL, MongoDB, dll. Fokus saya dalam setiap membuat website
              yaitu memastikan aplikasi yang saya buat bisa berjalan dengan
              lancar, mulai dari tampilan yang interaktif sampai backend yang
              sesuai kebutuhan. Saya juga selalu semangat belajar hal baru dan
              mencoba ide-ide kreatif yang bisa kasih wawasan baru. Buat saya,
              detail dan efisiensi itu penting banget untuk menghasilkan sesuatu
              yang benar-benar berarti.
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
                    https://www.linkedin.com/in/fikhi-hakim-b1779a17b/
                  </a>
                </li>
                <li>
                  GitHub:{" "}
                  <a
                    href="https://github.com/Hakim393"
                    target="_blank"
                    className="text-teal-300 underline hover:text-teal-500"
                  >
                    https://github.com/Hakim393
                  </a>
                </li>
                <li>
                  Instagram:{" "}
                  <a
                    href="https://www.instagram.com/kimmm.393/"
                    target="_blank"
                    className="text-teal-300 underline hover:text-teal-500"
                  >
                    https://www.instagram.com/kimmm.393/
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-r from-purple-800 via-blue-800 to-teal-700 py-6">
        <div className="container mx-auto px-6 text-center text-gray-300">
          <p>&copy; 2024 Fikhi Hakim (50422575).</p>
        </div>
      </footer>
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
