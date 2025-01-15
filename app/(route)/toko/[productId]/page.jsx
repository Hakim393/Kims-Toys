"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
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
    <div className="p-6 max-w-5xl mx-auto">
      {loading ? (
        <h1 className="text-3xl font-bold mb-4">Memuat...</h1>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg p-4 rounded-lg">
            <Image
              src={product?.imageUrl || "/placeholder-image.png"}
              alt={product?.title || "Produk"}
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{product?.title}</h1>
              <p className="text-2xl font-semibold text-blue-600 mb-4">
                Rp {product?.price?.toLocaleString("IND")}
              </p>
              <Button
                onClick={handleAddToCart}
                className="bg-yellow-500 hover:bg-yellow-600 w-full"
              >
                Add to cart
              </Button>
              <Accordion type="single" collapsible className="mt-8">
                <AccordionItem value="description">
                  <AccordionTrigger>Deskripsi Product</AccordionTrigger>
                  <AccordionContent>{product?.description}</AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="description">
                  <AccordionTrigger>Informasi Tambahan</AccordionTrigger>
                  <AccordionContent>{product?.info}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg shadow-sm p-4 text-center hover:shadow-md"
                >
                  <Link href={`/toko/${product.id}`}>
                    <Image
                      src={product.imageUrl || "/placeholder-image.png"}
                      alt={product.title}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <h3 className="mt-2 font-semibold">{product.title}</h3>
                    <p className="text-blue-600 mt-1">
                      Rp {product.price?.toLocaleString("ID")}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default ProductDetail;
