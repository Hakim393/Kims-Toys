// page.js
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import ProductList from "./_components/ProductList";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Product List Section */}
      <div className="p-10 md:px-36 lg:px-48">
        <ProductList />
      </div>
    </div>
  );
}
