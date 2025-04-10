"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export const ContactBtn = ({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Link
      href={href || "/discover"}
      className={cn(
        "mt-8 inline-flex rounded-md bg-[var(--color-primary)] px-4 py-2 text-[13px] font-medium text-[var(--color-card)] shadow-sm ring-1 ring-[var(--color-primary)]/75 transition-colors hover:bg-[var(--color-primary)]/90",
        className
      )}
    >
      {children ? children : "Discover Now"}
    </Link>
  );
};
