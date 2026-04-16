"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4">
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/80 backdrop-blur-md sm:p-7"
      >
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <span className="text-sm font-semibold">K</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-50">
              Kryptex
            </p>
            <p className="text-xs text-slate-400">
              Zero‑knowledge password & key vault
            </p>
          </div>
        </div>
        {children}
      </motion.main>
      <p className="mt-4 text-center text-xs text-slate-500">
        Your secrets are encrypted locally before they ever leave your device.
      </p>
    </div>
  );
}

