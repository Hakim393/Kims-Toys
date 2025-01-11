import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProductCardItem({ product, userId }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId: product.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menambah ke keranjang");

      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/toko/${product?.id}`}>
      <Card className="hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <CardHeader>
          <Image
            src={product.imageUrl || "/placeholder-image.png"}
            alt={product.title || "Gambar produk"}
            width={400}
            height={400}
            className="rounded-xl border-4 border-yellow-400 object-cover shadow-lg"
          />
        </CardHeader>

        {/* Content */}
        <CardContent className="text-center space-y-3">
          <CardTitle className="text-lg sm:text-2xl font-extrabold text-blue-700 drop-shadow-md">
            {product.title || "Nama Produk"}
          </CardTitle>
          <CardDescription className="text-sm sm:text-lg font-semibold text-pink-700">
            Harga: Rp{" "}
            {product.price ? product.price.toLocaleString("id-ID") : "0"}
          </CardDescription>
          <p className="text-gray-600 font-medium">
            {product.description || "Deskripsi tidak tersedia."}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-3">
            <Image
              src={product.creatorImageUrl || "/placeholder-avatar.png"}
              alt={product.createdBy || "Foto pembuat"}
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-300 object-cover"
            />
            <span className="text-sm sm:text-md text-gray-700 font-semibold">
              {product.createdBy || "Unknown"}
            </span>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={loading}
            className={`${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } bg-gradient-to-r from-green-400 to-yellow-500 text-white font-bold py-2 px-4 sm:px-6 rounded-lg shadow-lg hover:scale-110 transition-transform duration-200`}
          >
            {loading ? "Menambah..." : "Tambah ke Keranjang"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProductCardItem;
