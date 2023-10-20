import { IPread } from "@/components/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterSelections(selections: IPread[], selected: IPread[]) {
  return selected.length === selections.length
    ? []
    : selections.filter((s) => selected.find((item) => item.id !== s.id));
}

export function removeDuplicates(arr: IPread[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
