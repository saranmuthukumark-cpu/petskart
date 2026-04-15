"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import {
  CircleUser,
  Search,
  ShoppingCart,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const q = search.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setSearch("");
      setOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQty = cart.reduce((num, item) => num + item.quantity, 0);
      setCartCount(totalQty);
    };

    updateCart();

    window.addEventListener("storage", updateCart);

    return () => window.removeEventListener("storage", updateCart);
  }, []);

  return (
    <nav className="w-full bg-[#fff2ee] px-4 md:px-10 py-5 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <Image
              src="/assets/petskart-logo1.png"
              alt="logo"
              width={120}
              height={50}
              className=""
            />
          </Link>
        </div>

        <div className="hidden md:flex gap-6  font-medium">
          <Link href={"/livestocks"} className="hover:text-[#7f5539]">
            Livestock
          </Link>
          <Link href={"/marketplace"} className="hover:text-[#7f5539]">
            Marketplace
          </Link>
          <Link href={"/petsupplies"} className="hover:text-[#7f5539]">
            Pet Supplies
          </Link>
          <Link href={"/veterinary"} className="hover:text-[#7f5539]">
            Veterinary
          </Link>
          <Link href={"/pharmacy"} className="hover:text-[#7f5539]">
            Pharmacy
          </Link>
        </div>

        <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full w-1/4 shadow-sm">
          <input
            type="text"
            placeholder="Search pets..."
            className="w-full outline-none text-sm bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search
            size={18}
            className="text-gray-600 cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        <div className="flex items-center gap-6">
          <Link href={"/cart"} className="relative">
            <ShoppingCart className="cursor-pointer hover:text-[#7f5539]" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#7f5539] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {!user ? (
            <Link href={"/login"}>
              <CircleUser className="cursor-pointer hover:text-[#7f5539]" />
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium hidden md:block text-[#7f5539]">
                {user.name || "User"}
              </span>
              <img
                className="w-8 h-8 rounded-full border border-[#7f5539]"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=7f5539&color=fff`}
                alt="User Avatar"
              />
              <button
                onClick={logout}
                className="p-1 rounded-full hover:scale-110 text-[#7f5539] "
                title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          )}

          <button className="md:hidden ml-2" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-medium">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
            <input
              type="text"
              placeholder="Search pets..."
              className="w-full outline-none text-sm bg-transparent"
            />
            <Search size={18} />
          </div>

          <Link href={"/livestocks"}>Livestock</Link>
          <Link href={"/marketplace"}>Marketplace</Link>
          <Link href={"/petsupplies"}>Pet Supplies</Link>
          <Link href={"/veterinary"}>Veterinary</Link>
          <Link href={"/pharmacy"}>Pharmacy</Link>
        </div>
      )}
    </nav>
  );
}
