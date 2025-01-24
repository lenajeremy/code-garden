import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(st: string): string {
  return st.charAt(0).toUpperCase() + st.slice(1)
}

type MaybeError = Error | { error: string } | unknown
export function isError(e: MaybeError): e is { error: string } {
  return Object.hasOwn(e as object, "error")
}

export function errorDescription(err: Error | { error: string } | unknown): string {
  if (err instanceof Error) {
    return err.message
  } else if (isError(err)) {
    return capitalize(err.error)
  } else {
    return String(err)
  }
}