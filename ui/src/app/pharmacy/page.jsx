"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter } from "lucide-react";
import { AddToCart } from "@/utils/cart";
import { useData } from "@/context/LivestockContext";

export default function PharmacyPage() {
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { pharmacy, loading } = useData();

  let filtered = pharmacy.filter((pet) => {
    return (
      (category ? pet.category === category : true) &&
      (maxPrice ? pet.price <= Number(maxPrice) : true)
    );
  });

  const categories = [...new Set(pharmacy.map((i) => i.category))];
  if (loading) {
    return <div className="p-6 text-center text-[#7f5539]">Loading </div>;
  }
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-gray-200 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={18} />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="space-y-5">
          <div>
            <p className="font-medium mb-1">Category</p>
            <select
              className="w-full p-2 rounded-md bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-medium mb-1">Max Price</p>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full p-2 rounded-md bg-white"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setCategory("");
              setMaxPrice("");
            }}
            className="flex items-center justify-center gap-2 w-full bg-[#7f5539] text-white py-2 rounded-md">
            Reset
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Pet Pharmacy</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((pet) => (
              <div
                key={pet._id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md ">
                <div className="relative h-52">
                  <Image
                    src={pet.image}
                    alt={pet.name}
                    fill
                    className="object-fit"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{pet.name}</h3>

                  <p className="text-sm text-gray-500">{pet.brand}</p>

                  <div className="flex items-center gap-2 mt-2 text-[#7f5539] font-bold">
                    ₹{pet.price}
                  </div>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {pet.details}
                  </p>

                  <button
                    onClick={() => AddToCart(pet)}
                    className="mt-4 w-full bg-[#7f5539] text-white py-2 rounded-lg text-sm hover:opacity-90 ">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No medicines found</p>
          )}
        </div>
      </main>
    </div>
  );
}
