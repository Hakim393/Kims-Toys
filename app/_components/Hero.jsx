"use client";

import React from "react";
import Image from "next/image";
import { Button } from "/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <div
      className="relative flex items-center justify-center bg-cover bg-center"
      style={{
        height: "100vh",
        backgroundImage: `url('/Assets/bg-mainan.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 max-w-7xl px-6 lg:px-10 xl:px-12 w-full mx-auto">
        <div className="flex-1 text-center md:text-left">
          <h2
            className="text-pink-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4"
            style={{
              textShadow:
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
            }}
          >
            Ayo Bermain dengan Robot, Boneka, dan Mainan Seru Lainnya!
          </h2>
          <p className="text-white text-sm sm:text-base md:text-lg font-medium mb-6 leading-relaxed">
            Nikmati pengalaman bermain yang menyenangkan dengan berbagai mainan
            seperti robot, boneka, dan banyak lagi. Hadirkan keceriaan dan
            kreativitas saat menjelajahi dunia imajinasi bersama teman atau
            keluarga!
          </p>
          <Link href={"/dashboard"}>
            <Button className="px-6 py-3 bg-pink-500 text-white text-sm sm:text-md font-bold rounded-full hover:bg-pink-600 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-lg">
              Menjual
            </Button>
          </Link>
          <Link href={"/toko"}>
            <Button className="px-6 py-3 bg-blue-500 text-white text-sm sm:text-md font-bold rounded-full hover:bg-green-600 focus:ring-2 focus:ring-black focus:outline-none shadow-lg">
              Selengkapnya
            </Button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/Assets/GambarMainan.png"
            alt="Mainan Anak - Anak"
            width={400}
            height={400}
            className="rounded-xl shadow-xl object-contain max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
