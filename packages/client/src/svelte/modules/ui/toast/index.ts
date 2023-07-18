import { writable, get } from "svelte/store";
import type { Writable } from "svelte/store"

export interface Toast {
  type: "warning" | "error"
  message: HTMLElement | string
  timestamp: DOMHighResTimeStamp,
  disappear?: boolean
}

export const toasts: Writable<Toast[]> = writable([])

export function toastMessage(message: string, toastOptions?: { type?: string, disappear?: boolean }) {
  const toast = {
    message,
    type: toastOptions?.type || "warning",
    timestamp: performance.now(),
    disappear: toastOptions?.disappear || true
  }
  console.log('toasting message...', toast)
  toasts.set([...get(toasts), toast])
}