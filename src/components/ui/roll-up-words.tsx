"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function RollUpText({
  animations,
}: {
  animations: { name: string; image: string }[];
}) {
  const [index, setIndex] = useState(0);

  const words = animations.map((animation) => animation.name);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="overflow-hidden h-[2em] w-[30.5rem] relative">
      <AnimatePresence>
        <motion.div
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", width: "100%" }}
          className="flex items-center justify-center text-foreground font-bold"
        >
          {words[index]}
          <Image
            src={animations[index].image}
            alt={words[index]}
            width={38}
            height={38}
            className="ml-2 mt-3"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
