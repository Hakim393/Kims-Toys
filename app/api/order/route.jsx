// import { NextResponse } from "next/server";
// import { db } from "@/configs/db";
// import {
//   cartTable,
//   orderTable,
//   usersTable,
//   productsTable,
// } from "@/configs/schema";
// import { eq } from "drizzle-orm";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const email = searchParams.get("email");

//   if (!email) {
//     return NextResponse.json(
//       { success: false, message: "Email diperlukan." },
//       { status: 400 }
//     );
//   }

//   try {
//     const cartItems = await db
//       .select()
//       .from(cartTable)
//       .where(eq(cartTable.email, email));

//     if (cartItems.length === 0) {
//       return NextResponse.json(
//         { success: false, message: "Keranjang kosong." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(cartItems, { status: 200 });
//   } catch (error) {
//     console.error("Error saat mengambil keranjang:", error);
//     return NextResponse.json(
//       { success: false, message: "Gagal mengambil keranjang." },
//       { status: 500 }
//     );
//   }
// }

// // Menangani POST request untuk membuat pesanan baru
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { orderData } = body;

//     if (!orderData || !Array.isArray(orderData)) {
//       console.error("Invalid order data:", body);
//       return NextResponse.json(
//         { success: false, message: "Data pesanan tidak valid." },
//         { status: 400 }
//       );
//     }

//     // Validasi setiap item dalam orderData
//     for (const order of orderData) {
//       if (!order.email || !order.productId || !order.quantity) {
//         return NextResponse.json(
//           { success: false, message: "Pesanan tidak lengkap." },
//           { status: 400 }
//         );
//       }

//       // Validasi apakah email terdaftar
//       const user = await db
//         .select()
//         .from(usersTable)
//         .where(eq(usersTable.email, order.email));
//       if (user.length === 0) {
//         return NextResponse.json(
//           { success: false, message: "Email tidak terdaftar." },
//           { status: 400 }
//         );
//       }

//       // Validasi apakah productId terdaftar
//       const product = await db
//         .select()
//         .from(productsTable)
//         .where(eq(productsTable.id, order.productId));
//       if (product.length === 0) {
//         return NextResponse.json(
//           { success: false, message: "Produk tidak ditemukan." },
//           { status: 400 }
//         );
//       }

//       // Validasi apakah quantity lebih dari 0
//       if (order.quantity <= 0) {
//         return NextResponse.json(
//           { success: false, message: "Jumlah produk tidak valid." },
//           { status: 400 }
//         );
//       }
//     }

//     // Proses transaksi
//     await db.transaction(async (trx) => {
//       for (const order of orderData) {
//         console.log("Inserting order:", order);
//         await trx.insert(orderTable).values({
//           email: order.email,
//           productId: order.productId,
//           quantity: order.quantity,
//         });
//       }

//       const email = orderData[0]?.email;
//       console.log("Deleting cart items for email:", email);
//       await trx.delete(cartTable).where(eq(cartTable.email, email));
//     });

//     console.log("Order successfully processed.");
//     return NextResponse.json(
//       { success: true, message: "Pesanan berhasil dibuat." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error saat membuat pesanan:", error.message, error.stack);
//     return NextResponse.json(
//       { success: false, message: "Gagal membuat pesanan." },
//       { status: 500 }
//     );
//   }
// }
