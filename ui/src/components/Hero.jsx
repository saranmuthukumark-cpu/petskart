"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/assets/banner1.png",
  "/assets/banner2.png",
  "/assets/banner3.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden ">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-900 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}>
          <Image
            src={img}
            alt="hero"
            fill
            className="object-fit"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === current ? "bg-white" : "bg-[#7f5539]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
