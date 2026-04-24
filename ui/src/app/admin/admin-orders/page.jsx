"use client";

import { User, Plus, ShoppingCart, List } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [dbOrders, setDbOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders");
        const result = await response.json();
        setDbOrders(result);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const completedCount = dbOrders.filter(
    (o) => o.status === "Completed",
  ).length;
  const pendingCount = dbOrders.filter((o) => o.status !== "Completed").length;

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
    try {
      const response = await fetch(
        `http://localhost:5000/orders/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (response.ok) {
        setDbOrders(
          dbOrders.map((order) =>
            order._id === id ? { ...order, status: newStatus } : order,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 bg-[#fff2ee] p-6 flex-col justify-between hidden md:flex">
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
              className="w-full bg-white py-2 flex items-center px-3 rounded-md">
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
              className="w-full bg-[#7f5539] text-white py-2 rounded-md flex items-center gap-2 px-3">
              <ShoppingCart size={16} /> Orders
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8">
        <h1 className="text-2xl text-[#7f5539] font-bold mb-6">
          ADMIN Orders Management
        </h1>

        <div className="bg-[#fff2ee] p-6 rounded-2xl mb-10">
          <h2 className="text-xl font-semibold mb-6">Welcome ADMIN👋</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center font-medium">
              <p className="text-sm">Total Orders</p>
              <p className="text-3xl font-bold mt-2">{dbOrders.length}</p>
            </div>
            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center font-medium">
              <p className="text-sm">Completed Orders</p>
              <p className="text-3xl font-bold mt-2">{completedCount}</p>
            </div>
            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center font-medium">
              <p className="text-sm">Pending Orders</p>
              <p className="text-3xl font-bold mt-2">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-7 bg-[#fff2ee] text-[#7f5539] p-4 text-sm font-bold">
            <p className="col-span-1">Customer</p>
            <p className="col-span-1">City</p>
            <p className="col-span-1">Items Qty</p>
            <p className="col-span-1">Total</p>
            <p className="col-span-1 text-center">Status</p>
            <p className="col-span-1 text-center">Details</p>
          </div>

          {dbOrders.length > 0 ? (
            dbOrders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-2 md:grid-cols-7 items-center p-4 border-t border-[#7f5539] gap-y-4">
                <p className="capitalize col-span-2 md:col-span-1 font-semibold md:font-normal truncate pr-2">
                  <span className="md:hidden text-xs text-gray-400 block">
                    Name
                  </span>
                  {order.name}
                </p>
                <p className="capitalize col-span-1 md:col-span-1">
                  <span className="md:hidden text-xs text-gray-400 block">
                    City
                  </span>
                  {order.city}
                </p>
                <p className="col-span-1 md:col-span-1 text-gray-600">
                  <span className="md:hidden text-xs text-gray-400 block">
                    Items
                  </span>
                  {order.items?.length || 0} items
                </p>
                <p className="col-span-1 md:col-span-1 font-bold text-[#7f5539]">
                  <span className="md:hidden text-xs text-gray-400 block">
                    Total
                  </span>
                  ₹{order.totalAmount?.toFixed(2) || 0}
                </p>
                <div className="col-span-1 md:col-span-1 flex justify-center">
                  <button
                    onClick={() => toggleStatus(order._id, order.status)}
                    className={`px-4 py-1 rounded-full text-sm font-semibold border ${
                      order.status === "Completed"
                        ? " text-green-500 border"
                        : " text-yellow-500 border"
                    }`}>
                    {order.status === "Completed" ? "Completed" : "Incomplete"}
                  </button>
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-center mt-2 md:mt-0">
                  <Link href={`/admin/admin-order-view?id=${order._id}`}>
                    <button className="bg-white text-black px-6 py-1 rounded-full border border-green-500 text-sm font-semibold">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No orders placed yet.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
