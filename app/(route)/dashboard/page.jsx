import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserListing from "./_components/UserListing";

function page() {
  return (
    <div className="mt-16 ml-12">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <Tabs defaultValue="listing" className="mt-5">
        <TabsList>
          <TabsTrigger value="listing">Daftar</TabsTrigger>
          <TabsTrigger value="purchase">Pembelian</TabsTrigger>
        </TabsList>
        <TabsContent value="listing">
          <UserListing />
        </TabsContent>
        <TabsContent value="purchase">
          <p className="mt-6 text-gray-500">Change your password here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
