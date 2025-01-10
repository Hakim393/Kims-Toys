"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ProductEdit from "@/app/_components/ProductEdit";

function UserListing() {
  const [listing, setListing] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetUserProductList(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  const GetUserProductList = async (email) => {
    try {
      const { data } = await axios.get(`/api/products?email=${email}`);
      setListing(data);
    } catch (error) {
      console.error("Gagal mendapatkan daftar produk:", error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="font-extrabold text-xl flex justify-between items-center mb-4">
        <span>Listing</span>
        <div className="fixed right-[100px]">
          <Link href={"/add-product"}>
            <Button>+ Tambahkan Product</Button>
          </Link>
        </div>
      </h2>
      <div>
        {listing?.length === 0 ? (
          <p className="font-medium text-lg text-center mt-10 text-gray-400">
            Daftar Tidak Ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {listing.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 mx-auto w-full max-w-sm sm:max-w-sm md:max-w-xs lg:max-w-xs"
              >
                <CardHeader className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="rounded-xl border-4 border-yellow-400 object-contain shadow-lg w-full h-50"
                  />
                </CardHeader>

                <CardContent className="text-center space-y-3">
                  <CardTitle className="text-lg sm:text-2xl font-extrabold text-blue-700 drop-shadow-md">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-lg font-semibold text-pink-700">
                    {item.description}
                  </CardDescription>
                  <p className="text-gray-600 font-bold mt-2">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                  <div className="absolute bottom-16 right-8 flex justify-center items-center">
                    <ProductEdit />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserListing;
