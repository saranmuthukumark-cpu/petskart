"use client";

import {
  User,
  Plus,
  ShoppingCart,
  List,
  Package,
  PawPrint,
  Pill,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useData } from "@/context/LivestockContext";

export default function AdminDashboard() {
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState([]);

  const { pets, supplies, livestocks, pharmacy, veterinary } = useData();

  const totalListings =
    (pets?.length || 0) +
    (supplies?.length || 0) +
    (livestocks?.length || 0) +
    (pharmacy?.length || 0) +
    (veterinary?.length || 0);

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

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders");
        const result = await response.json();
        setOrders(result);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    getOrders();
  }, []);

  const completedOrders = orders.filter((o) => o.status === "Completed").length;
  const pendingOrders = orders.filter((o) => o.status !== "Completed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

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
              className="w-full bg-[#7f5539]  text-white py-2  flex  items-center px-3 rounded-md">
              Dashboard
            </Link>

            <Link
              href={"/admin/admin-usermanagement"}
              className="w-full bg-white py-2 rounded-md flex items-center gap-2 px-3">
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
          ADMIN Dashboard
        </h1>

        <div className="bg-[#fff2ee] p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-6">Welcome ADMIN 👋</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Users</p>
              <p className="text-3xl font-bold mt-2">{users}</p>
            </div>

            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Listings</p>
              <p className="text-3xl font-bold mt-2">{totalListings}</p>
            </div>

            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Orders</p>
              <p className="text-3xl font-bold mt-2">{orders.length}</p>
            </div>

            
          </div>
        </div>

        <div className="mt-6 bg-[#fff2ee] p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <Link
              href="/admin/admin-orders"
              className="text-sm text-[#7f5539] font-medium">
              View All →
            </Link>
          </div>

          {orders.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="p-2">Customer</th>
                  <th className="p-2">City</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="border-t border-gray-400">
                    <td className="p-2 text-sm capitalize">{order.name}</td>
                    <td className="p-2 text-sm capitalize">{order.city}</td>
                    <td className="p-2 text-sm font-bold text-[#7f5539]">
                      ₹{order.totalAmount?.toFixed(0)}
                    </td>
                    <td className="p-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          order.status === "Completed"
                            ? " text-green-500"
                            : " text-yellow-500"
                        }`}>
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-sm">No orders yet.</p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/admin-add"
            className="bg-[#7f5539] text-white p-4 rounded-xl text-center text-sm font-medium">
            + Add Listing
          </Link>
          <Link
            href="/admin/admin-list"
            className="bg-[#7f5539] text-white p-4 rounded-xl text-center text-sm font-medium">
            View Listings
          </Link>
          <Link
            href="/admin/admin-orders"
            className="bg-[#7f5539] text-white p-4 rounded-xl text-center text-sm font-medium">
            Manage Orders
          </Link>
          <Link
            href="/admin/admin-usermanagement"
            className="bg-[#7f5539] text-white p-4 rounded-xl text-center text-sm font-medium">
            Manage Users
          </Link>
        </div>
      </main>
    </div>
  );
}
