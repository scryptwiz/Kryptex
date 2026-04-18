"use client";

import { motion } from "framer-motion";
import { LogIn, Eye, ShieldOff, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const rows = [
  {
    icon: LogIn,
    label: "Vault unlocked",
    meta: "Chrome · Lagos, NG",
    time: "Just now",
    type: "success" as const,
  },
  {
    icon: Eye,
    label: "3 items viewed",
    meta: "Desktop · Nigeria",
    time: "2 min ago",
    type: "info" as const,
  },
  {
    icon: ShieldOff,
    label: "Failed unlock attempt",
    meta: "Chrome · Unknown device",
    time: "8 min ago",
    type: "danger" as const,
  },
  {
    icon: Plus,
    label: "New item created",
    meta: "Password · Cloud Provider",
    time: "1 hour ago",
    type: "info" as const,
  },
];

const dotColor = {
  success: "bg-[oklch(0.72_0.19_155)]",
  danger: "bg-[oklch(0.60_0.20_25)]",
  info: "bg-[oklch(0.72_0.14_230)]",
  warning: "bg-[oklch(0.78_0.16_70)]",
};

const iconBg = {
  success: "bg-[oklch(0.72_0.19_155_/_0.1)] text-[oklch(0.72_0.19_155)]",
  danger: "bg-[oklch(0.60_0.20_25_/_0.1)] text-[oklch(0.60_0.20_25)]",
  info: "bg-[oklch(0.72_0.14_230_/_0.1)] text-[oklch(0.72_0.14_230)]",
  warning: "bg-[oklch(0.78_0.16_70_/_0.1)] text-[oklch(0.78_0.16_70)]",
};

export function RecentActivity() {
  return (
    <div className="space-y-1">
      {rows.map((row, index) => {
        const Icon = row.icon;
        return (
          <motion.div
            key={row.label + row.time}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
            className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.03]"
          >
            {/* Timeline line */}
            {index < rows.length - 1 && (
              <div className="absolute bottom-0 left-[26px] top-[40px] w-px bg-border/30" />
            )}

            {/* Icon with status dot */}
            <div className="relative shrink-0">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  iconBg[row.type]
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-[oklch(0.17_0.02_250)]",
                  dotColor[row.type]
                )}
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{row.label}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {row.meta}
                </p>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground/60">
                {row.time}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* View all link */}
      <div className="pt-2">
        <button className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5">
          View all activity
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
