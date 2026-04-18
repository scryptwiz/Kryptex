"use client";

import { motion } from "framer-motion";
import {
  Copy,
  Download,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const blocks = ["KRYPT", "EX9F", "A4Z7", "L0CK", "SAFE", "N0DE", "8VXP", "QR2W"];

export default function RecoveryKeyOnboardingPage() {
  return (
    <div className="space-y-7">
      {/* Progress stepper */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
              ✓
            </span>
            <span className="text-xs text-muted-foreground">
              Master Password
            </span>
          </div>
          <div className="h-px flex-1 bg-primary/30" />
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              2
            </span>
            <span className="text-xs font-medium text-foreground">
              Recovery Key
            </span>
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
            initial={{ width: "50%" }}
            animate={{ width: "100%" }}
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
          Secure your recovery key
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This is your last-resort way back into the vault if you ever forget
          your master password. Store it somewhere offline and safe.
        </p>
      </motion.header>

      {/* Warning banner */}
      <motion.div
        className="flex items-start gap-3 rounded-xl border border-[oklch(0.78_0.16_70_/_0.3)] bg-[oklch(0.78_0.16_70_/_0.06)] p-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.78_0.16_70)]" />
        <p className="text-xs leading-relaxed text-[oklch(0.78_0.16_70)]">
          This key will only be shown once. It is never stored in plaintext.
          Write it down or save it in a secure offline location now.
        </p>
      </motion.div>

      {/* Recovery key display */}
      <motion.section
        className="space-y-3 rounded-2xl border border-border/40 bg-muted/20 p-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">Recovery key (example only)</span>
          <span className="text-[10px]">Displayed once · never stored</span>
        </div>

        {/* Key blocks grid */}
        <div className="flex flex-wrap gap-2">
          {blocks.map((block, index) => (
            <motion.div
              key={block}
              className="inline-flex items-center justify-center rounded-lg border border-border/40 bg-background/60 px-3 py-2 font-mono text-sm font-medium tracking-[0.2em] text-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5 + index * 0.06,
                duration: 0.3,
                type: "spring",
                stiffness: 200,
              }}
            >
              {block}
            </motion.div>
          ))}
        </div>

        {/* Copy + Download actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Copy className="h-3.5 w-3.5" />
            Copy key
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Download className="h-3.5 w-3.5" />
            Download
          </Button>
        </div>
      </motion.section>

      {/* Confirmation checkboxes */}
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox id="stored" className="mt-0.5" />
          <span className="text-xs leading-relaxed text-muted-foreground">
            I have written this recovery key down or stored it in a secure,
            offline location.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox id="understand" className="mt-0.5" />
          <span className="text-xs leading-relaxed text-muted-foreground">
            I understand that Kryptex cannot restore this key or reset my vault
            if I lose both my master password and recovery key.
          </span>
        </label>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        <Button variant="ghost" className="gap-2 sm:w-auto">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Button>
        <Button className="w-full gap-2 sm:w-auto">
          Finish and open vault
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
