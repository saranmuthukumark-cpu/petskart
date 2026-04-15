"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { pets } from "@/data/Pets";
import { live } from "@/data/Livestock";
import { supplies } from "@/data/Supplies";
import { SearchX } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const q = query.toLowerCase().trim();

  const matchedPets = pets.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.family.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
  );

  const matchedLive = live.filter(
    (l) =>
      l.animal.toLowerCase().includes(q) ||
      l.breed.toLowerCase().includes(q) ||
      (l.location?.district || "").toLowerCase().includes(q) ||
      (l.location?.village || "").toLowerCase().includes(q)
  );

  const matchedSupplies = supplies.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.brand || "").toLowerCase().includes(q) ||
      (s.location || "").toLowerCase().includes(q)
  );

  const total = matchedPets.length + matchedLive.length + matchedSupplies.length;

  return (
    <div className="min-h-screen bg-[#fff8f5] px-4 md:px-12 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Search Results for{" "}
          <span className="text-[#7f5539]">&ldquo;{query}&rdquo;</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {total} result{total !== 1 ? "s" : ""} found
        </p>
      </div>

      {total === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <SearchX size={64} strokeWidth={1.2} />
          <p className="text-lg font-medium">No results found for &ldquo;{query}&rdquo;</p>
          <Link
            href="/"
            className="mt-4 px-6 py-2 bg-[#7f5539] text-white rounded-full text-sm hover:bg-[#6b4430] transition"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="space-y-10">

          {matchedPets.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-[#e9d5c8] pb-2">
                 Pets ({matchedPets.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {matchedPets.map((pet) => (
                  <Link
                    key={pet.id}
                    href={`/pets-detailed-view/${pet.id}`}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group"
                  >
                    <div className="relative h-44">
                      <Image src={pet.image} alt={pet.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{pet.name}</h3>
                      <p className="text-xs text-gray-500">{pet.family} · {pet.age}</p>
                      <p className="text-sm font-bold text-[#7f5539] mt-1">₹{pet.price}</p>
                      <p className="text-xs text-gray-400">{pet.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {matchedLive.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-[#e9d5c8] pb-2">
                 Livestock ({matchedLive.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {matchedLive.map((animal) => (
                  <div key={animal.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group">
                    <div className="relative h-44">
                      <Image src={animal.image} alt={animal.animal} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{animal.animal} — {animal.breed}</h3>
                      <p className="text-xs text-gray-500">Age: {animal.age} yrs</p>
                      <p className="text-sm font-bold text-[#7f5539] mt-1">₹{animal.price_inr.toLocaleString("en-IN")}</p>
                      <p className="text-xs text-gray-400">{animal.location?.village}, {animal.location?.district}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {matchedSupplies.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-[#e9d5c8] pb-2">
                 Pet Supplies ({matchedSupplies.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {matchedSupplies.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group">
                    <div className="relative h-44">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.brand} · {item.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-[#7f5539]">₹{item.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{item.oldPrice}</span>
                      </div>
                      <p className="text-xs text-gray-400">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Searching</div>}>
      <SearchResults />
    </Suspense>
  );
}
