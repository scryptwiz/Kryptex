"use client";

import { ShieldCheck, Smartphone, AlertTriangle, GlobeLock } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/vault/card";

const tiles = [
  {
    icon: ShieldCheck,
    title: "Password health",
    body: "Placeholder widget summarising strong vs weak vs reused passwords.",
  },
  {
    icon: GlobeLock,
    title: "Data breach monitoring",
    body: "Space reserved for future breach checks and exposure alerts.",
  },
  {
    icon: Smartphone,
    title: "Session security",
    body: "Overview of active sessions and recent sign‑ins across devices.",
  },
  {
    icon: AlertTriangle,
    title: "High‑risk items",
    body: "Cards for items flagged due to age, reuse, or missing MFA.",
  },
];

export default function SecurityCenterPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Security center</h1>
          <p className="page-description">
            A dedicated hub for vault health, breach monitoring, and session
            posture.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tiles.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              <Card title={tile.title} description={tile.body}>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>Visual scaffolding only · no checks yet</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

