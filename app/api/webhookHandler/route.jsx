import { NextResponse } from "next/server";
const midtransClient = require("midtrans-client");
import { db } from "../../../configs/db";
import { orderTable } from "../../../configs/schema";

// Inisialisasi Core API Midtrans
const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request) {
  try {
    // Ambil payload dari request
    const body = await request.json();
    console.log(
      "Payload received from Midtrans webhook:",
      JSON.stringify(body, null, 2)
    ); // Log payload lengkap

    // Validasi payload kosong
    if (!body || Object.keys(body).length === 0) {
      console.error("Empty payload received");
      return NextResponse.json({ error: "Empty payload" }, { status: 400 });
    }

    // Panggil Midtrans untuk mendapatkan status transaksi
    const statusResponse = await coreApi.transaction
      .notification(body)
      .catch((error) => {
        console.error("Error calling Midtrans Core API:", error.message);
        throw new Error("Failed to get transaction status from Midtrans.");
      });

    console.log(
      "Transaction status response:",
      JSON.stringify(statusResponse, null, 2)
    ); // Log status transaksi

    const { order_id, transaction_status } = statusResponse;

    // Periksa status transaksi
    if (
      transaction_status === "capture" ||
      transaction_status === "settlement"
    ) {
      const [email, timestamp] = order_id.split("-");

      const orderDetails = body.item_details.map((item) => ({
        email,
        productId: parseInt(item.id, 10),
        quantity: parseInt(item.quantity, 10),
      }));

      console.log(
        "Order details to be inserted into database:",
        JSON.stringify(orderDetails, null, 2)
      );

      // Simpan data ke database
      for (const order of orderDetails) {
        await db.insert(orderTable).values(order);
      }

      return NextResponse.json({ success: true });
    } else {
      console.warn(`Transaction not completed: ${transaction_status}`);
      return NextResponse.json({ error: "Transaction not completed" });
    }
  } catch (error) {
    console.error("Error handling webhook:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
