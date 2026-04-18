"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Plus,
  Download,
  Wand2,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { VaultCard } from "@/components/vault/card";
import { VaultStats } from "@/components/vault/vault-stats";
import { RecentActivity } from "@/components/vault/recent-activity";

const quickActions = [
  { icon: Plus, label: "New item", primary: true },
  { icon: Wand2, label: "Generate" },
  { icon: Download, label: "Import" },
  { icon: Lock, label: "Lock vault", danger: true },
];

export default function VaultDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <PageHeader
        title="Vault overview"
        description="A high-level view of your encrypted items and recent security activity."
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Lock className="h-3.5 w-3.5" />
          Lock vault
        </Button>
        <Button size="sm" className="gap-2">
          <Plus className="h-3.5 w-3.5" />
          New item
        </Button>
      </PageHeader>

      {/* Greeting banner */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">
              Good evening 👋
            </h2>
            <p className="text-sm text-muted-foreground">
              Your vault is <span className="font-medium text-[oklch(0.72_0.19_155)]">unlocked</span> and all 128 items are securely encrypted.
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant={action.primary ? "default" : "outline"}
                  size="sm"
                  className={`gap-2 ${action.danger ? "text-[oklch(0.60_0.20_25)] hover:bg-[oklch(0.60_0.20_25_/_0.1)] hover:text-[oklch(0.60_0.20_25)] border-[oklch(0.60_0.20_25_/_0.2)]" : ""}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <VaultStats />

      {/* Two column: Activity + Security Health */}
      <div className="grid gap-4 lg:grid-cols-[2fr,1.3fr]">
        <VaultCard
          title="Recent activity"
          description="A snapshot of what's been happening in your vault."
          icon={Activity}
        >
          <RecentActivity />
        </VaultCard>

        <VaultCard
          title="Security health"
          description="Vault hygiene and password posture."
          icon={ShieldCheck}
        >
          {/* Health score ring */}
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative flex h-28 w-28 items-center justify-center">
              {/* Background ring */}
              <svg className="absolute inset-0 h-full w-full -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="oklch(0.20 0.02 250)"
                  strokeWidth="6"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="oklch(0.72 0.19 155)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 48}
                  initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 48 * (1 - 0.78),
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              </svg>
              <div className="text-center">
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  78
                </motion.p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Score
                </p>
              </div>
            </div>

            <div className="w-full space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span className="text-muted-foreground">Strong passwords</span>
                <span className="font-medium text-[oklch(0.72_0.19_155)]">
                  86%
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span className="text-muted-foreground">Reused</span>
                <span className="font-medium text-[oklch(0.78_0.16_70)]">
                  12
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span className="text-muted-foreground">Weak</span>
                <span className="font-medium text-[oklch(0.60_0.20_25)]">
                  3
                </span>
              </div>
            </div>
          </div>
        </VaultCard>
      </div>
    </div>
  );
}
