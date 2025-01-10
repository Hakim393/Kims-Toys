import { productsTable } from "@/configs/schema";
import { db } from "@/configs/db";
import { ilike, eq, and, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { limit = 9, search = "", filter = "", sort = "" } = await req.json();

    // Debug input yang diterima
    console.log("Input Request:", { limit, search, filter, sort });

    let query = db.select().from(productsTable);
    const whereConditions = [];

    if (search) {
      whereConditions.push(
        or(
          ilike(productsTable.title, `%${search}%`),
          ilike(productsTable.category, `%${search}%`)
        )
      );
    }

    // Filter berdasarkan kategori
    if (filter && filter !== "all") {
      whereConditions.push(eq(productsTable.category, filter));
    }

    // Gabungkan semua kondisi WHERE
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
    query = query.limit(limit);
    console.log("Generated Query:", query.toSQL());
    const result = await query;
    console.log("Query Result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in API Route:", error);
    return NextResponse.json(
      { error: `Failed to fetch products: ${error.message}` },
      { status: 500 }
    );
  }
}
