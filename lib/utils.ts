import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_URL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function truncateUrl(url: string, length: number = 40) {
  if (url.length <= length) return url;
  return url.slice(0, length) + "...";
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
}

export const toQueryString = (params: Record<string, any>): string => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== null && value !== undefined,
    ),
  );

  const searchParams = new URLSearchParams(cleanParams);

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : "";
};

export const copyUrl = async (shortCode: string) => {
  const fullUrl = `${SITE_URL}/${shortCode}`;
  const cp = await copyToClipboard(fullUrl);

  return [cp, fullUrl];
};
