"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .trim()
    .regex(/^[a-zA-Z\s-]+$/, "Name can only letters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9._%+-]+@gmail\.com$/, "Invalid email address"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "Invalid password",
    ),
});

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const registerData = await response.json();

      if (response.ok) {
        toast.success(registerData.message || "Registered successfully!");
        router.push("/login");
      } else {
        toast.error(registerData.error);
      }
    } catch (error) {
      toast.error("Failed to register user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-[#fff2ee] rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/petskart-logo1.png"
            alt="logo"
            width={130}
            height={40}
          />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg outline-none "
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border rounded-lg outline-none "
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg outline-none "
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#7f5539] text-white py-3 rounded-lg font-medium hover:opacity-90 ">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an Account?{" "}
          <Link href={"/login"} className="text-[#7f5539] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
