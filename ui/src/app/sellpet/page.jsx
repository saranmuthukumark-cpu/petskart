"use client";

import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SellPetPage() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("pets");

  const router = useRouter();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (imageFile) {
      formData.set("image", imageFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/adminlist/${category}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      if (response.ok) {
        alert("It has Added");
        router.push("/");
      } else {
        const err = await response.json().catch(() => ({}));
        console.error("Backend error:", err);
        alert("Failed to add ");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Connet with Us</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#fff2ee] max-w-4xl mx-auto p-8 rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="pb-3 font-medium">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-lg outline-0 bg-white"
            required>
            <option value="pets">Pets</option>
            <option value="livestocks">Livestocks</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="supplies">Supplies</option>
            <option value="veterinary">Veterinary</option>
          </select>
        </div>

        {category === "pets" && (
          <>
            <div>
              <label className="pb-3 font-medium">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Golden Retriever"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Family:</label>
              <select
                name="family"
                className="w-full p-3 border rounded-lg outline-0 bg-white"
                required>
                <option value="">Select Family</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Fish">Fish</option>
                <option value="Mammal">Mammal</option>
              </select>
            </div>
            <div>
              <label className="pb-3 font-medium">Age:</label>
              <input
                type="text"
                name="age"
                placeholder="e.g. 2 years"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Location:</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Chennai"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Old Price ₹:</label>
              <input
                type="number"
                name="oldPrice"
                placeholder="e.g. 30000"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Price ₹:</label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 25000"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Details:</label>
              <textarea
                name="details"
                placeholder="Enter details about pet"
                className="w-full p-3 border rounded-lg outline-0"
                rows={4}
                required
              />
            </div>
          </>
        )}

        {category === "livestocks" && (
          <>
            <div>
              <label className="pb-3 font-medium">Animal:</label>
              <input
                type="text"
                name="animal"
                placeholder="e.g. Cow, Goat, Pig"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Breed:</label>
              <input
                type="text"
                name="breed"
                placeholder="e.g. Gir"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>

            <div>
              <label className="pb-3 font-medium">Age:</label>
              <input
                type="number"
                name="age"
                placeholder="e.g. 4"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Price ₹:</label>
              <input
                type="number"
                name="price_inr"
                placeholder="e.g. 65000"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Village:</label>
              <input
                type="text"
                name="location.village"
                placeholder="e.g. Erode"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">District:</label>
              <input
                type="text"
                name="location.district"
                placeholder="e.g. Erode"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">State:</label>
              <input
                type="text"
                name="location.state"
                placeholder="e.g. Tamil Nadu"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Owner Name:</label>
              <input
                type="text"
                name="owner.name"
                placeholder="e.g. saran"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Owner Phone:</label>
              <input
                type="tel"
                name="owner.phone"
                placeholder="e.g. 9876543210"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Owner Email:</label>
              <input
                type="email"
                name="owner.email"
                placeholder="e.g. ramesh@gmail.com"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Details:</label>
              <textarea
                name="details"
                placeholder="Enter details about livestock"
                className="w-full p-3 border rounded-lg outline-0"
                rows={4}
                required
              />
            </div>
          </>
        )}

        {category === "pharmacy" && (
          <>
            <div>
              <label className="pb-3 font-medium">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Pet Syrup"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Category:</label>
              <select
                name="category"
                className="w-full p-3 border rounded-lg outline-0 bg-white"
                required>
                <option value="">Select Category</option>
                <option value="medicine">Medicine</option>
                <option value="supplement">Supplement</option>
                <option value="care">Care</option>
              </select>
            </div>
            <div>
              <label className="pb-3 font-medium">Brand:</label>
              <input
                type="text"
                name="brand"
                placeholder="e.g. VetCare"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Price ₹:</label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 350"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Stock:</label>
              <input
                type="number"
                name="stock"
                placeholder="e.g. 20"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Location:</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Chennai"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Details:</label>
              <textarea
                name="details"
                placeholder="Enter details about product"
                className="w-full p-3 border rounded-lg outline-0"
                rows={4}
                required
              />
            </div>
          </>
        )}

        {category === "supplies" && (
          <>
            <div>
              <label className="pb-3 font-medium">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Premium Dog Food"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Category:</label>
              <select
                name="category"
                className="w-full p-3 border rounded-lg outline-0 bg-white"
                required>
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="accessories">Accessories</option>
                <option value="grooming">Grooming</option>
                <option value="health">Health</option>
                <option value="toys">Toys</option>
              </select>
            </div>
            <div>
              <label className="pb-3 font-medium">Brand:</label>
              <input
                type="text"
                name="brand"
                placeholder="e.g. Pedigree"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Price ₹:</label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 1200"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Old Price ₹:</label>
              <input
                type="number"
                name="oldPrice"
                placeholder="e.g. 1500"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Stock:</label>
              <input
                type="number"
                name="stock"
                placeholder="e.g. 25"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Location:</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Chennai"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Details:</label>
              <textarea
                name="details"
                placeholder="Enter details about supply"
                className="w-full p-3 border rounded-lg outline-0"
                rows={4}
                required
              />
            </div>
          </>
        )}

        {category === "veterinary" && (
          <>
            <div>
              <label className="pb-3 font-medium">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Dr. Ramesh Kumar"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Specialization:</label>
              <input
                type="text"
                name="specialization"
                placeholder="e.g. Large Animals"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Experience (years):</label>
              <input
                type="number"
                name="experience"
                placeholder="e.g. 12"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Location:</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Chennai"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Clinic Name:</label>
              <input
                type="text"
                name="clinic"
                placeholder="e.g. RK Veterinary Clinic"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Phone:</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. 9876543210"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. rameshvet@gmail.com"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Fees ₹:</label>
              <input
                type="number"
                name="fees"
                placeholder="e.g. 500"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
            <div>
              <label className="pb-3 font-medium">Available:</label>
              <input
                type="text"
                name="available"
                placeholder="e.g. 9 AM - 6 PM"
                className="w-full p-3 border rounded-lg outline-0"
                required
              />
            </div>
          </>
        )}

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
              className="mt-3 w-32 h-32 object-fit rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#7f5539] text-white py-3 rounded-full">
          ADD
        </button>
      </form>
    </div>
  );
}
