import { productsTable } from "@/configs/schema";
import { db } from "@/configs/db";
import { ilike, eq, and, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = parseInt(searchParams.get("productId"), 10);

    if (productId) {
      const product = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, productId))
        .limit(1);

      if (!product.length) {
        return NextResponse.json(
          { error: "Produk tidak ditemukan" },
          { status: 404 }
        );
      }

      return NextResponse.json(product[0]);
    }

    const result = await db.select().from(productsTable);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: `Gagal mengambil data produk: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { search = "", filter = "", sort = "" } = await req.json();

    console.log("Input Request:", { search, filter, sort });

    let query = db.select().from(productsTable);
    const whereConditions = [];

    if (search) {
      whereConditions.push(
        or(
          ilike(productsTable.title, `%${search}%`),
          ilike(productsTable.category, `%${search}%`),
          ilike(productsTable.info, `%${search}%`)
        )
      );
    }

    // Filter berdasarkan kategori
    if (filter && filter !== "all") {
      whereConditions.push(eq(productsTable.category, filter));
    }

    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    // // Sorting
    // if (sort) {
    //   const [key, direction] = sort.split(":");
    //   if (["price", "title"].includes(key)) {
    //     const sortDirection = direction === "desc" ? "desc" : "asc";
    //     query = query.orderBy(
    //       key === "title" ? productsTable[key].lowercase() : productsTable[key],
    //       sortDirection
    //     );
    //   }
    // }

    // Limit data
    console.log("Generated Query:", query.toSQL());
    const result = await query;
    console.log("Query Result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: `Failed to fetch products: ${error.message}` },
      { status: 500 }
    );
  }
}
