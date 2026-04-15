"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#fff2ee]   px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/assets/petskart-logo1.png"
              alt="logo"
              width={140}
              height={40}
            />
          </div>

          <p className="text-sm mb-2">
            Petskart is a modern e-commerce web application designed for pet
            lovers to easily browse and purchase pet-related products online.
          </p>
        </div>

        <div>
          <h1 className="font-semibold mb-3 text-[#7f5539]">Shop</h1>
          <ul className="space-y-2 text-sm ">
            <li className="hover:text-[#7f5539]">
              <Link href={"/livestocks"}>Livestock</Link>
            </li>
            <li className="hover:text-[#7f5539]">
              <Link href={"/marketplace"}>Marketplace</Link>
            </li>
            <li className="hover:text-[#7f5539]">
              <Link href={"/petsupplies"}>Pet Supplies</Link>
            </li>
            <li className="hover:text-[#7f5539]">
              <Link href={"/veterinary"}>Veterinary</Link>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-3 text-[#7f5539]">Company</h1>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#7f5539]">
              <Link href={"/livestocks"}>About us</Link>
            </li>
            <li className="hover:text-[#7f5539]">
              <Link href={"/marketplace"}>Sell on PetsKart</Link>
            </li>
            <li className="hover:text-[#7f5539]">
              <Link href={"/petsupplies"}>Help Center</Link>
            </li>
            <li className="hover:text-[#7f5539]">
              <Link href={"/veterinary"}>Contact us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-3 text-[#7f5539]">Support</h1>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#7f5539]">
              <Link href={"/livestocks"}>Terms & Conditions</Link>
            </li>
            <li className="hover:text-[#7f5539]">
              <Link href={"/marketplace"}>Privacy & Policy</Link>
            </li>
            <li className="hover:text-[#7f5539]">
              <Link href={"/petsupplies"}>Blogs</Link>
            </li>
            <li className="hover:text-[#7f5539]">
              <Link href={"/veterinary"}>FAQs</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-[#7f5539] pt-4">
        PETSKART &copy; All Rights Reserved
      </div>
    </div>
  );
}
