"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function LockedPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-auth-gradient px-4">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[120px]" />

      <div className="absolute inset-0 overflow-hidden opacity-[0.12]" aria-hidden>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-1 rounded-full bg-primary/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Lock card */}
      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="glass-border">
          <div className="glass-card-elevated p-6 sm:p-8">
            {/* Lock icon */}
            <div className="mb-6 flex flex-col items-center gap-4 text-center">
              <motion.div
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Lock className="h-7 w-7 text-primary" />
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 oklch(0.65 0.25 270 / 0)",
                      "0 0 20px 4px oklch(0.65 0.25 270 / 0.15)",
                      "0 0 0 0 oklch(0.65 0.25 270 / 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <div className="space-y-1.5">
                <h1 className="text-xl font-bold tracking-tight">
                  Vault locked
                </h1>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  You were signed out after a period of inactivity. Enter your
                  master password to continue.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unlock-password">Master password</Label>
                <div className="relative">
                  <Input
                    id="unlock-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter to unlock vault"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button className="w-full gap-2">
                <Shield className="h-4 w-4" />
                Unlock vault
              </Button>

              <div className="flex items-center justify-center gap-1.5">
                <AlertCircle className="h-3 w-3 text-muted-foreground/60" />
                <button className="text-xs text-muted-foreground transition-colors hover:text-primary">
                  I forgot my master password
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
    </div>
  );
}
