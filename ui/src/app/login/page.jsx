"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const loginData = await response.json();

      if (response.ok) {
        await login();
        
      } else {
        alert(loginData.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login user");
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
          Login to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an Account?{" "}
          <Link href={"/register"} className="text-[#7f5539] font-medium">
            Register
          </Link>
        </p>
      
      </div>
    </div>
  );
}
