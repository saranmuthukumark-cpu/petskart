"use client";

import { User, Plus, ShoppingCart, List } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useData } from "@/context/LivestockContext";

export default function AdminDashboard() {
  const [users, setUsers] = useState(0);
  const { pets, livestocks, pharmacy, supplies, veterinary } = useData();

  useEffect(() => {
    const getUser = async () => {
      const respone = await fetch("http://localhost:5000/users", {
        method: "GET",
        credentials: "include",
      });
      const result = await respone.json();
      setUsers(result.length);
    };
    getUser();
  }, []);

  const totalSubmissions = pets.length + livestocks.length + pharmacy.length + supplies.length + veterinary.length;

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 bg-[#fff2ee] p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center">
              <User />
            </div>
            <p className="mt-3 font-medium">Admin</p>
          </div>

          <div className="space-y-3">
            <Link href={"/admin/admin-dashboard"} className="w-full bg-white py-2 flex items-center px-3 rounded-md">
              Dashboard
            </Link>
            <Link href={"/admin/admin-usermanagement"} className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              User Management
            </Link>
            <Link href={"/admin/admin-approvals"} className="w-full bg-[#7f5539] text-white py-2 rounded-md flex items-center gap-2 px-3">
            Submissions
            </Link>
            <Link href={"/admin/admin-list"} className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              <List size={16} /> All Listings
            </Link>
            <Link href={"/admin/admin-add"} className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              <Plus size={16} /> Add
            </Link>
            <Link href={"/admin/admin-orders"} className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              <ShoppingCart size={16} /> Orders
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl text-[#7f5539] font-bold mb-6">ADMIN Dashboard</h1>

        <div className="bg-[#fff2ee] p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-6">Welcome ADMIN 👋</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Users</p>
              <p className="text-3xl font-bold mt-2">{users}</p>
            </div>

            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Submissions</p>
              <p className="text-3xl font-bold mt-2">{totalSubmissions}</p>
            </div>

            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Pets</p>
              <p className="text-3xl font-bold mt-2">{pets.length}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Submissions by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-[#fff2ee] p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600">Pets</p>
              <p className="text-2xl font-bold text-[#7f5539]">{pets.length}</p>
            </div>
            <div className="bg-[#fff2ee] p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600">Livestocks</p>
              <p className="text-2xl font-bold text-[#7f5539]">{livestocks.length}</p>
            </div>
            <div className="bg-[#fff2ee] p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600">Pharmacy</p>
              <p className="text-2xl font-bold text-[#7f5539]">{pharmacy.length}</p>
            </div>
            <div className="bg-[#fff2ee] p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600">Supplies</p>
              <p className="text-2xl font-bold text-[#7f5539]">{supplies.length}</p>
            </div>
            <div className="bg-[#fff2ee] p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600">Veterinary</p>
              <p className="text-2xl font-bold text-[#7f5539]">{veterinary.length}</p>
            </div>
          </div>

          <Link
            href={"/admin/admin-list"}
            className="mt-6 inline-block bg-[#7f5539] text-white px-6 py-2 rounded-lg text-sm">
            View All 
          </Link>
        </div>
      </main>
    </div>
  );
}
