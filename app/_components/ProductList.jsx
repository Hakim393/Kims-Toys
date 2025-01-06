"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Product from "../_mockData/Product";
import ProductCardItem from "./ProductCardItem";

function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(Product);
  }, []);

  return (
    <div>
      <h2 className="font-bold text-lg flex justify-between items-center">
        Penjualan :
        <span>
          <Button className="px-6 py-2 bg-yellow-500 text-white text-sm sm:text-md font-bold rounded-full hover:bg-sky-600 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-lg">
            Lihat semua
          </Button>
        </span>
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5">
        {productList.map((product, index) => (
          <ProductCardItem product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
