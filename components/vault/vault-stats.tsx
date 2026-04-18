"use client";

import { ShieldCheck, KeyRound, Clock } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

const items = [
  {
    icon: ShieldCheck,
    label: "Items secured",
    value: "128",
    hint: "All encrypted end-to-end in your browser.",
    trend: { direction: "up" as const, label: "12 this week" },
  },
  {
    icon: KeyRound,
    label: "Reused passwords",
    value: "12",
    hint: "Passwords used across multiple services.",
    trend: { direction: "down" as const, label: "3 fewer" },
  },
  {
    icon: Clock,
    label: "Last unlock",
    value: "3m ago",
    hint: "Time since you last decrypted your vault.",
    trend: { direction: "neutral" as const, label: "Active session" },
  },
];

export function VaultStats() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <StatCard
          key={item.label}
          icon={item.icon}
          label={item.label}
          value={item.value}
          hint={item.hint}
          trend={item.trend}
          delay={index * 0.06}
        />
      ))}
    </div>
  );
}
