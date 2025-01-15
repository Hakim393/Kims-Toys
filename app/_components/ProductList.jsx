"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCardItem from "./ProductCardItem";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetProductList();
  }, []);

  const GetProductList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products?limit=9");
      if (response.status === 200) {
        setProductList(response.data);
      } else {
        console.error("Gagal mengambil produk: Status respons tidak valid");
        setProductList([]);
      }
    } catch (error) {
      console.error("Gagal mengambil produk:", error);
      setProductList([]);
    } finally {
      setLoading(false);
    }
  };

  const { user } = useUser();

  return (
    <div>
      <h2 className="font-bold text-lg flex justify-between items-center">
        Penjualan :
        <span>
          <Link href={"/toko"}>
            <Button className="px-6 py-2 bg-yellow-500 text-white text-sm sm:text-md font-bold rounded-full hover:bg-sky-600 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-lg">
              Lihat semua
            </Button>
          </Link>
        </span>
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[200px] w-full bg-slate-200 rounded-lg animate-pulse"
              ></div>
            ))
          : productList.length > 0
          ? productList.map((product, index) => (
              <ProductCardItem product={product} key={index} user={user} />
            ))
          : "Tidak ada produk tersedia."}
      </div>
    </div>
  );
}

export default ProductList;
