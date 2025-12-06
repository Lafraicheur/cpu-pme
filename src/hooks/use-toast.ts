"use client";

import { useEffect, useState } from "react";

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number | null;
  [key: string]: any;
};

let toasts: Toast[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function toast({ title, description, action, duration = 4000, ...props }: Omit<Toast, "id">) {
  const id = Math.random().toString(36).slice(2, 9);
  const t: Toast = { id, title, description, action, duration, ...props };
  toasts = [...toasts, t];
  notify();

  if (duration !== null && duration !== Infinity) {
    setTimeout(() => {
      toasts = toasts.filter((x) => x.id !== id);
      notify();
    }, duration);
  }

  return id;
}

export function useToast() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const cb = () => setTick((t) => t + 1);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  return {
    toasts,
    toast,
    dismiss(id?: string) {
      if (id) {
        toasts = toasts.filter((t) => t.id !== id);
      } else {
        toasts = [];
      }
      notify();
    },
  };
}

export default useToast;
