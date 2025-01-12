import { cartTable, productsTable } from "@/configs/schema";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { and, eq } from "drizzle-orm";

// Menambahkan produk ke keranjang (atau menambah jumlah jika sudah ada)
export async function POST(req) {
  try {
    const { email, productId } = await req.json();

    // Validasi input
    if (!email || !productId) {
      return NextResponse.json(
        { error: "Email dan productId wajib diisi." },
        { status: 400 }
      );
    }

    // Cek apakah produk sudah ada di keranjang
    const [existingItem] = await db
      .select()
      .from(cartTable)
      .where(
        and(eq(cartTable.email, email), eq(cartTable.productId, productId))
      )
      .limit(1);

    if (existingItem) {
      const updatedItem = await db
        .update(cartTable)
        .set({ quantity: existingItem.quantity + 1 })
        .where(eq(cartTable.id, existingItem.id))
        .returning(cartTable);
      return NextResponse.json(updatedItem);
    } else {
      const newItem = await db
        .insert(cartTable)
        .values({
          email,
          productId,
          quantity: 1,
        })
        .returning(cartTable);
      return NextResponse.json(newItem);
    }
  } catch (error) {
    console.error("Error di POST handler:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

// Mengambil produk di keranjang berdasarkan email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email wajib diisi." },
        { status: 400 }
      );
    }

    const result = await db
      .select({
        id: cartTable.id,
        name: productsTable.title,
        price: productsTable.price,
        createdBy: productsTable.createdBy,
        imageUrl: productsTable.imageUrl,
        quantity: cartTable.quantity,
      })
      .from(cartTable)
      .innerJoin(productsTable, eq(cartTable.productId, productsTable.id))
      .where(eq(cartTable.email, email));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error di GET handler:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

// Menghapus item dari keranjang
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID item wajib diisi." },
        { status: 400 }
      );
    }

    await db.delete(cartTable).where(eq(cartTable.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error di DELETE handler:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

// Mengupdate quantity produk di keranjang
export async function PUT(req) {
  try {
    const { id, change } = await req.json();

    if (!id || typeof change !== "number") {
      return NextResponse.json(
        { error: "ID dan perubahan kuantitas wajib diisi." },
        { status: 400 }
      );
    }

    // Ambil data item dari database berdasarkan id
    const [existingItem] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.id, id));

    if (existingItem) {
      const newQuantity = existingItem.quantity + change;

      if (newQuantity > 0) {
        const updatedItem = await db
          .update(cartTable)
          .set({ quantity: newQuantity })
          .where(eq(cartTable.id, id))
          .returning(cartTable);

        return NextResponse.json(updatedItem);
      } else {
        await db.delete(cartTable).where(eq(cartTable.id, id));
        return NextResponse.json({ success: true });
      }
    } else {
      return NextResponse.json(
        { error: "Item tidak ditemukan di keranjang." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error di PUT handler:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
