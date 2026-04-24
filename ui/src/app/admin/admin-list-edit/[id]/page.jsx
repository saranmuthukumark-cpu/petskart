"use client";

import { User, Plus, LogOut, Upload, ShoppingCart, List } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useData } from "@/context/LivestockContext";
export default function AdminEditDashboard() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params.id;
  const categoryType = searchParams.get("type");

  const {
    pets,
    livestocks,
    pharmacy,
    supplies,
    veterinary,
    loading: contextLoading,
  } = useData();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    family: "",
    gender: "",
    location: "",
    phone: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!id || !categoryType) return;

    let sourceArray = [];
    if (categoryType === "pets") sourceArray = pets;
    else if (categoryType === "livestocks") sourceArray = livestocks;
    else if (categoryType === "pharmacy") sourceArray = pharmacy;
    else if (categoryType === "supplies") sourceArray = supplies;
    else if (categoryType === "veterinary") sourceArray = veterinary;

    const data = sourceArray?.find((item) => item._id === id);

    if (data) {
      setFormData({
        name: data.name || data.animal || data.title || "",
        family: data.family || data.breed || "",
        gender: data.gender || "",
        location:
          typeof data.location === "object" && data.location !== null
            ? `${data.location.village || ""}, ${data.location.district || ""}`
            : data.location || "",
        phone:
          data.phone ||
          data.phoneNumber ||
          (data.owner ? data.owner.phone : "") ||
          "",
        price: data.price || data.fees || data.price_inr || "",
        description: data.description || data.details || "",
      });

      if (data.image) {
        setImage(data.image);
      }
      setLoading(false);
    }
  }, [
    id,
    categoryType,
    pets,
    livestocks,
    pharmacy,
    supplies,
    veterinary,
    contextLoading,
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSubmit = new FormData();

      dataToSubmit.append("name", formData.name);
      dataToSubmit.append("family", formData.family);
      dataToSubmit.append("gender", formData.gender);
      dataToSubmit.append("location", formData.location);
      dataToSubmit.append("phone", formData.phone);
      dataToSubmit.append("price", formData.price);
      dataToSubmit.append("description", formData.description);

      if (imageFile) {
        dataToSubmit.append("image", imageFile);
      }

      const response = await fetch(
        `http://localhost:5000/adminlist/${categoryType}/${id}`
        ,
        {
          method: "PUT",
          body: dataToSubmit,
          credentials: "include",
        },
      );

      if (response.ok) {
        alert("Updated successfully!");
        router.push("/admin/admin-list");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-xl font-bold text-[#7f5539]">
        Loading Data...
      </div>
    );

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
              Approvals
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
        <div className="min-h-screen bg-white p-6 md:p-10">
          <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[#7f5539] ">
              ADMIN edit {categoryType}
            </h1>
            <button
              onClick={() => router.push("/admin/admin-list")}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 font-medium">
              Cancel
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#fff2ee] max-w-4xl mx-auto p-8 rounded-2xl shadow-sm space-y-6">
            <div>
              <label className="pb-3 font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>

            <div>
              <label className="pb-3 font-medium">Age & Breed / Family:</label>
              <input
                type="text"
                name="family"
                value={formData.family}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-0"
              />
            </div>

            <div>
              <label className="pb-3 font-medium">Gender:</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-0"
              />
            </div>

            <div>
              <label className="pb-3 font-medium">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>

            <div>
              <label className="pb-3 font-medium">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-0"
              />
            </div>

            <div>
              <label className="pb-3 font-medium">Price ₹:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>

            <div>
              <label className="pb-3 font-medium">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-0"
                rows={4}
              />
            </div>

            <div>
              <div>
                <label className="mb-2 font-medium px-5 flex cursor-pointer w-fit">
                  Change Image: <Upload className="ml-3 text-[#7f5539]" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {image && (
                <div className="mt-3">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#7f5539] hover:bg-[#6a462f] transition text-white font-bold py-3 rounded-full">
              Update
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
