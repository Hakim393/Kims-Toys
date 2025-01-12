import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartContext } from "../_context/CartContext";

function Header() {
  const MenuList = [
    { name: "Beranda", path: "/" },
    { name: "Toko", path: "/toko" },
    { name: "Tentang", path: "/tentang" },
  ];

  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();

  const totalHarga = (cart || []).reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  const [isLoading, setIsLoading] = useState(false);

  // untuk memperbarui jumlah produk
  const updateCartQuantity = async (id, change) => {
    const product = cart.find((item) => item.id === id);
    if (!product) return;

    const newQuantity = product.quantity + change;
    const previousCart = [...cart];

    // Optimistic update
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);

    try {
      setIsLoading(true);
      if (newQuantity <= 0) {
        const response = await fetch("/api/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) throw new Error("Failed to delete item");
      } else {
        const response = await fetch("/api/cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, change }),
        });
        if (!response.ok) throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error(error);
      setCart(previousCart); // Rollback on failure
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user.email) {
        console.warn("User belum login atau email tidak tersedia");
        return;
      }

      try {
        const response = await fetch(`/api/cart?email=${user.email}`);
        if (!response.ok) {
          const errorDetails = await response.text();
          console.error(
            `Failed to fetch cart data: ${response.status} - ${errorDetails}`
          );
        } else {
          const data = await response.json();
          setCart(data); // Simpan data keranjang ke state
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [user]);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 lg:px-10 bg-primary border-b-4 border-black">
      <div className="flex items-center">
        <Image
          src="/Assets/LogoKimStore.png"
          alt="Logo KIMS TOYS"
          width={50}
          height={50}
          className="mr-2"
        />
        <h2
          className="font-extrabold text-sm sm:text-lg px-2 py-1"
          style={{
            backgroundColor: "#0ea5e9",
            color: "#ffffff",
            textShadow:
              "0 0 10px rgba(255, 255, 0, 0.9), 0 0 15px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.7)",
            borderRadius: "4px",
          }}
        >
          KIMS TOYS
        </h2>
      </div>

      <ul className="hidden md:flex gap-4 lg:gap-6">
        {MenuList.map((menu, index) => (
          <li key={index}>
            <Link
              href={menu.path}
              style={{ backgroundColor: "#22c55e" }}
              className="px-4 py-2 text-white font-bold rounded-md shadow-[0px_4px_0px_#000] active:shadow-[0px_2px_0px_#000] active:translate-y-[2px] transition-all"
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 md:gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <div className="relative">
              <button
                className="p-2 rounded-full bg-black text-white"
                disabled={isLoading}
              >
                <ShoppingBag className="md:text-base text-sm" />
              </button>
              <Badge className="bg-black text-white absolute -top-2 -right-2 rounded-full py-1 px-2 text-xs">
                {cart?.length || 0}
              </Badge>
            </div>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Keranjang Belanja</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              {cart?.length === 0 ? (
                <p className="text-sm text-gray-600 mt-2">
                  Belum ada item di keranjang Anda.
                </p>
              ) : (
                <ul className="space-y-4 mt-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-4 border-b pb-2"
                    >
                      <Image
                        src={item.imageUrl || "/placeholder-image.png"}
                        alt={item.name || "Produk"}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Harga: Rp{" "}
                          {typeof item.price === "number"
                            ? item.price.toLocaleString("id-ID")
                            : "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                          disabled={isLoading}
                        >
                          -
                        </button>
                        <span className="px-3 text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-1 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
                          disabled={isLoading}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {cart?.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <p className="font-bold text-lg">
                    Total Harga: Rp {totalHarga?.toLocaleString("id-ID")}
                  </p>
                  <Link href={"/checkout"}>
                    <Button variant="default" className="mt-4 w-full">
                      Order
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Link href={"/dashboard"}>
          <Button
            variant="destructive"
            className="text-xs sm:text-sm md:text-md"
          >
            Jual Product
          </Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
