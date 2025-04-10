"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export const Marquee = ({ images }: { images: string[] }) => {
  const [imageRepeatCount, setImageRepeatCount] = useState(images.length * 4);

  return (
    <div className="relative overflow-hidden max-w-[100vw] w-full">
      <motion.div
        className="flex items-center gap-12"
        animate={{
          x: [0, -imageRepeatCount * 100],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {/* First set of images */}
        {Array.from({ length: imageRepeatCount }).map((_, index) => (
          <Image
            key={`first-${index}`}
            src={images[index % images.length]}
            alt="Client Logo"
            width={100}
            height={100}
            className="h-8 w-auto grayscale transition-all hover:grayscale-0"
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {Array.from({ length: imageRepeatCount }).map((_, index) => (
          <Image
            key={`second-${index}`}
            src={images[index % images.length]}
            alt="Client Logo"
            width={100}
            height={100}
            className="h-8 w-auto grayscale transition-all hover:grayscale-0"
          />
        ))}
      </motion.div>
    </div>
  );
};
