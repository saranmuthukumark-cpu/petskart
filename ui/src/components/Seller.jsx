"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Seller() {
  const { user } = useContext(AuthContext);

  return (
    <section className="px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto bg-[#fff2ee] rounded-2xl p-6 md:p-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-black ">
            Want to sell on petskart?
          </h2>

          <p className="text-gray-700 mt-6 leading-relaxed max-w-lg">
            List your pets or livestock easily and connect with genuine buyers.
            Reach a wider audience, get better prices, and manage your listings
            seamlessly on PetsKart.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            {user ? (
              <Link
                href={"/sellpet"}
                className="bg-[#7f5539] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 ">
                START SELLING
              </Link>
            ) : (
              <button
                disabled
                className="bg-[#7f5539] text-white px-6 py-3 rounded-full font-medium cursor-not-allowed opacity-80">
                START SELLING
              </button>
            )}

            <Link
              href={"/learn-more"}
              className="bg-[#7f5539] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 ">
              LEARN MORE
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-65 h-75 md:w-150 md:h- rounded-2xl overflow-hidden">
            <Image
              src="/assets/petskart-logo1.png"
              alt="img"
              fill
              className="object-fit"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
