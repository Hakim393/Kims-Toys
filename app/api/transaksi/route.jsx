import { NextResponse } from "next/server";
const midtransClient = require("midtrans-client");

// Inisialisasi Snap Client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

// Inisialisasi Core API Client untuk webhook
const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

// Endpoint untuk membuat transaksi
export async function POST(request) {
  const { email, cartItems } = await request.json();

  if (!cartItems || cartItems.length === 0) {
    return NextResponse.json(
      { error: "Keranjang belanja kosong." },
      { status: 400 }
    );
  }

  const itemDetails = cartItems.map((item) => ({
    id: item.id,
    name: item.productName,
    price: item.price,
    quantity: item.quantity,
    email: email,
  }));

  const grossAmount = itemDetails.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const parameter = {
    item_details: itemDetails,
    transaction_details: {
      order_id: `${email}-${Date.now()}`,
      gross_amount: grossAmount,
    },
  };

  try {
    const token = await snap.createTransactionToken(parameter);
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error creating transaction token:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
