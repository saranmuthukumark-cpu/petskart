"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const subtotal = cart.reduce(
    (num, item) => num + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleOrder = () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      alert("Please fill all details");
      return;
    }

    console.log("Order:", {
      form,
      cart,
      payment: "Cash on Delivery",
    });

    localStorage.removeItem("cart");

    alert("Order placed successfully!");
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name * "
                className="w-full p-3 border rounded-lg outline-0"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="text"
                placeholder="Phone Number *"
                className="w-full p-3 border rounded-lg outline-0"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <textarea
                placeholder="Address *"
                className="w-full p-3 border rounded-lg outline-0"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <input
                type="text"
                placeholder="City *"
                className="w-full p-3 border rounded-lg outline-0"
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="flex items-center gap-3">
              <input type="radio" checked readOnly />
              <span className="font-medium">Cash on Delivery</span>
            </div>
          </div>
        </div>

        <div className="bg-[#fff2ee] p-6 rounded-2xl shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleOrder}
            className="mt-6 w-full bg-[#7f5539] text-white py-3 rounded-full font-medium hover:opacity-90 transition">
            Claim My Buddy
          </button>
        </div>
      </div>
    </div>
  );
}
