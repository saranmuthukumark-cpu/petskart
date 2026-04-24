"use client";

import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/utils/cart";
import { useData} from "@/context/LivestockContext";


export default function FeaturedListing() {
  const { pets,loading } = useData();
  if (loading) {
    return <div className="p-6 text-center text-[#7f5539]">Loading </div>;
  }
  return (
    <section className="px-6 py-10 bg-[#fff2ee]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#7f5539]">Featured Pets</h2>

        <Link
          href={"/marketplace"}
          className="text-sm text-[#7f5539] hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {pets.slice(0, 8).map((pet) => (
          <div
            key={pet._id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <Link href={`/pets-detailed-view/${pet._id}`}>
              <div className="relative h-40">
                <Image
                  src={pet.image}
                  alt={"image"}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="p-3">
              <h3 className="font-semibold text-[#7f5539]">{pet.name}</h3>

              <div className="flex gap-2 items-center">
                {pet.oldPrice && (
                  <p className="text-gray-400 line-through text-sm">
                    ₹{pet.oldPrice}
                  </p>
                )}

                <p className="text-[#7f5539] font-bold">₹{pet.price}</p>
              </div>

              <p className="text-sm text-gray-500">
                {pet.age} •{" "}
                {typeof pet.location === "object" && pet.location !== null
                  ? `${pet.location.village || ""}, ${pet.location.district || ""}`.replace(/(^, )|(, $)/g, "")
                  : pet.location}
              </p>

              <button
                onClick={() => AddToCart(pet)}
                className="mt-2 w-full bg-[#7f5539] text-white py-2 rounded hover:opacity-90">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
