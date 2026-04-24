"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const increase = (id) => {
    updateCart(
      cart.map((pet) =>
        pet._id === id ? { ...pet, quantity: pet.quantity + 1 } : pet,
      ),
    );
  };

  const decrease = (id) => {
    updateCart(
      cart.map((pet) =>
        pet._id === id && pet.quantity > 1
          ? { ...pet, quantity: pet.quantity - 1 }
          : pet,
      ),
    );
  };

  const remove = (id) => {
    updateCart(cart.filter((pet) => pet._id !== id));
    alert("Removed! from Family");
  };

  const subtotal = cart.reduce((num, pet) => num + pet.price * pet.quantity, 0);

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Family Match:</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {cart.length === 0 ? (
            <p>Family is empty</p>
          ) : (
            cart.map((pet, index) => (
              <div
                key={pet._id || pet.id || index}
                className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-sm">
                <div className="w-50 h-30  rounded-xl overflow-hidden relative">
                  {pet.image ? (
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      fill
                      className="object-fit"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{pet.name}</h3>

                  <p className="text-gray-500 text-sm">₹{pet.price} per pet</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decrease(pet._id)}
                      className="px-3 py-1 bg-gray-200 rounded">
                      -
                    </button>

                    <span>{pet.quantity}</span>

                    <button
                      onClick={() => increase(pet._id)}
                      className="px-3 py-1 bg-gray-200 rounded">
                      +
                    </button>

                    <button
                      onClick={() => remove(pet._id)}
                      className="ml-4 text-red-600 text-sm">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="font-semibold">₹{pet.price * pet.quantity}</div>
              </div>
            ))
          )}
        </div>

        <div className="bg-[#fff2ee] p-6 rounded-2xl shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-6">Family Summary</h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t my-6"></div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              if (user) {
                router.push("/checkout");
              } else {
                alert("login to proceed to checkout");
              }
            }}
            disabled={!user}
            className={`mt-6 w-full py-3 rounded-full font-medium ${
              user
                ? "bg-[#7f5539] text-white hover:bg-[#6c4830] cursor-pointer"
                : "bg-[#7f5539] text-white opacity-70 cursor-not-allowed"
            }`}>
            {user ? "Bring Me Home" : "Login to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
