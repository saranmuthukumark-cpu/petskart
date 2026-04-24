"use client";

import { useState } from "react";
import { live } from "@/data/Livestock";
import Image from "next/image";
import Link from "next/link";
import { Filter } from "lucide-react";
import { useData } from "@/context/LivestockContext";

export default function LivestockPage() {
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [sort, setSort] = useState("");
  const { livestocks, loading } = useData();

  let filteredData = livestocks.filter((pet) => {
    return (
      (category ? pet.animal === category : true) &&
      (maxPrice ? pet.price_inr <= Number(maxPrice) : true) &&
      (maxAge ? pet.age <= Number(maxAge) : true)
    );
  });

  if (sort === "low") {
    filteredData.sort((a, b) => a.price_inr - b.price_inr);
  } else if (sort === "high") {
    filteredData.sort((a, b) => b.price_inr - a.price_inr);
  }

  const categories = [...new Set(live.map((pet) => pet.animal))];
  if (loading) {
    return <div className="p-6 text-center text-[#7f5539]">Loading </div>;
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
                <option key={cat}>{cat}</option>
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

          <div>
            <p className="font-medium mb-1">Max Age</p>
            <input
              type="number"
              placeholder="Years"
              className="w-full p-2 rounded-md bg-white outline-0"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setCategory("");
              setMaxPrice("");
              setMaxAge("");
            }}
            className="w-full bg-[#7f5539] text-white py-2 rounded-md">
            Reset
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Available Livestock
          </h1>

          <select
            className="border rounded-md px-3 py-2 outline-0"
            value={sort}
            onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort → Price</option>
            <option value="low"> Low → High</option>
            <option value="high"> High → Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((pet) => (
              <div
                key={pet._id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="relative h-52">
                  <Image
                    src={pet.image}
                    alt={pet.animal}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {pet.animal} ({pet.breed})
                  </h3>

                  <p className="text-sm text-gray-500">
                    ₹{pet.price_inr} • {pet.age} yrs
                  </p>

                  <p className="text-sm text-gray-500">
                    {pet.location.district}
                  </p>

                  <Link
                    href={`/livestock/${pet._id}`}
                    className="block mt-4 text-center bg-[#7f5539] text-white py-2 rounded-full">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </main>
    </div>
  );
}
