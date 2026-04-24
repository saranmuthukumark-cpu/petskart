"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter } from "lucide-react";
import { AddToCart } from "@/utils/cart";
import { useData } from "@/context/LivestockContext";

export default function PetSuppliesPage() {
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const { supplies, loading } = useData();

  let filtered = supplies.filter((pet) => {
    return (
      (category ? pet.category === category : true) &&
      (maxPrice ? pet.price <= Number(maxPrice) : true)
    );
  });

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const categories = [...new Set(supplies.map((i) => i.category))];
  if (loading) {
    return <div className="p-6 text-center text-[#7f5539]">Loading </div>;
  }

  function getImageSrc(img) {
    if (!img) return "";
    if (img.startsWith("/uploads/")) return `http://localhost:5000${img}`;
    return img;
  }


  return (
    <div className="flex bg-white min-h-screen">
      <aside className="w-64 bg-gray-200 p-6 hidden md:block">
        <div>
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            {" "}
            Filters <Filter size={18} />
          </h2>
        </div>

        <div className="space-y-5">
          <div>
            <p className="font-medium mb-1">Category</p>
            <select
              className="w-full p-2 rounded-md bg-white outline-0"
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
              placeholder="₹"
              className="w-full p-2 rounded-md bg-white outline-0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setCategory("");
              setMaxPrice("");
            }}
            className="w-full bg-[#7f5539] text-white py-2 rounded-md">
            Reset
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Pet Supplies</h1>

          <select
            className="border rounded-md px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort → Price</option>
            <option value="low"> Low → High</option>
            <option value="high"> High → Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((pet) => (
              <div
                key={pet._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md  overflow-hidden">
                <div className="relative h-52">
                  <Image
                    src={pet.image}

                    alt={pet.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {pet.name}
                  </h3>

                  <p className="text-sm text-gray-500">{pet.brand}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-[#7f5539]">
                      ₹{pet.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{pet.oldPrice}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">{pet.location}</p>

                  <button
                    onClick={() => AddToCart(pet)}
                    className="mt-4 w-full bg-[#7f5539] text-white py-2 rounded-full text-sm hover:opacity-90 ">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products found</p>
          )}
        </div>
      </main>
    </div>
  );
}
