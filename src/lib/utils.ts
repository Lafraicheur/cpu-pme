import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Exporter la fonction de décodage HTML pour une utilisation facile
export { decodeHtmlEntities } from "./utils/decodeHtmlEntities";
