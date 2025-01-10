"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function Toko() {
  const categories = [
    "Boneka",
    "Robot",
    "Mainan remote control",
    "Puzzle",
    "Lego",
    "Mobil mainan",
    "Alat musik mainan",
    "Balok susun",
    "Permainan papan",
  ];

  const sortOptions = [
    { value: "price:asc", label: "Harga Terendah" },
    { value: "price:desc", label: "Harga Tertinggi" },
    { value: "title:asc", label: "Nama (A-Z)" },
    { value: "title:desc", label: "Nama (Z-A)" },
  ];

  const handleSortChange = (value) => {
    setSort(value);
  };

  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("price:asc");
  const [limit, setLimit] = useState(9);

  const GetProductList = async () => {
    try {
      console.log("Mengirim request ke API...");
      const result = await axios.post("/api/toko", {
        search,
        filter,
        sort,
        limit,
      });
      console.log("Hasil response API:", result.data);
      setProductList(result.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.data?.message ||
          error.message ||
          "Unknown error occurred"
      );
    }
  };

  const handleSearch = () => {
    GetProductList();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    GetProductList();
  }, [filter, sort, limit]);

  return (
    <div className="mt-10 px-4 lg:px-8">
      <h2 className="font-bold text-3xl mb-6 text-center">Halaman Toko</h2>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <Input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Search
        </Button>
      </div>

      {/* Filter and Sort Options */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Filter By */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Filter By
          </label>
          <Select onValueChange={(value) => setFilter(value)}>
            <SelectTrigger>
              <span>{filter || "Semua Kategori"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tampilkan Semua</SelectItem>
              {categories.map((category, index) => (
                <SelectItem key={index} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Sort By
          </label>
          <Select onValueChange={handleSortChange}>
            <SelectTrigger>
              <span>
                {sortOptions.find((option) => option.value === sort)?.label ||
                  "Urutkan"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-full mx-auto">
        {productList.length > 0 ? (
          productList.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 mx-auto w-full max-w-xs"
            >
              <CardHeader>
                <Image
                  src={product.imageUrl || "/placeholder-image.png"}
                  alt={product.title || "Gambar produk"}
                  width={400}
                  height={400}
                  className="rounded-xl border-4 border-yellow-400 object-cover shadow-lg"
                />
              </CardHeader>
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
                <Button className="bg-gradient-to-r from-green-400 to-yellow-500 text-white font-bold py-2 px-4 sm:px-6 rounded-lg shadow-lg hover:scale-110 transition-transform duration-200">
                  Tambah ke Keranjang
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Produk tidak ditemukan
          </p>
        )}
      </div>
    </div>
  );
}

export default Toko;
