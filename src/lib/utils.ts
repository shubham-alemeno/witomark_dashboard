import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const successToast = { color: "rgba(0, 210, 0)", border: "2px solid rgba(0, 210, 0, 0.5)" };
export const errorToast = { color: "rgba(255, 0, 0)", border: "2px solid rgba(255, 0, 0, 0.5)" };
