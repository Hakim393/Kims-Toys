import { NextResponse } from "next/server"; // function untuk mengirimkan respons HTTP
import { eq } from "drizzle-orm"; // operator untuk membandingkan nilai dalam query
import { usersTable } from "../../../configs/schema"; //from database, untuk menggambarkan skema tabel
import { db } from "../../../configs/db"; //from database, untuk menggambarkan skema tabel

export async function POST(req) {
  try {
    const { user } = await req.json();

    // Periksa apakah user sudah ada di database
    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

    if (userData.length === 0) {
      // Jika user tidak ditemukan, tambahkan ke database
      const [newUser] = await db
        .insert(usersTable)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          image: user?.imageUrl,
        })
        .returning();

      return NextResponse.json(newUser[0]);
    }

    // Jika user sudah ada, kembalikan data user
    return NextResponse.json(userData[0]);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
