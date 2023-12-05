import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

export function roundTo5centsAsString(x: number) {
  return (Math.round(x * 20) / 20).toLocaleString('de-CH', {minimumFractionDigits:2, maximumFractionDigits:2}); //"1.50"
}
