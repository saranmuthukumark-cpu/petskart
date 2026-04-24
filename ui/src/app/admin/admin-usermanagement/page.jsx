"use client";

import { useData } from "@/context/LivestockContext";
import { User, Plus, ShoppingCart, List } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [dbUsers, setDbUsers] = useState([]);
  const { pets, supplies, livestocks } = useData();

  const totalListings =
    (pets?.length || 0) + (supplies?.length || 0) + (livestocks?.length || 0);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();

        const nonAdminUsers = result.filter(
          (user) => (user.role || "").toLowerCase() !== "admin",
        );

        setDbUsers(nonAdminUsers);
        setUserCount(nonAdminUsers.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUser();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("want to delete?")) return;

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setDbUsers(dbUsers.filter((u) => u._id !== userId && u.id !== userId));
        setUserCount((prev) => prev - 1);
        alert(" deleted successfully!");
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
              href={"/admin/admin-dashboard"}
              className="w-full bg-white  py-2  flex  items-center px-3 rounded-md">
              Dashboard
            </Link>

            <Link
              href={"/admin/admin-usermanagement"}
              className="w-full bg-[#7f5539] text-white py-2 rounded-md flex items-center gap-2 px-3">
              User Management
            </Link>

            <Link
              href={"/admin/admin-approvals"}
              className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              Submissions
            </Link>
            <Link
              href={"/admin/admin-list"}
              className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              <List size={16} /> All Listings
            </Link>
            <Link
              href={"/admin/admin-add"}
              className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              <Plus size={16} /> Add
            </Link>
            <Link
              href={"/admin/admin-orders"}
              className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
              <ShoppingCart size={16} /> Orders
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl text-[#7f5539] font-bold mb-6">
          ADMIN User Management
        </h1>

        <div className="bg-[#fff2ee] p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-6">Welcome ADMIN 👋</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Users</p>
              <p className="text-3xl font-bold mt-2">{userCount}</p>
            </div>

            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Admin</p>
              <p className="text-3xl font-bold mt-2">1</p>
            </div>

            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Listings</p>
              <p className="text-3xl font-bold mt-2">{totalListings}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-white min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">User Management</h1>
            <Link
              href="/register"
              className="bg-[#7f5539] text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Plus size={16} /> Add User
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-4 bg-[#fff2ee] text-[#7f5539] p-4 text-sm font-bold">
              <p>Users</p>
              <p>Role</p>
              <p>Delete User</p>
              <p>Details</p>
            </div>

            {dbUsers && dbUsers.length > 0 ? (
              dbUsers.map((user) => (
                <div
                  key={user._id}
                  className="grid grid-cols-4 items-center p-4 border-t border-[#7f5539] ">
                  <p className="capitalize">{user.name}</p>

                  <span className="bg-[#fff2ee] text-sm px-3 py-1 rounded-full w-fit">
                    {user.role || "User"}
                  </span>

                  <p>
                    <button
                      onClick={() => handleDelete(user._id)}
                      type="button"
                      className="text-red-500  px-4 py-1 rounded-full w-fit  border  ">
                      Remove
                    </button>
                  </p>

                  <Link
                    href={`/admin/admin-user-view?name=${user.name}&email=${user.email}&joined=${user.createdAt}`}>
                    <button
                      type="button"
                      className="text-green-500  px-4 py-1 rounded-full w-fit border ">
                      View
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No users found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
