"use client";

import Image from "next/image";
import Link from "next/link";
import { useData } from "@/context/LivestockContext";

export default function Livestock() {
  const { livestocks, loading } = useData();
  if (loading) {
    return <div className="p-6 text-center text-[#7f5539]">Loading </div>;
  }
  return (
    <section className="px-6 py-10 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#7f5539]">
          Featured Livestocks
        </h2>

        <Link
          href={"/livestocks"}
          className="text-sm text-[#7f5539] hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {livestocks.slice(0, 8).map((pet) => (
          <div
            key={pet._id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md  flex flex-col">
            <div className="relative h-40 w-full">
              <Image
                src={pet.image}
                alt={pet.animal}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-fit"
              />
            </div>

            <div
              className="p-3 flex flex-col  grow-0
             ">
              <h3 className="font-semibold text-[#7f5539] ">
                {pet.animal} ({pet.breed})
              </h3>

              <p className="text-[#7f5539] font-bold">₹{pet.price_inr}</p>

              <p className="text-sm text-gray-500">{pet.location.district}</p>

              <p className="text-xs text-gray-400 py-2">
                Owner: {pet.owner.name}
              </p>

              <Link
                href={`/livestock/${pet._id}`}
                className="mt-auto w-full bg-[#7f5539] text-white py-2 rounded text-sm text-center  hover:bg-[#6d4a31] ">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
