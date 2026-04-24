"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { CircleArrowLeft } from "lucide-react";

function OrderDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const subtotal =
    order?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;
  const actualTax = subtotal * 0.05;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/orders/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-lg mt-20 text-[#7f5539] font-bold animate-pulse">
        Loading
      </p>
    );
  if (!order || order.error)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load order</p>
    );

  return (
    <div className="bg-[#fff2ee] p-8 rounded-2xl shadow-md  border-[#7f5539] max-w-3xl mx-auto mt-10">
      <div className="flex justify-center items-center mb-8 border-b pb-4">
        <h2 className="text-3xl text-[#7f5539] font-bold ">Order Details</h2>
        
      </div>

      <div className="grid grid-cols-1  gap-6 text-lg text-gray-700 mb-8 border-b pb-8">
        <div>
          <p className="mb-2">
            <strong className="text-[#7f5539]">Customer:</strong>
            <span className="capitalize">{order.name}</span>
          </p>
          <p className="mb-2">
            <strong className="text-[#7f5539]">Phone:</strong> {order.phone}
          </p>
          <p className="mb-2">
            <strong className="text-[#7f5539]">Method:</strong>
            {order.paymentMethod}
          </p>
        </div>
        <div>
          <p className="mb-2">
            <strong className="text-[#7f5539]">Address:</strong> {order.address}
          </p>
          <p className="mb-2">
            <strong className="text-[#7f5539]">City:</strong> {order.city}
          </p>
          <p className="mb-2">
            <strong className="text-[#7f5539]">Date:</strong>{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "Unknown"}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#7f5539] mb-4">
        Purchased Items ({order.items.length}):
      </h3>
      <div className="space-y-3 mb-8">
        {order.items && order.items.length > 0 ? (
          <>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm ">
                <span className="font-semibold text-gray-800 text-lg">
                  {item.name}{" "}
                  <span className="text-[#7f5539] font-bold ml-2">
                    (x{item.quantity})
                  </span>
                </span>
                <span className="font-bold text-xl text-[#7f5539]">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm ">
              <span className="font-semibold text-gray-800 text-lg"> TAX</span>
              <span className="font-bold text-xl text-[#7f5539]">
                ₹{(actualTax).toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <p className="text-gray-400 italic">No items found</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6 gap-4">
        <Link href="/admin/admin-orders">
          <button className="bg-[#7f5539] text-white px-8 py-3 rounded-md font-semibold  w-full md:w-auto">
            <CircleArrowLeft/> 
          </button>
        </Link>
        <p className="font-bold text-xl text-[#7f5539]">
          ₹{(actualTax + subtotal).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default function AdminOrderView() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
        <OrderDetails />
      </Suspense>
    </div>
  );
}
