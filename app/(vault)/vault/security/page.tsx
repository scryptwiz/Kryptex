"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Smartphone,
  AlertTriangle,
  GlobeLock,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiles = [
  {
    icon: ShieldCheck,
    title: "Password health",
    body: "86% of your passwords meet security standards.",
    stats: [
      { label: "Strong", value: 76, color: "bg-[oklch(0.72_0.19_155)]" },
      { label: "Medium", value: 38, color: "bg-[oklch(0.78_0.16_70)]" },
      { label: "Weak", value: 3, color: "bg-[oklch(0.60_0.20_25)]" },
    ],
    accent: "text-[oklch(0.72_0.19_155)] bg-[oklch(0.72_0.19_155_/_0.1)]",
  },
  {
    icon: GlobeLock,
    title: "Data breach monitoring",
    body: "No known breaches detected for your credentials.",
    stats: [],
    statusGood: true,
    accent: "text-[oklch(0.72_0.14_230)] bg-[oklch(0.72_0.14_230_/_0.1)]",
  },
  {
    icon: Smartphone,
    title: "Active sessions",
    body: "2 active sessions across your devices.",
    sessions: [
      { device: "Chrome · macOS", location: "Lagos, NG", current: true },
      {
        device: "Safari · iPhone",
        location: "Lagos, NG",
        current: false,
      },
    ],
    accent: "text-primary bg-primary/10",
  },
  {
    icon: AlertTriangle,
    title: "High-risk items",
    body: "3 items flagged due to age, reuse, or missing MFA.",
    flagCount: 3,
    accent: "text-[oklch(0.78_0.16_70)] bg-[oklch(0.78_0.16_70_/_0.1)]",
  },
];

export default function SecurityCenterPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader
        title="Security center"
        description="A dedicated hub for vault health, breach monitoring, and session posture."
      />

      {/* Health score hero */}
      <motion.div
        className="glass-card-elevated p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
          {/* Score ring */}
          <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="oklch(0.20 0.02 250)"
                strokeWidth="7"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="oklch(0.72 0.19 155)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 54}
                initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 54 * (1 - 0.78),
                }}
                transition={{
                  delay: 0.4,
                  duration: 1.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </svg>
            <div className="text-center">
              <motion.p
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                78
              </motion.p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Health Score
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Good overall health
              </h2>
              <p className="text-sm text-muted-foreground">
                Your vault security posture is solid. Address the 3 flagged
                items to improve your score.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:justify-start">
              <span className="flex items-center gap-1.5 text-[oklch(0.72_0.19_155)]">
                <TrendingUp className="h-3 w-3" />
                +5 from last week
              </span>
              <span className="text-muted-foreground/60">
                128 items analyzed
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Breakdown cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {tiles.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.06, duration: 0.35 }}
            >
              <GlassCard variant="interactive" className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl",
                        tile.accent
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight">
                        {tile.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {tile.body}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                </div>

                {/* Password health bars */}
                {tile.stats && tile.stats.length > 0 && (
                  <div className="space-y-2">
                    {tile.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center gap-3"
                      >
                        <span className="w-14 text-[11px] text-muted-foreground">
                          {stat.label}
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted/30">
                          <motion.div
                            className={cn("h-full rounded-full", stat.color)}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(stat.value / 128) * 100}%`,
                            }}
                            transition={{
                              delay: 0.5 + index * 0.1,
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                        <span className="w-6 text-right text-[11px] font-medium">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Breach status */}
                {tile.statusGood && (
                  <div className="flex items-center gap-2 rounded-lg bg-[oklch(0.72_0.19_155_/_0.06)] px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-[oklch(0.72_0.19_155)]" />
                    <span className="text-xs font-medium text-[oklch(0.72_0.19_155)]">
                      No breaches detected
                    </span>
                  </div>
                )}

                {/* Sessions */}
                {tile.sessions && (
                  <div className="space-y-2">
                    {tile.sessions.map((s) => (
                      <div
                        key={s.device}
                        className="flex items-center justify-between rounded-lg bg-muted/20 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full",
                              s.current
                                ? "bg-[oklch(0.72_0.19_155)]"
                                : "bg-muted-foreground/40"
                            )}
                          />
                          <span className="text-xs">{s.device}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground">
                            {s.location}
                          </span>
                          {s.current && (
                            <span className="rounded-full bg-[oklch(0.72_0.19_155_/_0.1)] px-1.5 py-0.5 text-[9px] font-medium text-[oklch(0.72_0.19_155)]">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* High risk count */}
                {tile.flagCount && (
                  <div className="flex items-center justify-between rounded-lg bg-[oklch(0.78_0.16_70_/_0.06)] px-3 py-2">
                    <span className="text-xs text-[oklch(0.78_0.16_70)]">
                      {tile.flagCount} items need attention
                    </span>
                    <Button
                      variant="ghost"
                      size="xs"
                      className="text-[oklch(0.78_0.16_70)] hover:text-[oklch(0.78_0.16_70)]"
                    >
                      Review
                    </Button>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Recommendations */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
      >
        <h3 className="mb-3 text-sm font-semibold tracking-tight">
          Recommendations
        </h3>
        <div className="space-y-2">
          {[
            "Change 12 reused passwords to unique ones",
            "Update 3 passwords that are older than 6 months",
            "Enable MFA on accounts where available",
          ].map((rec, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-border/20 bg-muted/10 px-3 py-2.5"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                {i + 1}
              </span>
              <p className="text-xs text-muted-foreground">{rec}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
