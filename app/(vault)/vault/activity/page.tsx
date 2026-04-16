"use client";

import { motion } from "framer-motion";

const events = [
  {
    action: "Vault unlocked",
    detail: "Web · Chrome on macOS",
    time: "2026-04-16 · 14:23",
    ip: "Nigeria · masked IP",
  },
  {
    action: "Item viewed",
    detail: "Password · Cloud provider",
    time: "2026-04-16 · 14:18",
    ip: "Nigeria · masked IP",
  },
  {
    action: "Failed unlock attempt",
    detail: "Incorrect master password",
    time: "2026-04-16 · 14:10",
    ip: "Unknown device",
  },
];

export default function ActivityLogPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Activity</h1>
          <p className="page-description">
            A chronological view of important actions taken in and around your
            vault.
          </p>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-border/70 bg-card/80 p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button className="inline-flex rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              Last 24 hours
            </button>
            <button className="inline-flex rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
              7 days
            </button>
            <button className="inline-flex rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Custom
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Real audit entries will come from the server once logging is wired
            up.
          </p>
        </div>

        <div className="divide-y divide-border/70 text-sm">
          {events.map((event, index) => (
            <motion.div
              key={event.action + event.time}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.18 }}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{event.action}</p>
                <p className="text-xs text-muted-foreground">{event.detail}</p>
              </div>
              <div className="flex flex-col items-start gap-1 text-xs text-muted-foreground sm:items-end">
                <span>{event.time}</span>
                <span>{event.ip}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

