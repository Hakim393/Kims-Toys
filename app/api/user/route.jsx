import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { usersTable } from "../../../configs/schema";
import { db } from "../../../configs/db";

export async function POST(req) {
  try {
    const { user } = await req.json();
    console.log("Data user dari request:", user);

    // Memastikan email user tersedia
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      throw new Error("Email user tidak tersedia!");
    }

    // Cek apakah user sudah ada di database
    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    console.log("Data user dari database:", userData);

    if (userData?.length === 0) {
      // Menambahkan user ke database jika belum ada
      const result = await db
        .insert(usersTable)
        .values({
          name: user?.fullName || user?.username || "Unknown",
          email: userEmail,
          image: user?.imageUrl || "",
        })
        .returning(usersTable);

      console.log("Hasil insert user baru:", result);
      return NextResponse.json(result[0]);
    }

    // Jika user sudah ada, kembalikan data dari database
    return NextResponse.json(userData[0]);
  } catch (error) {
    console.error("Terjadi error di endpoint POST /api/user:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
