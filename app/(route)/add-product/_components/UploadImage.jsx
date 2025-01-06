"use client";
import React, { useState } from "react";
import Image from "next/image";

function UploadImage({ onImageSelect }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const fileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("File yang diunggah harus berupa gambar.");
      return;
    }

    setError(""); // Clear error if valid
    onImageSelect(event);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        id="uploadImage"
        name="image"
        className="hidden"
        accept="image/*"
        onChange={fileChange}
      />
      <label htmlFor="uploadImage">
        <div className="relative w-64 h-64 flex justify-center items-center rounded-lg cursor-pointer border-dashed border-4 border-blue-500 bg-blue-50 hover:bg-blue-100 transition duration-300">
          {image ? (
            <Image
              src={image}
              alt="Uploaded Image"
              className="rounded-md object-cover w-full h-full"
              layout="fill"
            />
          ) : (
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16l6-6m0 0l6 6m-6-6v12M21 8h-6a2 2 0 00-2-2V2a2 2 0 00-2-2H5a2 2 0 00-2 2v20"
                />
              </svg>
              <span className="text-sm text-gray-600">
                Klik untuk unggah foto
              </span>
            </div>
          )}
        </div>
      </label>
      {image && (
        <button
          className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={() => setImage(null)}
        >
          Hapus Gambar
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default UploadImage;
