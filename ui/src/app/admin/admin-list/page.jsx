"use client";

import { User, Plus, ShoppingCart, List } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useData } from "@/context/LivestockContext";

export default function AdminListings() {
  const [users, setUsers] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ categoryType: "pets" });

  const {
    pets,
    setPets,
    livestocks,
    setLivestocks,
    pharmacy,
    setPharmacy,
    supplies,
    setSupplies,
    veterinary,
    setVeterinary,
  } = useData();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        setUsers(result.length);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    getUser();
  }, []);

  const allListings = [
    ...(pets || []).map((item) => ({ ...item, categoryType: "pets" })),
    ...(livestocks || []).map((item) => ({
      ...item,
      categoryType: "livestocks",
    })),
    ...(pharmacy || []).map((item) => ({ ...item, categoryType: "pharmacy" })),
    ...(supplies || []).map((item) => ({ ...item, categoryType: "supplies" })),
    ...(veterinary || []).map((item) => ({
      ...item,
      categoryType: "veterinary",
    })),
  ];

  const handleDelete = async (id, categoryType) => {
    const confirmDelete = window.confirm(`delete from listing ?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/adminlist/${categoryType}/${id}`
        ,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        if (categoryType === "pets")
          setPets(pets.filter((item) => item._id !== id));
        else if (categoryType === "livestocks")
          setLivestocks(livestocks.filter((item) => item._id !== id));
        else if (categoryType === "pharmacy")
          setPharmacy(pharmacy.filter((item) => item._id !== id));
        else if (categoryType === "supplies")
          setSupplies(supplies.filter((item) => item._id !== id));
        else if (categoryType === "veterinary")
          setVeterinary(veterinary.filter((item) => item._id !== id));

        alert("deleted successfully!");
      } else {
        alert("Failed to delete listing.");
      }
    } catch (error) {
      console.error("Error", error);
      alert(" error occurred");
    }
  };

  const handleAddListing = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/${newItem.categoryType}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(newItem),
        },
      );

      if (response.ok) {
        const result = await response.json();
        const addedData = result.item || result;
        alert("Listing added!");
        setShowAddForm(false);
        setNewItem({ categoryType: "pets" });

        if (newItem.categoryType === "pets")
          setPets([...(pets || []), addedData]);
        else if (newItem.categoryType === "livestocks")
          setLivestocks([...(livestocks || []), addedData]);
        else if (newItem.categoryType === "pharmacy")
          setPharmacy([...(pharmacy || []), addedData]);
        else if (newItem.categoryType === "supplies")
          setSupplies([...(supplies || []), addedData]);
        else if (newItem.categoryType === "veterinary")
          setVeterinary([...(veterinary || []), addedData]);
      } else {
        const err = await response.json();
        console.error("Backend error:", err);
        alert("Failed to add listing.");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleFieldChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 bg-[#fff2ee] p-6 flex-col justify-between hidden md:flex">
        <div>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center bg-white">
              <User />
            </div>
            <p className="mt-3 font-medium">Admin</p>
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
              className="w-full bg-[#7f5539] text-white py-2 rounded-md flex items-center gap-2 px-3">
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

      <main className="flex-1 p-6 md:p-8">
        <h1 className="text-2xl text-[#7f5539] font-bold mb-6">
          ADMIN Dashboard
        </h1>

        <div className="bg-[#fff2ee] p-6 rounded-2xl mb-10">
          <h2 className="text-xl font-semibold mb-6">Welcome ADMIN 👋</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Users</p>
              <p className="text-3xl font-bold mt-2">{users}</p>
            </div>

            <div className="bg-gray-200 text-[#7f5539] p-6 rounded-xl text-center">
              <p className="text-sm">Total Listings</p>
              <p className="text-3xl font-bold mt-2">{allListings.length}</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">All Database Listings</h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allListings.length > 0 ? (
              allListings.map((item) => (
                <div
                  key={`${item.categoryType}-${item._id}`}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex flex-col">
                  <div className="relative h-48 bg-gray-100 shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name || item.title || "Image"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                        No Image Available
                      </div>
                    )}

                    <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-[#7f5539] uppercase shadow-sm">
                      {item.categoryType}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="text-lg font-semibold text-[#7f5539] ">
                      {item.name || item.animal || item.title || "Unnamed"}
                    </h4>

                    {(item.family || item.breed) && (
                      <p className="text-sm text-gray-500 mt-1">
                        Type: {item.family || item.breed}
                      </p>
                    )}

                    <p className="text-gray-500 text-sm mt-1 flex-1">
                      {item.location
                        ? typeof item.location === "object" &&
                          item.location !== null
                          ? `${item.location.village || ""}, ${item.location.district || ""}`.replace(
                            /(^, )|(, $)/g,
                            "",
                          )
                          : item.location
                        : "No location specified"}
                    </p>

                    <p className="text-lg font-bold mt-2">
                      ₹{item.price || item.price_inr || item.fees || "no cost"}

                    </p>

                    <div className="flex gap-2 mt-4">
                      <Link
                        href={`/admin/admin-list-edit/${item._id}?type=${item.categoryType}`}
                        className="flex-1 text-center bg-white text-blue-500 border py-2 rounded-lg text-sm ">
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(item._id, item.categoryType)
                        }
                        className="flex-1 bg-white- text-red-500 border py-2 rounded-lg text-sm ">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No listings found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
