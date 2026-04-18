"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  trend?: { direction: "up" | "down" | "neutral"; label: string };
  delay?: number;
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  delay = 0,
  className,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "group glass-card p-4 transition-all duration-300 hover:glass-card-elevated sm:p-5",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/15 group-hover:shadow-[0_0_15px_-3px_oklch(0.65_0.25_270_/_0.2)]">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mb-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        {value}
      </p>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {trend && (
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
              trend.direction === "up" &&
                "bg-[oklch(0.72_0.19_155_/_0.1)] text-[oklch(0.72_0.19_155)]",
              trend.direction === "down" &&
                "bg-[oklch(0.60_0.20_25_/_0.1)] text-[oklch(0.60_0.20_25)]",
              trend.direction === "neutral" &&
                "bg-muted text-muted-foreground"
            )}
          >
            {trend.direction === "up" && "↑"}
            {trend.direction === "down" && "↓"}
            {trend.direction === "neutral" && "→"}
            {trend.label}
          </span>
        </div>
      )}
    </motion.div>
  );
}
