import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  price: number | string,
  currency: "USD" | "EUR" | "GBP" | "BDT" | "INR" | "CAD" = "CAD",
  notation: "compact" | "engineering" | "scientific" | "standard" = "compact"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation,
    maximumFractionDigits: 0,
  }).format(Number(price));
}
