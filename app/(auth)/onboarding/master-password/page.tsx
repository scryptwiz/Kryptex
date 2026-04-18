"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const requirements = [
  { label: "At least 12 characters", met: true },
  { label: "Contains uppercase letter", met: true },
  { label: "Contains number", met: false },
  { label: "Contains special character", met: false },
];

/* Placeholder strength - visual only */
const strengthPercent = 55;
const strengthLabel = "Fair";
const strengthColor =
  strengthPercent >= 80
    ? "from-[oklch(0.72_0.19_155)] to-[oklch(0.72_0.19_155)]"
    : strengthPercent >= 50
      ? "from-[oklch(0.78_0.16_70)] to-[oklch(0.72_0.14_230)]"
      : "from-[oklch(0.60_0.20_25)] to-[oklch(0.78_0.16_70)]";

export default function MasterPasswordOnboardingPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-7">
      {/* Progress stepper */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              1
            </span>
            <span className="text-xs font-medium text-foreground">
              Master Password
            </span>
          </div>
          <div className="h-px flex-1 bg-border/60" />
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-muted/40 text-[10px] font-medium text-muted-foreground">
              2
            </span>
            <span className="text-xs text-muted-foreground">Recovery Key</span>
          </div>
        </div>
        <motion.div
          className="h-1 overflow-hidden rounded-full bg-muted/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        className="space-y-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          Create your master password
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This is the only password you need to remember. It never leaves your
          device and cannot be recovered if lost.
        </p>
      </motion.header>

      {/* Form fields */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <div className="space-y-2">
          <Label htmlFor="master-password">Master password</Label>
          <div className="relative">
            <Input
              id="master-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Use a long, unique phrase"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Strength meter */}
      <motion.div
        className="space-y-3 rounded-xl border border-border/40 bg-muted/20 p-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Password strength</span>
          </div>
          <span className="text-xs font-medium text-[oklch(0.78_0.16_70)]">
            {strengthLabel}
          </span>
        </div>

        {/* Strength bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted/60">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${strengthColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${strengthPercent}%` }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              type: "spring",
              stiffness: 60,
            }}
          />
        </div>

        {/* Requirements checklist */}
        <div className="grid grid-cols-2 gap-2">
          {requirements.map((req, i) => (
            <motion.div
              key={req.label}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  req.met
                    ? "bg-[oklch(0.72_0.19_155_/_0.15)] text-[oklch(0.72_0.19_155)]"
                    : "bg-muted/60 text-muted-foreground/40"
                }`}
              >
                {req.met ? (
                  <Check className="h-2.5 w-2.5" />
                ) : (
                  <X className="h-2.5 w-2.5" />
                )}
              </span>
              <span
                className={`text-[11px] ${req.met ? "text-foreground/80" : "text-muted-foreground"}`}
              >
                {req.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <p className="text-[11px] text-muted-foreground/60">
          Kryptex never sends your master password to the server.
        </p>
        <Button className="w-full gap-2 sm:w-auto">
          Continue to recovery key
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </Button>
      </motion.footer>
    </div>
  );
}
