"use client";

import { useEffect } from "react";
import Head from "next/head";
import Hero from "./_components/Hero";
import ProductList from "./_components/ProductList";

export default function Home() {
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

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      <div className="p-10 md:px-36 lg:px-48">
        <ProductList />
      </div>
    </div>
  );
}
