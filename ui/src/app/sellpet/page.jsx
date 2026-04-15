"use client";

import { Upload } from "lucide-react";
import { useState } from "react";

export default function SellPetPage() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Pet has sent to Approval!");
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Sell Your Pet & LiveStock
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#fff2ee] max-w-4xl mx-auto p-8 rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="pb-3 font-medium">Pet Name:</label>
          <input
            type="text"
            placeholder="Enter pet name"
            className="w-full p-3 border rounded-lg outline-0"
            required
          />
        </div>

        <div>
          <label className="pb-3 font-medium">Age & Breed:</label>
          <input
            type="text"
            placeholder="e.g. 2 years, Labrador"
            className="w-full p-3 border rounded-lg outline-0"
            required
          />
        </div>

        <div>
          <label className="pb-3 font-medium">Gender:</label>
          <input
            type="text"
            placeholder="Male / Female"
            className="w-full p-3 border rounded-lg outline-0"
            required
          />
        </div>

        <div>
          <label className="pb-3 font-medium">Location:</label>
          <input
            type="text"
            placeholder="Enter your city"
            className="w-full p-3 border rounded-lg outline-0"
            required
          />
        </div>

        <div>
          <label className="pb-3 font-medium">Phone Number:</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="w-full p-3 border rounded-lg outline-0"
            required
          />
        </div>

        <div>
          <label className="pb-3 font-medium">Price ₹:</label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full p-3 border rounded-lg outline-0"
            required
          />
        </div>

        <div>
          <label className="pb-3 font-medium">Description:</label>
          <textarea
            placeholder="Enter details about pet"
            className="w-full p-3 border rounded-lg outline-0"
            rows={4}
            required
          />
        </div>

        <div>
          <div>
            <label className=" mb-2 font-medium px-5 flex">
              Upload Image: <Upload className="ml-3" />{" "}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-1/3 p-2 rounded-2xl bg-gray-300 hidden"
                required
              />
            </label>
          </div>

          {image && (
            <img
              src={image}
              alt="img"
              className="mt-3 w-32 h-32 object-pet rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#7f5539] text-white py-3 rounded-full">
          Submit
        </button>
      </form>
    </div>
  );
}
