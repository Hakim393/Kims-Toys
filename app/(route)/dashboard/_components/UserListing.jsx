"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function UserListing() {
  const [listing, setListing] = useState([]);
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
          <div>{/* Render daftar produk di sini */}</div>
        )}
      </div>
    </div>
  );
}

export default UserListing;
