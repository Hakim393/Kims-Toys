import { v2 as cloudinary } from "cloudinary";
import { db } from "/configs/db.js";
import { productsTable } from "/configs/schema.js";
import { NextResponse } from "next/server";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // Ambil form data
    const formData = await req.formData();
    const title = formData.get("title");
    const price = formData.get("price");
    const category = formData.get("category");
    const description = formData.get("description");
    const about = formData.get("about");
    const image = formData.get("image");

    // Validasi input
    if (!image || !title || !price || !category || !description || !about) {
      return NextResponse.json(
        { error: "Semua field wajib diisi!" },
        { status: 400 }
      );
    }

    // Pastikan file gambar valid
    if (image.size === 0 || !image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File gambar tidak valid!" },
        { status: 400 }
      );
    }

    // Upload gambar ke Cloudinary
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
            folder: "products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(imageBuffer);
    });

    if (!uploadedImage || !uploadedImage.secure_url) {
      throw new Error("Gagal mengunggah gambar ke Cloudinary.");
    }

    // Simpan produk ke database
    const newProduct = await db
      .insert(productsTable)
      .values({
        title,
        price: parseInt(price, 10),
        category,
        description,
        about,
        imageurl: uploadedImage.secure_url,
      })
      .returning();

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json(
      { error: `Terjadi kesalahan: ${error.message}` },
      { status: 500 }
    );
  }
}
