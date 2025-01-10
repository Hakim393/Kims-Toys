"use client";
import React, { useEffect } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await axios.post("/api/user", {
        user,
      });

      console.log("Respons dari API /api/user:", response.data); // Debug respons dari API
    } catch (error) {
      console.error(
        "Error saat memeriksa atau mengambil data user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default Provider;
