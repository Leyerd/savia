import { create } from "zustand";
import { useEffect } from "react";

interface ToastState {
  msg: string | null;
  variant: "default" | "success";
  show: (msg: string, variant?: "default" | "success") => void;
  hide: () => void;
}

export const useToast = create<ToastState>((set) => ({
  msg: null,
  variant: "default",
  show: (msg, variant = "default") => set({ msg, variant }),
  hide: () => set({ msg: null }),
}));

export function ToastHost() {
  const { msg, variant, hide } = useToast();
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(hide, 2600);
    return () => clearTimeout(t);
  }, [msg, hide]);
  if (!msg) return null;
  return <div className={`toast ${variant === "success" ? "success" : ""}`}>{msg}</div>;
}
