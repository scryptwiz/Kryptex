"use client";

import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Download,
  Filter,
  ArrowUpDown,
  Globe,
  Copy,
  MoreHorizontal,
  KeyRound,
  CreditCard,
  StickyNote,
  Shield,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";

const rows = [
  {
    name: "Personal Gmail",
    username: "kelvin@gmail.com",
    url: "mail.google.com",
    type: "Password",
    typeIcon: KeyRound,
    lastUsed: "Today",
    updated: "2 days ago",
  },
  {
    name: "Cloud Provider (AWS)",
    username: "admin@company.io",
    url: "console.aws.amazon.com",
    type: "Password",
    typeIcon: KeyRound,
    lastUsed: "Yesterday",
    updated: "5 days ago",
  },
  {
    name: "Seed Phrase Backup",
    username: "—",
    url: "—",
    type: "Recovery",
    typeIcon: Shield,
    lastUsed: "—",
    updated: "1 month ago",
  },
  {
    name: "Bank Web Portal",
    username: "user_4829",
    url: "banking.example.com",
    type: "Password",
    typeIcon: KeyRound,
    lastUsed: "3 days ago",
    updated: "1 week ago",
  },
  {
    name: "Visa Business Card",
    username: "•••• 4242",
    url: "—",
    type: "Card",
    typeIcon: CreditCard,
    lastUsed: "Last week",
    updated: "2 weeks ago",
  },
  {
    name: "Production SSH Key",
    username: "deploy-key",
    url: "github.com",
    type: "Recovery",
    typeIcon: Shield,
    lastUsed: "2 weeks ago",
    updated: "3 months ago",
  },
];

const tabs = [
  { label: "All", count: 128 },
  { label: "Passwords", count: 89 },
  { label: "Notes", count: 14 },
  { label: "Cards", count: 8 },
  { label: "Recovery", count: 17 },
];

const typeColor: Record<string, string> = {
  Password:
    "bg-primary/10 text-primary border-primary/20",
  Recovery:
    "bg-[oklch(0.72_0.19_155_/_0.1)] text-[oklch(0.72_0.19_155)] border-[oklch(0.72_0.19_155_/_0.2)]",
  Card:
    "bg-[oklch(0.78_0.16_70_/_0.1)] text-[oklch(0.78_0.16_70)] border-[oklch(0.78_0.16_70_/_0.2)]",
  Note:
    "bg-[oklch(0.72_0.14_230_/_0.1)] text-[oklch(0.72_0.14_230)] border-[oklch(0.72_0.14_230_/_0.2)]",
};

export default function VaultItemsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader
        title="Vault items"
        description="Browse and filter your encrypted passwords, notes, cards, and recovery keys."
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-3.5 w-3.5" />
          Import
        </Button>
        <Button size="sm" className="gap-2">
          <Plus className="h-3.5 w-3.5" />
          New item
        </Button>
      </PageHeader>

      {/* Filter bar */}
      <motion.div
        className="glass-card space-y-3 p-3 sm:p-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        {/* Search + Sort/Filter */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, URL, or username..."
              className="bg-white/[0.04] pl-8 text-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
              <Filter className="h-3 w-3" />
              Filters
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
              <ArrowUpDown className="h-3 w-3" />
              Sort
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                i === 0
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "bg-white/[0.04] text-muted-foreground border border-transparent hover:bg-white/[0.06] hover:text-foreground"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px]",
                  i === 0
                    ? "bg-primary/20 text-primary"
                    : "bg-white/[0.06] text-muted-foreground/70"
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Items table */}
      <motion.div
        className="glass-card overflow-hidden"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
      >
        {/* Table header */}
        <div className="grid grid-cols-12 gap-3 border-b border-border/20 px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
          <div className="col-span-5 sm:col-span-4">Item</div>
          <div className="col-span-3 hidden sm:block">Type</div>
          <div className="col-span-4 sm:col-span-3">Last used</div>
          <div className="col-span-2 hidden sm:block text-right">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/10">
          {rows.map((row, index) => {
            const TypeIcon = row.typeIcon;
            return (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.04, duration: 0.3 }}
                className="group grid grid-cols-12 items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
              >
                {/* Name + URL */}
                <div className="col-span-8 flex items-center gap-3 sm:col-span-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-muted-foreground">
                    <Globe className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{row.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground/60">
                      {row.url}
                    </p>
                  </div>
                </div>

                {/* Type badge */}
                <div className="col-span-3 hidden sm:block">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium",
                      typeColor[row.type] || typeColor.Password
                    )}
                  >
                    <TypeIcon className="h-2.5 w-2.5" />
                    {row.type}
                  </span>
                </div>

                {/* Last used */}
                <div className="col-span-4 text-xs text-muted-foreground sm:col-span-3">
                  {row.lastUsed}
                </div>

                {/* Actions */}
                <div className="col-span-2 hidden justify-end gap-1 sm:flex">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
                    aria-label="Copy password"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
                    aria-label="Open URL"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
