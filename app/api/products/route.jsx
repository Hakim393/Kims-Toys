import { v2 as cloudinary } from "cloudinary";
import { db } from "/configs/db.js";
import { productsTable, usersTable } from "/configs/schema.js";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST: Create new product
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const price = parseInt(formData.get("price"));
    const category = formData.get("category");
    const description = formData.get("description");
    const info = formData.get("info");
    const image = formData.get("image");
    const userEmail = formData.get("userEmail");

    if (
      !title ||
      !price ||
      !category ||
      !description ||
      !info ||
      !image ||
      !userEmail
    ) {
      return NextResponse.json(
        { error: "Semua field wajib diisi!" },
        { status: 400 }
      );
    }

    if (image.size === 0 || !image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File gambar tidak valid!" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
            folder: "products",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(imageBuffer);
    });

    if (!uploadedImage || !uploadedImage.secure_url) {
      throw new Error("Gagal mengunggah gambar ke Cloudinary.");
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))
      .limit(1);

    if (!user.length) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan!" },
        { status: 400 }
      );
    }

    const newProduct = await db
      .insert(productsTable)
      .values({
        title,
        price,
        category,
        description,
        info,
        imageUrl: uploadedImage.secure_url,
        createdBy: user[0].email,
        creatorImageUrl: user[0].image, // Tambahkan URL avatar pembuat
      })
      .returning(productsTable);

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json(
      { error: `Terjadi kesalahan: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const limit = parseInt(searchParams.get("limit"), 10) || 9; // limit maksimal 9

    let result;

    if (email) {
      result = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.createdBy, email));
    } else {
      result = await db.select().from(productsTable).limit(limit);
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch products: ${error.message}` },
      { status: 500 }
    );
  }
}

// EDIT
export async function PATCH(req) {
  return NextResponse.json(
    { message: " edit belum diaktifkan." },
    { status: 200 }
  );
}

// ANALYZE
export async function POST_ANALYZE(req) {
  return NextResponse.json(
    { message: " analisis belum diaktifkan." },
    { status: 200 }
  );
}

// DELETE
export async function DELETE(req) {
  return NextResponse.json(
    { message: " hapus belum diaktifkan." },
    { status: 200 }
  );
}
