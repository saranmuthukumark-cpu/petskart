import { pets } from "@/data/Pets";
import { CircleArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DetailedView({ params }) {
  const { id } = await params;

  const pet = pets.find((pet) => String(pet.id) === String(id));

  if (!pet) return notFound();

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="relative w-full h-64 md:h-100">
          <Image
            src={pet.image}
            alt={pet.name}
            fill
            priority
            className="object-fit"
          />

          <Link
            href={"/marketplace"}
            className="absolute right-3 top-2 bg-[#7f5539] p-2 rounded-full text-white hover:scale-110"></Link>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-[#7f5539]">
              {pet.name}
            </h1>

            <span className="text-xl md:text-2xl font-semibold text-[#7f5539]">
              ₹{pet.price}
            </span>
          </div>

          <p className="text-gray-500 mt-2">
            {pet.location} - {pet.age}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#7f5539] mb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{pet.details}</p>
          </div>

        
            <a
              href={"/marketplace"}
              className="mt-6 flex items-center justify-center gap-2 w-full bg-[#7f5539] text-white py-3 rounded-xl font-medium">
              <CircleArrowLeft /> back
            </a>
          
        </div>
      </div>
    </div>
  );
}
