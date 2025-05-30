import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (
  price: number,
  currency: "IDR" | "USD" = "IDR",
  minimumFractionDigits: number = 0,
  locale: "id-ID" | "en-US" = "id-ID",
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
  }).format(price);
};
