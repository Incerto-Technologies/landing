"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export const Marquee = ({ children, length, className, hideMarqueeOnBigScreen = false }: { children: React.ReactNode, length: number, className?: string, hideMarqueeOnBigScreen?: boolean }) => {
  return (
    <div className="relative overflow-hidden max-w-[100vw] w-full">
      <motion.div
        className={cn("flex items-center gap-12", className, hideMarqueeOnBigScreen && " md:hidden")}
        animate={{
          x: [0, -length * 100],
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
        {children}
      </motion.div>
      

            <div className={cn("flex items-center gap-12", hideMarqueeOnBigScreen && "hidden md:flex")}>
              {children}
      </div>
    </div>
  );
};
