"use client";

import { useState } from "react";
import { vets } from "@/data/Veterinary";
import Image from "next/image";
import { Filter } from "lucide-react";

export default function VeterinaryPage() {
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");

  let filtered = vets.filter((doc) => {
    return (
      (location ? doc.location === location : true) &&
      (maxFees ? doc.fees <= Number(maxFees) : true)
    );
  });

  const locations = [...new Set(vets.map((v) => v.location))];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-gray-200 p-6 hidden md:block">
        <div>
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            {" "}
            Filters <Filter size={18} />
          </h2>
        </div>
        <div className="space-y-5">
          <div>
            <p className="font-medium mb-1">Location</p>
            <select
              className="w-full p-2 rounded-md bg-white"
              value={location}
              onChange={(e) => setLocation(e.target.value)}>
              <option value="">All</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-medium mb-1">Max Fees</p>
            <input
              type="number"
              placeholder="₹"
              className="w-full p-2 rounded-md bg-white"
              value={maxFees}
              onChange={(e) => setMaxFees(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setLocation("");
              setMaxFees("");
            }}
            className="w-full bg-[#7f5539] text-white py-2 rounded-md">
            Reset
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Veterinary Doctors
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-52">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className="object-fit"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{doc.name}</h3>

                <p className="text-sm text-gray-500">{doc.specialization}</p>

                <p className="text-sm text-gray-500">{doc.location}</p>

                <p className="text-sm text-gray-500">
                  Experience: {doc.experience} yrs
                </p>

                <p className="text-sm text-gray-500">{doc.available}</p>

                <p className="text-lg font-bold text-[#7f5539] mt-2">
                  <span className="text-gray-500 text-sm">min - </span>₹
                  {doc.fees}
                </p>

                <div className="flex gap-2 mt-4">
                  <a
                    href={`tel:${doc.phone}`}
                    className="w-full bg-[#7f5539] text-white py-2 rounded text-center text-sm">
                    CONSULT
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
