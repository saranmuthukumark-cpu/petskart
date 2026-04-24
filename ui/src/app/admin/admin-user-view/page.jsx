"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { CircleArrowLeft } from "lucide-react";

function UserDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const joined = searchParams.get("joined");

  const joinedData =
    joined && joined !== "undefined"
      ? new Date(joined).toLocaleDateString()
      : "Not Available";

  return (
    <div className=" bg-[#fff2ee] p-8 rounded-2xl shadow-sm border border-[#7f5539] max-w-lg mx-auto mt-20">
      <h2 className="text-3xl text-[#7f5539] font-bold mb-8 border-b pb-4 text-center">
        User Profile
      </h2>

      <div className="space-y-6 text-lg text-gray-700">
        <h1 className="flex items-center gap-4">
          <p className=" font-bold text-[#7f5539]">Name:</p>
          <span className="capitalize">{name || "Not Provided"}</span>
        </h1>
        <h1 className="flex items-center gap-4">
          <p className="font-bold text-[#7f5539]">Email:</p>
          <span>{email && email !== "undefined" ? email : "Not Provided"}</span>
        </h1>
        <h1 className="flex items-center gap-4">
          <p className="font-bold text-[#7f5539]">Joined at:</p>
          <span>{joinedData}</span>
        </h1>
      </div>

      <div className="mt-10 ">
        <Link href="/admin/admin-usermanagement">
          <button className="bg-[#7f5539] hover:bg-[#6b472e] text-white px-8 py-2 rounded-md w-full text-center flex justify-center  ">
            <CircleArrowLeft /> back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function AdminUserView() {
  return (
    <div className="min-h-screen bg-white p-10">
      <Suspense
        fallback={
          <div className="text-center mt-10">Loading User Details...</div>
        }>
        <UserDetails />
      </Suspense>
    </div>
  );
}
