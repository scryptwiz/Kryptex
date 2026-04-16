"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const rows = [
  { name: "Personal Gmail", type: "Password", lastUsed: "Today", updated: "2 days ago" },
  { name: "Cloud provider", type: "Password", lastUsed: "Yesterday", updated: "5 days ago" },
  { name: "Seed phrase backup", type: "Recovery key", lastUsed: "—", updated: "1 month ago" },
  { name: "Bank web portal", type: "Password", lastUsed: "3 days ago", updated: "1 week ago" },
];

const tabs = ["All", "Passwords", "Notes", "Cards", "Recovery"];

export default function VaultItemsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Vault items</h1>
          <p className="page-description">
            Browse and filter your encrypted passwords, notes, cards, and recovery keys.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">Import</Button>
          <Button>New item</Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-2 sm:max-w-xs">
            <Input placeholder="Search by name or URL" />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Button variant="ghost" size="sm" className="rounded-full px-3">
              Filters
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full px-3">
              Sort
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={
                "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors " +
                (i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80")
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/80">
        <div className="grid grid-cols-12 gap-3 border-b border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground sm:px-4">
          <div className="col-span-5 sm:col-span-4">Item</div>
          <div className="col-span-3 hidden sm:block">Type</div>
          <div className="col-span-4 sm:col-span-3">Last used</div>
          <div className="col-span-3 hidden sm:block">Updated</div>
        </div>
        <div className="divide-y divide-border/60">
          {rows.map((row, index) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.18 }}
              className="grid grid-cols-12 gap-3 px-3 py-3 text-sm sm:px-4"
            >
              <div className="col-span-8 flex flex-col sm:col-span-4">
                <span className="font-medium">{row.name}</span>
                <span className="text-xs text-muted-foreground">
                  https://example.com
                </span>
              </div>
              <div className="col-span-4 text-xs text-muted-foreground sm:col-span-3 sm:block">
                <span className="inline-flex w-fit rounded-full bg-muted px-2 py-0.5 text-[11px]">
                  {row.type}
                </span>
              </div>
              <div className="col-span-6 text-xs text-muted-foreground sm:col-span-3">
                {row.lastUsed}
              </div>
              <div className="col-span-6 text-xs text-muted-foreground sm:col-span-2 sm:block">
                {row.updated}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

