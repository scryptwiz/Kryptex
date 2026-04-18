"use client";

import { motion } from "framer-motion";
import {
  LogIn,
  Eye,
  ShieldOff,
  Plus,
  Trash2,
  Edit,
  Download,
  Filter,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const events = [
  {
    action: "Vault unlocked",
    detail: "Web · Chrome on macOS",
    time: "2026-04-16 · 14:23",
    ip: "Nigeria · masked IP",
    icon: LogIn,
    type: "success" as const,
  },
  {
    action: "Item viewed",
    detail: "Password · Cloud provider",
    time: "2026-04-16 · 14:18",
    ip: "Nigeria · masked IP",
    icon: Eye,
    type: "info" as const,
  },
  {
    action: "Failed unlock attempt",
    detail: "Incorrect master password",
    time: "2026-04-16 · 14:10",
    ip: "Unknown device",
    icon: ShieldOff,
    type: "danger" as const,
  },
  {
    action: "Item created",
    detail: "Password · Bank Web Portal",
    time: "2026-04-16 · 12:45",
    ip: "Nigeria · masked IP",
    icon: Plus,
    type: "info" as const,
  },
  {
    action: "Item updated",
    detail: "Password · Personal Gmail",
    time: "2026-04-15 · 22:10",
    ip: "Nigeria · masked IP",
    icon: Edit,
    type: "info" as const,
  },
  {
    action: "Item deleted",
    detail: "Note · Old API keys",
    time: "2026-04-15 · 18:33",
    ip: "Nigeria · masked IP",
    icon: Trash2,
    type: "warning" as const,
  },
  {
    action: "Vault unlocked",
    detail: "Web · Safari on iPhone",
    time: "2026-04-15 · 16:00",
    ip: "Nigeria · masked IP",
    icon: LogIn,
    type: "success" as const,
  },
  {
    action: "Failed unlock attempt",
    detail: "Rate limit approaching",
    time: "2026-04-14 · 09:14",
    ip: "Unknown · masked IP",
    icon: ShieldOff,
    type: "danger" as const,
  },
];

const timeFilters = ["Last 24h", "7 days", "30 days", "Custom"];
const typeFilters = ["All", "Unlock", "View", "Create", "Delete", "Failed"];

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

export default function ActivityLogPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader
        title="Activity log"
        description="A chronological view of important actions taken in and around your vault."
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </PageHeader>

      {/* Filters */}
      <motion.div
        className="glass-card space-y-3 p-3 sm:p-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Time filters */}
          <div className="flex flex-wrap gap-1.5">
            {timeFilters.map((filter, i) => (
              <button
                key={filter}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  i === 0
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "bg-white/[0.04] text-muted-foreground border border-transparent hover:bg-white/[0.06] hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-2">
            <Filter className="h-3 w-3 text-muted-foreground/50" />
            <div className="flex flex-wrap gap-1">
              {typeFilters.map((filter, i) => (
                <button
                  key={filter}
                  className={cn(
                    "rounded-md px-2 py-1 text-[10px] font-medium transition-all duration-200",
                    i === 0
                      ? "bg-white/[0.08] text-foreground"
                      : "text-muted-foreground/60 hover:bg-white/[0.04] hover:text-muted-foreground"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="glass-card overflow-hidden"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
      >
        <div className="divide-y divide-border/10">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.action + event.time}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.04, duration: 0.3 }}
                className="group relative flex items-start gap-4 px-4 py-4 transition-colors hover:bg-white/[0.02] sm:items-center"
              >
                {/* Timeline dot and line */}
                <div className="relative flex flex-col items-center">
                  <span
                    className={cn(
                      "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      iconBg[event.type]
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {/* Connecting line */}
                  {index < events.length - 1 && (
                    <div className="absolute left-1/2 top-[40px] h-full w-px -translate-x-1/2 bg-border/20" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{event.action}</p>
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          dotColor[event.type]
                        )}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {event.detail}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-0.5 text-[11px] text-muted-foreground/60 sm:items-end">
                    <span>{event.time}</span>
                    <span>{event.ip}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load more */}
        <div className="border-t border-border/10 p-4 text-center">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Load more events
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
