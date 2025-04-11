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
    <div className="relative overflow-hidden max-w-[100vw] w-full">
      <motion.div
        className={cn("flex items-center gap-12 md:hidden")}
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
                "h-8 max-md:h-6 w-auto grayscale transition-all hover:grayscale-0",
                {
                  "h-7": logo.name === "dhruv",
                  "h-10": logo.name === "dhan" || logo.name === "fyers",
                  "h-11 rounded-md overflow-hidden max-md:h-8": logo.name === "ving",
                  "h-12 max-md:h-9": logo.name === "kevit",
                }
              )}
            />
          ))
         ))
        }
      </motion.div>

      <div className={cn(" items-center gap-12 hidden md:flex")}>
        {logos.map((logo, logoIndex) => (
          <Image 
              key={`${logoIndex}`} 
              src={logo.image} 
              alt={logo.alt} 
              width={32} 
              height={32}
              className={cn(
                "h-8 max-md:h-6 w-auto grayscale transition-all hover:grayscale-0",
                {
                  "h-7": logo.name === "dhruv",
                  "h-10": logo.name === "dhan" || logo.name === "fyers",
                  "h-11 rounded-md overflow-hidden max-md:h-8": logo.name === "ving",
                  "h-12 max-md:h-9": logo.name === "kevit",
                }
              )}
            />
        ))}
      </div>
    </div>
  );
};

export default Logos;
