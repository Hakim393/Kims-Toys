import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import axios from "axios";
import { CartContext } from "../_context/CartContext";

function ProductCardItem({ product, user }) {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const addToCart = async () => {
    setLoading(true);
    const result = await axios.post("/api/cart", {
      email: user?.primaryEmailAddress?.emailAddress,
      productId: product?.id,
    });
    setCart((cart) => [...cart, product]);
    setLoading(false);
  };
  return (
    <Card className="hover:shadow-lg transform hover:scale-105 transition-transform duration-300 mx-auto w-full max-w-xs sm:max-w-sm">
      <Link href={`/toko/${product?.id}`}>
        <CardHeader className="cursor-pointer">
          <Image
            src={product.imageUrl || "/placeholder-image.png"}
            alt={product.title || "Gambar produk"}
            width={400}
            height={400}
            className="rounded-xl object-cover shadow-md"
            priority
          />
        </CardHeader>
      </Link>

      <CardContent className="text-center space-y-3">
        <CardTitle className="text-lg font-bold text-gray-800">
          {product.title || "Nama Produk"}
        </CardTitle>
        <CardDescription className="text-md text-gray-600">
          {product.description || "Deskripsi tidak tersedia."}
        </CardDescription>
        <p className="text-lg text-blue-600 font-semibold">
          Rp {product.price ? product.price.toLocaleString("id-ID") : "0"}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-3">
        <div className="flex items-center space-x-3">
          <Image
            src={product.creatorImageUrl || "/placeholder-avatar.png"}
            alt={product.createdBy || "Foto pembuat"}
            width={40}
            height={40}
            className="rounded-full border object-cover"
          />
          <span className="text-sm text-gray-500">
            Dibuat oleh: {product.createdBy || "Tidak diketahui"}
          </span>
        </div>
        <Button
          onClick={addToCart}
          className={` bg-gradient-to-r from-green-400 to-yellow-500 text-white font-bold py-2 px-6 rounded-lg hover:scale-110 transition-transform duration-200`}
          disabled={loading}
        >
          Tambahkan Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCardItem;
