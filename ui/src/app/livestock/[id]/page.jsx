"use client";

import { use } from "react";
import { CircleArrowLeft, Phone } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useData } from "@/context/LivestockContext";

import { notFound } from "next/navigation";

export default function LivestockDetails({ params }) {
  const { id } = use(params);

  const { livestocks, loading } = useData();

  if (loading) {
    return <div className="p-6 text-center text-[#7f5539]">Loading </div>;
  }
  const pet = livestocks.find((pet) => String(pet._id) === String(id));

  if (!pet) return notFound();

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="relative w-full h-65 md:h-120">
          <Image
            src={pet.image}
            alt={pet.animal}
            fill
            priority
            className="object-fit"
          />
          <div className="absolute right-3 top-2 bg-[#7f5539] p-2 rounded-full text-white hover:scale-110 ">
            <Link href={"/livestocks"}>
              <CircleArrowLeft />
            </Link>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-[#7f5539]">
              {pet.animal} ({pet.breed})
            </h1>

            <span className="text-xl md:text-2xl font-semibold text-[#7f5539]">
              ₹{pet.price_inr}
            </span>
          </div>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            {pet.location.district}, {pet.location.state}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#7f5539] mb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{pet.details}</p>
          </div>

          <div className="mt-8 border rounded-2xl p-6 bg-white shadow-sm">
            <h2 className="text-lg font-semibold text-[#7f5539] mb-5">
              Owner Details
            </h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm text-gray-500">Name</span>
                <span className="font-medium">{pet.owner.name}</span>
              </div>

              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="font-medium">{pet.owner.phone}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Email</span>
                <span className="font-medium text-right break-all">
                  {pet.owner.email}
                </span>
              </div>
            </div>

            <a
              href={`tel:${pet.owner.phone}`}
              className="mt-6 flex items-center justify-center gap-2 w-full bg-[#7f5539] text-white py-3 rounded-xl font-medium hover:opacity-90 ">
              <Phone /> Call Owner
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
