"use client";
import React, { useEffect } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("Data user:", user); // validasi data user
      PeriksaUser();
    }
  }, [user]);

  const PeriksaUser = async () => {
    try {
      const result = await axios.post("/api/user", {
        user,
      });
      console.log(result.data); // Log hasil dari server
    } catch (error) {
      console.error(
        "Terjadi error saat memeriksa user baru:",
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
