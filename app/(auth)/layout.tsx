"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, KeyRound, Fingerprint, Eye, EyeOff } from "lucide-react";

/* Floating icon data for the brand illustration panel */
const floatingIcons = [
  { icon: Shield, x: "20%", y: "25%", delay: 0, size: 28 },
  { icon: Lock, x: "70%", y: "15%", delay: 0.3, size: 22 },
  { icon: KeyRound, x: "55%", y: "65%", delay: 0.6, size: 24 },
  { icon: Fingerprint, x: "25%", y: "72%", delay: 0.9, size: 20 },
  { icon: Eye, x: "80%", y: "50%", delay: 1.2, size: 18 },
  { icon: EyeOff, x: "40%", y: "40%", delay: 0.5, size: 26 },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-auth-gradient">
      {/* Left panel — Brand illustration (hidden on mobile) */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden border-r border-border/30 lg:flex">
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[oklch(0.72_0.14_230_/_0.04)] blur-[100px]" />

        {/* Floating security icons */}
        {floatingIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className="absolute flex items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-md"
              style={{ left: item.x, top: item.y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: item.delay + 0.5,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon
                  className="text-primary/60"
                  style={{ width: item.size, height: item.size }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Central brand content */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 glow-ring"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="h-10 w-10 text-primary" />
          </motion.div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Kryptex</h2>
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
            Sign in to pick up where you left off.
          </p>
        </motion.div>
      </div>

      {/* Right panel — Auth content (width follows content) */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 sm:px-6 lg:w-1/2">
        {/* Mobile-only brand header */}
        <motion.div
          className="mb-8 flex items-center gap-3 lg:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight">Kryptex</p>
            <p className="text-xs text-muted-foreground">Secure vault</p>
          </div>
        </motion.div>

        {/* Auth card — items-start so inner blocks shrink-wrap (no stretch to hero width) */}
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex w-fit max-w-full flex-col items-start"
        >
          <div className="glass-border w-fit max-w-full">
            <div className="glass-card-elevated w-fit max-w-full p-6 sm:p-8">
              {children}
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
