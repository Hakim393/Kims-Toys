"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoaded, isSignedIn } = useUser();
  const [paymentUrl, setPaymentUrl] = useState("");

  useEffect(() => {
    async function fetchCart() {
      if (!isLoaded) return;
      if (!isSignedIn) {
        setError("Anda perlu login untuk melihat keranjang.");
        setLoading(false);
        return;
      }

      try {
        const email = user?.emailAddresses[0]?.emailAddress;
        const response = await axios.get(
          `/api/cart?email=${encodeURIComponent(email)}`
        );
        setCart(response.data);
      } catch (err) {
        setError("Gagal memuat data keranjang.");
        console.error("Error saat mengambil data keranjang:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [user, isLoaded, isSignedIn]);

  useEffect(() => {
    const snapScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    const script = document.createElement("script");
    script.src = snapScriptUrl;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!user) {
      toast.error("Anda harus login untuk melakukan pembayaran.");
      return;
    }

    if (cart.length === 0) {
      toast.error(
        "Keranjang belanja kosong. Tambahkan barang terlebih dahulu."
      );
      return;
    }

    try {
      const email = user?.emailAddresses[0]?.emailAddress;
      const cartItems = cart.map((item) => ({
        id: item.id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/transaksi", {
        method: "POST",
        body: JSON.stringify({ email, cartItems }),
        headers: { "Content-Type": "application/json" },
      });

      const requestData = await response.json();

      if (requestData.token) {
        window.snap.pay(requestData.token, {
          onSuccess: () => toast.success("Pembayaran berhasil!"),
          onPending: () => toast.info("Menunggu pembayaran."),
          onError: () => toast.error("Pembayaran gagal."),
          onClose: () => toast.info("Popup pembayaran ditutup."),
        });
      } else {
        toast.error("Terjadi kesalahan pada server.");
      }
    } catch (err) {
      toast.error("Gagal memproses pembayaran.");
    }
  };

  const generatePaymentLink = async () => {
    const secret = process.env.NEXT_PUBLIC_SECRET;
    const encodedSecret = Buffer.from(secret).toString("base64");
    const basicAuth = `Basic ${encodedSecret}`;

    try {
      const data = {
        item_details: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        transaction_details: {
          order_id: `${user.email}-${Date.now()}`,
          gross_amount: totalPrice,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/v1/payment-links`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: basicAuth,
          },
          body: JSON.stringify(data),
        }
      );

      const paymentLink = await response.json();
      setPaymentUrl(paymentLink.payment_url);
    } catch (err) {
      toast.error("Gagal membuat link pembayaran.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="font-bold text-3xl mb-6 text-center">
        Checkout <Badge className="ml-2">Active</Badge>
      </h2>
      {loading ? (
        <p>Memuat...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ul className="space-y-4">
              {cart.map((item) => (
                <Card
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.imageUrl || "/placeholder-image.png"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-700">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Jumlah: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-800">
                    Rp {item.price * item.quantity}
                  </p>
                </Card>
              ))}
            </ul>
            <div className="mt-6 border-t pt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Lihat Total</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-lg font-semibold">TOTAL</p>
                  <p className="text-2xl font-bold">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col md:w-1/3 space-y-4">
            <Button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Bayar Sekarang
            </Button>
            <Button
              onClick={generatePaymentLink}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Buatkan Link Pembayaran
            </Button>
            {paymentUrl && (
              <div className="mt-4">
                <p className="text-blue-500">
                  <a
                    href={paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Klik di sini untuk melakukan pembayaran
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Checkout;
