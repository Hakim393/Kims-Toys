"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { CartContext } from "./_context/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      GetCartItems();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await axios.post("/api/user", { user });
      console.log("Respons dari API /api/user:", response.data);
    } catch (error) {
      console.error(
        "Error saat memeriksa atau mengambil data user:",
        error.response?.data || error.message
      );
    }
  };

  const GetCartItems = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await axios.get(
        "/api/cart?email=" + user.primaryEmailAddress.emailAddress
      );
      setCart(result.data);
      console.log(result);
    } catch (error) {
      console.error(
        "Error fetching cart items:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <CartContext.Provider value={{ cart, setCart }}>
        <PayPalScriptProvider
          options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
        >
          <Header />
          <div>{children}</div>
        </PayPalScriptProvider>
      </CartContext.Provider>
    </div>
  );
}

export default Provider;
