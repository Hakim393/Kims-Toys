import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function ProductCardItem({ product }) {
  return (
    <Card className="hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      {/* Header: Menampilkan Gambar Produk */}
      <CardHeader>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-xl border-4 border-yellow-400 object-cover shadow-lg"
        />
      </CardHeader>

      {/* Content: Nama Produk dan Deskripsi Harga */}
      <CardContent className="text-center space-y-3">
        <CardTitle className="text-lg sm:text-2xl font-extrabold text-blue-700 drop-shadow-md">
          {product.name}
        </CardTitle>
        <CardDescription className="text-sm sm:text-lg font-semibold text-pink-700">
          Harga: Rp {product.price.toLocaleString()}
        </CardDescription>
      </CardContent>

      {/* Footer: Tombol dan Caption */}
      <CardFooter className="flex flex-col items-center space-y-3">
        <Button className="bg-gradient-to-r from-green-400 to-yellow-500 text-white font-bold py-2 px-4 sm:px-6 rounded-lg shadow-lg hover:scale-110 transition-transform duration-200">
          Tambah ke Keranjang
        </Button>
        <span className="text-xs sm:text-sm text-gray-700 italic">
          {product.caption}
        </span>
      </CardFooter>
    </Card>
  );
}

export default ProductCardItem;
