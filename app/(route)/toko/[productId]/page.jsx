"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CartContext } from "@/app/_context/CartContext";
import { useUser } from "@clerk/nextjs";

function ProductDetail() {
  const { productId } = useParams();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details
  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(`/api/toko?productId=${productId}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError("Gagal memuat data produk.");
      setLoading(false);
    }
  };

  // Fetch similar products
  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.get(
        `/api/toko?category=${product?.category}`
      );
      setSimilarProducts(response.data);
    } catch (err) {
      console.error("Error fetching similar products", err);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  useEffect(() => {
    if (product?.category) {
      fetchSimilarProducts();
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!user?.emailAddresses) {
      setError("Anda perlu login untuk menambah produk ke keranjang");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/cart", {
        email: user.emailAddresses[0]?.emailAddress,
        productId: product.id,
        name: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
      });

      const addedProduct = {
        id: product.id,
        name: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: response.data.quantity || 1,
      };

      const existingProduct = cart.find((item) => item.id === addedProduct.id);
      if (existingProduct) {
        setCart(
          cart.map((item) =>
            item.id === addedProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, addedProduct]);
      }
    } catch (err) {
      setError("Gagal menambahkan produk ke keranjang.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1>{loading ? "Memuat..." : product?.title}</h1>
        {error && <p className="text-red-500">{error}</p>}
        {product && (
          <div className="flex flex-col md:flex-row">
            <Image
              src={product.imageUrl || "/placeholder-image.png"}
              alt={product.title}
              width={300}
              height={300}
            />
            <div className="ml-4">
              <h2 className="text-xl">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2">
                Harga: Rp {product.price?.toLocaleString("id-ID")}
              </p>
              <Button onClick={handleAddToCart} className="mt-4">
                {loading ? "Menambahkan..." : "Tambahkan ke Keranjang"}
              </Button>
            </div>
          </div>
        )}
        <Accordion type="single" collapsible className="mt-8">
          <AccordionItem value="item-1">
            <AccordionTrigger>Deskripsi Produk</AccordionTrigger>
            <AccordionContent>{product?.longDescription}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-8">
        <h2>Produk Serupa</h2>
        <div className="flex space-x-4">
          {similarProducts.map((prod) => (
            <div key={prod.id} className="flex flex-col">
              <Link href={`/produk/${prod.id}`}>
                <Image
                  src={prod.imageUrl || "/placeholder-image.png"}
                  alt={prod.title}
                  width={150}
                  height={150}
                />
                <h3 className="text-center">{prod.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
