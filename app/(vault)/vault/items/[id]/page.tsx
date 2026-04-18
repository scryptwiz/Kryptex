"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Edit,
  Trash2,
  MoreHorizontal,
  KeyRound,
  Globe,
  User,
  Lock,
  Calendar,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/ui/page-header";
import { SecurityBadge } from "@/components/ui/security-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { useState } from "react";
import Link from "next/link";

export default function VaultItemDetailPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Breadcrumb back button */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/vault/items"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to items
        </Link>
      </motion.div>

      <PageHeader
        title="Personal Gmail"
        description="View and manage credentials for this vault item."
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-[oklch(0.60_0.20_25)] border-[oklch(0.60_0.20_25_/_0.2)] hover:bg-[oklch(0.60_0.20_25_/_0.08)]"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(280px,1fr)]">
        {/* Main credentials panel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <GlassCard className="p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Credentials
                </h2>
                <p className="text-xs text-muted-foreground">
                  Encrypted fields — decrypted in-browser only
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <FieldRow
                icon={KeyRound}
                label="Name"
                value="Personal Gmail"
              />

              {/* Username */}
              <FieldRow
                icon={User}
                label="Username / Email"
                value="kelvin@gmail.com"
                copyable
              />

              {/* Password */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Password
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={
                      showPassword ? "S3cur3P@ssw0rd!Kx" : "••••••••••••••••"
                    }
                    readOnly
                    className="bg-white/[0.04] font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Reveal password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Copy password">
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Strength indicator */}
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/40">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[oklch(0.72_0.19_155)] to-[oklch(0.72_0.14_230)]" />
                  </div>
                  <span className="text-[10px] font-medium text-[oklch(0.72_0.19_155)]">
                    Strong
                  </span>
                </div>
              </div>

              {/* URL */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  Website
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    value="https://mail.google.com"
                    readOnly
                    className="bg-white/[0.04]"
                  />
                  <Button variant="outline" size="icon" aria-label="Open URL">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <Separator className="bg-border/20" />

              {/* Notes */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Notes (encrypted client-side)
                </Label>
                <div className="rounded-xl border border-dashed border-border/30 bg-white/[0.02] p-4">
                  <p className="text-xs leading-relaxed text-muted-foreground/70">
                    Personal Google account. 2FA via authenticator app. Recovery
                    codes stored separately in the &quot;Google Recovery&quot;
                    item.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Metadata sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="space-y-4"
        >
          {/* Metadata card */}
          <GlassCard className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold tracking-tight">
                Metadata
              </h3>
            </div>

            <dl className="space-y-3 text-xs">
              <MetaRow label="Item type">
                <span className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  <KeyRound className="h-2.5 w-2.5" />
                  Password
                </span>
              </MetaRow>
              <MetaRow label="Last used" icon={Clock}>
                Today · 14:23
              </MetaRow>
              <MetaRow label="Last updated" icon={Edit}>
                2 days ago
              </MetaRow>
              <MetaRow label="Created" icon={Calendar}>
                Mar 6, 2026
              </MetaRow>
            </dl>
          </GlassCard>

          {/* Encryption info */}
          <GlassCard className="p-5">
            <h3 className="mb-3 text-sm font-semibold tracking-tight">
              Encryption
            </h3>
            <div className="flex flex-wrap gap-2">
              <SecurityBadge type="aes" />
              <SecurityBadge type="e2ee" />
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/60">
              This item is encrypted with AES-256-GCM using your vault key
              derived from your master password via Argon2id.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

/* Helper components */
function FieldRow({
  icon: Icon,
  label,
  value,
  copyable = false,
}: {
  icon: typeof KeyRound;
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Input value={value} readOnly className="bg-white/[0.04]" />
        {copyable && (
          <Button variant="outline" size="icon" aria-label={`Copy ${label}`}>
            <Copy className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

function MetaRow({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: typeof Clock;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="flex items-center gap-1.5 text-muted-foreground">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </dt>
      <dd className="text-foreground/80">{children}</dd>
    </div>
  );
}
