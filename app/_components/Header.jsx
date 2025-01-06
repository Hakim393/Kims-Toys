"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State untuk mengontrol burger menu

  const MenuList = [
    {
      name: "Beranda",
      path: "/",
    },
    {
      name: "Toko",
      path: "/toko",
    },
    {
      name: "Tentang",
      path: "/tentang",
    },
  ];

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 lg:px-10 bg-primary border-b-4 border-black">
      <div className="flex items-center">
        <Image
          src="/Assets/LogoKimStore.png"
          alt="Logo KIMS TOYS"
          width={50}
          height={50}
          className="mr-2"
        />
        <h2
          className="font-extrabold text-sm sm:text-lg px-2 py-1"
          style={{
            backgroundColor: "#0ea5e9",
            color: "#ffffff",
            textShadow:
              "0 0 10px rgba(255, 255, 0, 0.9), 0 0 15px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.7)",
            borderRadius: "4px",
          }}
        >
          KIMS TOYS
        </h2>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-4 lg:gap-6">
        {MenuList.map((menu, index) => (
          <li key={index}>
            <a
              href={menu.path}
              style={{
                backgroundColor: "#22c55e",
              }}
              className="px-4 py-2 text-white font-bold rounded-md shadow-[0px_4px_0px_#000] active:shadow-[0px_2px_0px_#000] active:translate-y-[2px] transition-all"
            >
              {menu.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu (Burger Icon + Cart + Button + UserButton) */}
      <div className="flex items-center gap-2 md:gap-4">
        <ShoppingBag className="md:text-base text-sm" />
        <Link href={"/dashboard"}>
          <Button
            variant="destructive"
            className="text-xs sm:text-sm md:text-md"
          >
            Start Selling
          </Button>
        </Link>
        <UserButton />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full bg-black text-white md:hidden"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {menuOpen && (
        <ul className="absolute top-full right-4 bg-primary border-2 border-black rounded-lg shadow-lg mt-2 p-3 flex flex-col gap-2 md:hidden">
          {MenuList.map((menu, index) => (
            <li key={index}>
              <a
                href={menu.path}
                style={{
                  backgroundColor: "#22c55e",
                }}
                className="w-full block text-center px-4 py-2 text-white font-bold rounded-md shadow-[0px_4px_0px_#000] active:shadow-[0px_2px_0px_#000] active:translate-y-[2px] transition-all"
              >
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Header;
