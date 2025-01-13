"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoaded, isSignedIn } = useUser(); // Menambahkan isLoaded dan isSignedIn untuk cek status login

  useEffect(() => {
    async function fetchCart() {
      if (!isLoaded) {
        return; // Tunggu hingga hook selesai memuat user
      }

      if (!isSignedIn) {
        setError("Anda perlu login untuk melihat keranjang.");
        setLoading(false);
        return;
      }

      if (!user?.emailAddresses) {
        setError("Data email pengguna tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        const email = user.emailAddresses[0]?.emailAddress;
        const response = await axios.get(`/api/cart?email=${email}`);
        setCart(response.data);
      } catch (err) {
        setError("Gagal memuat data keranjang.");
        console.error("Error saat mengambil data keranjang:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [user, isLoaded, isSignedIn]); // Menambahkan dependensi isLoaded dan isSignedIn

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete("/api/cart", { data: { id } });
      setCart(cart.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error saat menghapus item:", err);
      setError("Gagal menghapus produk dari keranjang.");
    }
  };

  const handleTransaction = async (orderID, details) => {
    try {
      const userData = {
        email: user?.emailAddresses[0]?.emailAddress,
        fullName: user?.fullName || `${user?.firstName} ${user?.lastName}`,
      };

      const response = await axios.post("/api/transaction", {
        orderId: orderID,
        amount: totalPrice,
        email: userData.email,
        fullName: userData.fullName,
        transactionDetails: details,
      });

      if (response.data && response.data.success) {
        alert(
          `Transaksi berhasil diselesaikan oleh ${details.payer.name.given_name}. Email konfirmasi telah dikirim ke ${userData.email}.`
        );
      } else {
        console.error("Response dari server:", response.data);
        alert(
          "Transaksi berhasil, tetapi ada masalah dengan pengiriman informasi."
        );
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("Error dari server:", err.response.data);
        alert(
          err.response.data.message ||
            "Terjadi kesalahan di server. Mohon coba lagi atau hubungi dukungan kami."
        );
      } else if (err.request) {
        console.error("Tidak ada respons dari server:", err.request);
        alert("Server tidak merespons. Mohon periksa koneksi Anda.");
      } else {
        console.error("Error saat mengirim transaksi:", err.message);
        alert("Terjadi kesalahan yang tidak diketahui. Mohon coba lagi.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="font-bold text-3xl mb-6">Checkout</h2>
      {loading ? (
        <p>Memuat...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border p-4 rounded-lg shadow"
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
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Jumlah: {item.quantity}
                      </p>
                      <button
                        className="text-red-500 text-sm mt-1"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  <p className="font-bold">Rp {item.price * item.quantity}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">TOTAL</p>
                <p className="text-2xl font-bold">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:w-1/3 space-y-4">
            <div className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                Total: Rp {totalPrice.toLocaleString("id-ID")}
              </h3>
              <p className="text-sm mb-2">
                Resi pembayaran dan produk akan dikirimkan ke email Anda:
              </p>
              <p className="bg-yellow-200 text-black text-sm p-2 rounded-md">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>

            <div className="border p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Selesaikan Pembayaran Anda
              </h3>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    handleTransaction(data.orderID, details);
                  });
                }}
                onError={(err) => {
                  console.error("Error PayPal Checkout:", err);
                  alert("Terjadi kesalahan saat transaksi.");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
