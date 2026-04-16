"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function VaultItemDetailPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Item details</h1>
          <p className="page-description">
            View and adjust the fields for a single vault item. Values are
            placeholders until wired to data.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">Edit</Button>
          <Button variant="ghost">More</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(260px,1fr)]">
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-4 sm:p-5"
        >
          <header className="mb-1 space-y-1">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              Credentials
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              The actual username, password, and URL fields live here.
            </p>
          </header>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="item-name">Name</Label>
              <Input id="item-name" value="Personal Gmail" readOnly />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="item-username">Username</Label>
              <Input id="item-username" value="you@example.com" readOnly />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="item-password">Password</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="item-password"
                  type="password"
                  value="••••••••••••••••"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  Reveal
                </Button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="item-url">Website</Label>
              <Input
                id="item-url"
                value="https://mail.google.com"
                readOnly
              />
            </div>
          </div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.2 }}
          className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-4 sm:p-5"
        >
          <header className="space-y-1">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              Metadata
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              High‑level info for quick auditing.
            </p>
          </header>
          <dl className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between gap-4">
              <dt>Item type</dt>
              <dd className="inline-flex rounded-full bg-muted px-2 py-0.5 text-[11px] text-foreground">
                Password
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt>Last used</dt>
              <dd>Today · 14:23</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt>Last updated</dt>
              <dd>2 days ago</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt>Created</dt>
              <dd>Mar 6, 2026</dd>
            </div>
          </dl>

          <div className="mt-4 space-y-2 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">
              Notes (encrypted client‑side)
            </p>
            <p className="rounded-xl border border-dashed border-border/80 bg-muted/60 p-3">
              Any additional context, backup codes, or security hints can live
              here once we add real storage.
            </p>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}

