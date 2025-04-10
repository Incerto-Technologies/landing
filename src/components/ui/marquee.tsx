"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const Marquee = ({ images }: { images: string[] }) => {
  return (
    <div className="relative overflow-hidden max-w-[100vw] w-full">
      <motion.div
        className="flex items-center gap-12"
        animate={{
          x: [0, -images.length * 100],
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
        {images.map((image, index) => (
          <Image
            key={`first-${index}`}
            src={image}
            alt="Client Logo"
            width={100}
            height={100}
            className="h-8 w-auto grayscale transition-all hover:grayscale-0"
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <Image
            key={`second-${index}`}
            src={image}
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
