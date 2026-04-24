"use client";

import Link from "next/link";

export default function Categories() {
  return (
    <section className="px-6 py-10 bg-white">
      
      <h2 className="text-2xl font-bold text-[#7f5539] mb-6 text-center">
        Browse Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        
        
        <Link href={"/livestocks"}>
          <div
            className="relative h-40 rounded-xl overflow-hidden cursor-pointer group bg-cover bg-center hover:scale-105 "
            style={{ backgroundImage: "url('/assets/pets.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 "></div>
            <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">
              Pets
            </p>
            
            
          </div>
        </Link>

       
        <Link href={"/marketplace"}>
          <div
            className="relative h-40 rounded-xl overflow-hidden cursor-pointer group bg-cover bg-center hover:scale-105 "
            style={{ backgroundImage: "url('/assets/livestock.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 "></div>
            <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">
              Livestock
            </p>
          </div>
        </Link>

       
        <Link href={"/supplies"}>
          <div
            className="relative h-40 rounded-xl overflow-hidden cursor-pointer group bg-cover bg-center hover:scale-105 "
            style={{ backgroundImage: "url('/assets/supplies.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 "></div>
            <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">
              Pet Supplies
            </p>
          </div>
        </Link>

        
        <Link href={"/veterinary"}>
          <div
            className="relative h-40 rounded-xl overflow-hidden cursor-pointer group bg-cover bg-center hover:scale-105 "
            style={{ backgroundImage: "url('/assets/vet.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 "></div>
            <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">
              Veterinary
            </p>
          </div>
        </Link>

      </div>
    </section>
  );
}