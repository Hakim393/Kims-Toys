"use client";

import React, { useEffect, useState } from "react";
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

function ProductDetail() {
  const { productId } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(`/api/toko?productId=${productId}`);
      setProduct(response.data);
      fetchSimilarProducts(response.data.category); // Fetch similar products based on category
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error fetching product detail");
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async (category) => {
    try {
      const response = await axios.get(`/api/toko?category=${category}`);
      setSimilarProducts(response.data);
    } catch (err) {
      console.error("Error fetching similar products:", err.message);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  const handleProductClick = (id) => {
    router.push(`/toko/${id}`);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error || !product) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error || "Product not found"}
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 mt-10">
      <Link href="/toko" className="text-blue-500 font-semibold">
        &lt; Back
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src={product.imageUrl || "/placeholder-image.png"}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-xl border-4 border-yellow-400 object-cover shadow-lg"
          />
        </div>
        {/* Product Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-2xl font-semibold text-green-600">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <p className="text-gray-600">{product.description}</p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg">
            Add to Cart
          </Button>
          {/* Accordion Section */}
          <Accordion type="single" collapsible>
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{product.description}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="product-info">
              <AccordionTrigger>Product Info</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{product.info || "N/A"}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-10 mb-4">Similar Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {similarProducts.length > 0 ? (
          similarProducts.map((similarProduct) => (
            <div
              key={similarProduct.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => handleProductClick(similarProduct.id)} // Navigasi ke "/toko/id"
            >
              <Image
                src={similarProduct.imageUrl || "/placeholder-image.png"}
                alt={similarProduct.title}
                width={200}
                height={200}
                className="rounded-md object-cover"
              />
              <h3 className="font-bold text-lg mt-2 text-gray-800">
                {similarProduct.title}
              </h3>
              <p className="text-green-600 font-semibold">
                Rp {similarProduct.price.toLocaleString("id-ID")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No similar products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
