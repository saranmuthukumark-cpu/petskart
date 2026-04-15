"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { pets } from "@/data/Pets";
import { Filter } from "lucide-react";
import { AddToCart } from "@/utils/cart";

export default function Marketplace() {
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [sort, setSort] = useState("");

  let filteredData = pets.filter((pet) => {
    return (
      (category ? pet.family === category : true) &&
      (maxPrice ? pet.price_inr <= Number(maxPrice) : true) &&
      (maxAge ? pet.age <= Number(maxAge) : true)
    );
  });

  if (sort === "low") {
    filteredData.sort((a, b) => a.price_inr - b.price_inr);
  } else if (sort === "high") {
    filteredData.sort((a, b) => b.price_inr - a.price_inr);
  }

  const categories = [...new Set(pets.map((pet) => pet.family))];

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
          <h1 className="text-2xl md:text-3xl font-bold">Available Pets</h1>

          <select
            className="border rounded-md px-3 py-2 outline-0"
            value={sort}
            onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort → Price</option>
            <option value="low"> Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="relative h-52">
                      <Link href={`/pets-detailed-view/${pet.id}`}>
                  <Image
                    src={pet.image}
                    alt={pet.name}
                    fill
                    className="object-fit"
                  />
                  </Link>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{pet.family}</h3>
                  <p className="text-sm text-gray-500">{pet.age} </p>
                  <p className="text-sm text-gray-500">
                    <span className="line-through pr-2">₹{pet.oldPrice}</span>
                    <span className="font-bold text-[#7f5539]">
                      ₹{pet.price}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500">{pet.location}</p>

                  <button
                    onClick={() => AddToCart(pet)}
                    className="block mt-4 text-center bg-[#7f5539] text-white py-2 rounded-full w-full">
                    Add to Cart
                  </button>
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
