import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { CONTACT_LINK } from "@/lib/constants";
import { buttonVariants } from "./button";
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
      href={href || CONTACT_LINK}
      className={cn(
        buttonVariants({
          variant: "primary",
        }),
        className
      )}
    >
      {children ? children : "Try Now"}
    </Link>
  );
};
