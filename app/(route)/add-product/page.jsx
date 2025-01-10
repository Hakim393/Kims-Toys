"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import UploadImage from "./_components/UploadImage";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function AddProduct() {
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

  const [formData, setFormData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { user } = useUser();
  useEffect(() => {
    setFormData({
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
  }, [user]);

  const inputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const addProductBtnClick = async () => {
    const { title, price, category, description, info, image, userEmail } =
      formData;

    if (!title || !price || !category || !description || !info || !image) {
      alert("Semua kolom wajib diisi!");
      return;
    }
    setIsLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("title", title);
    formDataObj.append("price", price);
    formDataObj.append("category", category);
    formDataObj.append("description", description);
    formDataObj.append("info", info);
    formDataObj.append("image", image);
    formDataObj.append("userEmail", userEmail);

    try {
      setIsLoading(true);
      const result = await axios.post("/api/products", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(true);

      if (result) {
        toast("Selamat, anda berhasil menambahkan produk baru!!");

        router.push("/dashboard");
      }

      if (result.data.error) {
        alert(result.data.error);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          title: "",
          price: "",
          category: "",
          description: "",
          info: "",
          image: null,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        });
      }, 1000);
    } catch (error) {
      alert(
        `Terjadi kesalahan saat menambahkan produk: ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200 p-6 relative">
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-lg animate-fade-in">
            <div className="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Produk Berhasil Ditambahkan!
            </h2>
          </div>
        </div>
      )}

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Tambahkan Produk Baru
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Isi detail produk dengan mudah dan cepat!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 flex flex-col items-center gap-4">
            <h4 className="text-xl font-semibold text-gray-800">
              Unggah Foto Produk
            </h4>
            <UploadImage
              onImageSelect={(e) => inputChange("image", e.target.files[0])}
            />
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Nama Produk
              </h4>
              <Input
                name="title"
                placeholder="Masukkan nama produk"
                className="w-full"
                onChange={(e) => inputChange("title", e.target.value)}
              />
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">Harga</h4>
              <Input
                type="number"
                name="price"
                placeholder="Masukkan harga produk"
                className="w-full"
                onChange={(e) => inputChange("price", e.target.value)}
              />
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Kategori Produk
              </h4>
              <Select onValueChange={(value) => inputChange("category", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Deskripsi Produk
              </h4>
              <Textarea
                name="description"
                placeholder="Tambahkan deskripsi produk"
                className="w-full"
                onChange={(e) => inputChange("description", e.target.value)}
              />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Informasi Tambahan
              </h4>
              <Textarea
                name="info"
                placeholder="Tambahkan informasi tambahan"
                className="w-full"
                onChange={(e) => inputChange("info", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button
            onClick={addProductBtnClick}
            className="px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
