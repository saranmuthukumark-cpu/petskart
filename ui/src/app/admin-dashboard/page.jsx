"use client";

import { User, Users, CheckCircle, Plus, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 bg-[#fff2ee] p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center">
              <User />
            </div>
            <p className="mt-3 font-medium">Admin </p>
          </div>

          <div className="space-y-3">
            <Link
              href={"/admin-dashboard"}
              className="w-full bg-[#7f5539]  text-white py-2  flex  items-center px-3 rounded-md">
              Dashboard
            </Link>

            <Link  href={"/admin-usermanagement"} className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              User Management
            </Link>

            <Link href={"/admin-approvals"} className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
               Approvals
            </Link>

            <Link href={"/admin-add"} className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              <Plus size={16} /> Add
            </Link>
          </div>
        </div>

         <Link  href={"/"}className="flex text-[#7f5539] items-center gap-2 bg-white p-2 rounded-md">
          <LogOut size={16} /> Logout
        </Link>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl text-[#7f5539] font-bold mb-6">
          ADMIN Dashboard
        </h1>

        <div className="bg-[#fff2ee] p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-6">Welcome ADMIN 👋</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              Total Users : 2
            </div>

            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              Total Listings : 40
            </div>

            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              Pending Approvals : 2
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
