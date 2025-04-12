"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const logos = [
  {
    image: "/clients/ving.svg",
    alt: "ving",
    name: "ving",
  },
  {
    image: "/clients/dhruv.svg",
    alt: "dhruv",
    name: "dhruv",
  },
  {
    image: "/clients/astra.svg",
    alt: "astra",
    name: "astra",
  },
  {
    image: "/clients/bytebeam.svg",
    alt: "bytebeam",
    name: "bytebeam",
  },
  {
    image: "/clients/kevit.svg",
    alt: "kevit",
    name: "kevit",
  },
  {
    image: "/clients/dhan.svg",
    alt: "dhan",
    name: "dhan",
  },
  {
    image: "/clients/fyers.svg",
    alt: "fyers",
    name: "fyers",
  },
  // {
  //   image: "/clients/discite.svg",
  //   alt: 'discite',
  //   name: 'discite',
  // },
];

const Logos = () => {
  return (
    <div className="relative max-w-[100vw] md:max-w-[800px] mx-auto overflow-hidden">
    {/* Left fade gradient */}
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />

    {/* Right fade gradient */}
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

      <motion.div
        className={cn("flex items-center gap-12 ")}
        animate={{
          x: [0, -(logos.length * 4) * 100],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 80,
            ease: "linear",
          },
        }}
      >
        {
         Array.from({ length:4 }).map((_, index) => (
          logos.map((logo, logoIndex) => (
            <Image 
              key={`${index}-${logoIndex}`} 
              src={logo.image} 
              alt={logo.alt} 
              width={32} 
              height={32}
              className={cn(
                "h-6  w-auto grayscale transition-all hover:grayscale-0",
                {
                  "h-7": logo.name === "dhruv",
                  "h-10": logo.name === "dhan" || logo.name === "fyers" || logo.name === "bytebeam",
                  "h-11 rounded-md overflow-hidden max-md:h-8": logo.name === "ving",
                  "h-9": logo.name === "kevit",
                  }
              )}
            />
          ))
         ))
        }
      </motion.div>

    </div>
  );
};

export default Logos;
