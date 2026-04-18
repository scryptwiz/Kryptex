"use client";

import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Monitor,
  Clock,
  Lock,
  Shield,
  Key,
  Download,
  Trash2,
  Smartphone,
  AlertTriangle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const themes = [
  { icon: Sun, label: "Light", active: false },
  { icon: Moon, label: "Dark", active: true },
  { icon: Monitor, label: "System", active: false },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Tune appearance, security preferences, and advanced options."
      />

      <Tabs defaultValue="general" className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <TabsList className="glass-card mb-6 inline-flex h-auto gap-1 p-1.5">
            {[
              { value: "general", label: "General" },
              { value: "security", label: "Security" },
              { value: "account", label: "Account" },
              { value: "advanced", label: "Advanced" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-lg px-4 py-2 text-xs font-medium data-[state=active]:bg-primary/15 data-[state=active]:text-primary"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        {/* ─── General Tab ─── */}
        <TabsContent value="general" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <div className="mb-5 space-y-1">
                <h2 className="text-base font-semibold tracking-tight">
                  Appearance
                </h2>
                <p className="text-xs text-muted-foreground">
                  Choose your preferred color scheme.
                </p>
              </div>

              {/* Theme selector */}
              <div className="flex gap-3">
                {themes.map((theme) => {
                  const Icon = theme.icon;
                  return (
                    <button
                      key={theme.label}
                      className={cn(
                        "flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200",
                        theme.active
                          ? "border-primary/30 bg-primary/5 glow-ring-subtle"
                          : "border-border/20 bg-white/[0.02] hover:border-border/40 hover:bg-white/[0.04]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          theme.active
                            ? "bg-primary/15 text-primary"
                            : "bg-muted/30 text-muted-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          theme.active
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {theme.label}
                      </span>
                      {theme.active && (
                        <span className="text-[10px] text-primary">Active</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <div className="mb-5 space-y-1">
                <h2 className="text-base font-semibold tracking-tight">
                  Display preferences
                </h2>
                <p className="text-xs text-muted-foreground">
                  Customize how vault content is displayed.
                </p>
              </div>

              <div className="space-y-4">
                <SettingRow
                  label="Default view"
                  description="Choose list or grid layout for vault items."
                >
                  <div className="flex gap-1 rounded-lg bg-muted/30 p-0.5">
                    <button className="rounded-md bg-primary/15 px-3 py-1.5 text-[11px] font-medium text-primary">
                      List
                    </button>
                    <button className="rounded-md px-3 py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground">
                      Grid
                    </button>
                  </div>
                </SettingRow>

                <Separator className="bg-border/15" />

                <SettingRow
                  label="Compact mode"
                  description="Reduce spacing for denser information display."
                >
                  <Switch />
                </SettingRow>
              </div>
            </GlassCard>
          </motion.div>
        </TabsContent>

        {/* ─── Security Tab ─── */}
        <TabsContent value="security" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <div className="mb-5 space-y-1">
                <h2 className="text-base font-semibold tracking-tight">
                  Auto-lock
                </h2>
                <p className="text-xs text-muted-foreground">
                  Control when the vault automatically locks itself.
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">
                      Inactivity timeout
                    </Label>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      5 min
                    </span>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    min={1}
                    max={60}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground/50">
                    <span>1 min</span>
                    <span>30 min</span>
                    <span>60 min</span>
                  </div>
                </div>

                <Separator className="bg-border/15" />

                <SettingRow
                  label="Lock on tab switch"
                  description="Automatically lock when you switch to another tab."
                >
                  <Switch defaultChecked />
                </SettingRow>

                <Separator className="bg-border/15" />

                <SettingRow
                  label="Clear clipboard after copy"
                  description="Auto-clear copied passwords after 30 seconds."
                >
                  <Switch defaultChecked />
                </SettingRow>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <div className="mb-5 space-y-1">
                <h2 className="text-base font-semibold tracking-tight">
                  Master password
                </h2>
                <p className="text-xs text-muted-foreground">
                  Change your master password. Requires re-authentication.
                </p>
              </div>

              <Button variant="outline" className="gap-2">
                <Lock className="h-3.5 w-3.5" />
                Change master password
              </Button>
            </GlassCard>
          </motion.div>
        </TabsContent>

        {/* ─── Account Tab ─── */}
        <TabsContent value="account" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <div className="mb-5 space-y-1">
                <h2 className="text-base font-semibold tracking-tight">
                  Profile
                </h2>
                <p className="text-xs text-muted-foreground">
                  Managed by Clerk. Update your profile in the Clerk dashboard.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-border/20 bg-muted/10 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  K
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Kelvin</p>
                  <p className="truncate text-xs text-muted-foreground">
                    kelvin@example.com
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[oklch(0.72_0.19_155_/_0.1)] px-2 py-0.5">
                  <Shield className="h-2.5 w-2.5 text-[oklch(0.72_0.19_155)]" />
                  <span className="text-[10px] font-medium text-[oklch(0.72_0.19_155)]">
                    MFA Enabled
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <div className="mb-5 space-y-1">
                <h2 className="text-base font-semibold tracking-tight">
                  Active sessions
                </h2>
                <p className="text-xs text-muted-foreground">
                  Manage devices currently signed in to your account.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  {
                    device: "Chrome · macOS",
                    location: "Lagos, NG",
                    current: true,
                    lastActive: "Now",
                  },
                  {
                    device: "Safari · iPhone",
                    location: "Lagos, NG",
                    current: false,
                    lastActive: "2 hours ago",
                  },
                ].map((session) => (
                  <div
                    key={session.device}
                    className="flex items-center justify-between rounded-xl border border-border/20 bg-muted/10 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {session.device}
                          </span>
                          {session.current && (
                            <span className="rounded-full bg-[oklch(0.72_0.19_155_/_0.1)] px-1.5 py-0.5 text-[9px] font-medium text-[oklch(0.72_0.19_155)]">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {session.location} · {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-[oklch(0.60_0.20_25)] hover:text-[oklch(0.60_0.20_25)]"
                      >
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </TabsContent>

        {/* ─── Advanced Tab ─── */}
        <TabsContent value="advanced" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <div className="mb-5 space-y-1">
                <h2 className="text-base font-semibold tracking-tight">
                  Recovery & export
                </h2>
                <p className="text-xs text-muted-foreground">
                  Access your recovery key or export encrypted vault data.
                </p>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-3.5 w-3.5" />
                    View recovery key
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    Re-auth required
                  </span>
                </Button>
                <Button variant="outline" className="w-full justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Download className="h-3.5 w-3.5" />
                    Export encrypted vault
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    Ciphertext only
                  </span>
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Danger zone */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            <div className="rounded-2xl border border-[oklch(0.60_0.20_25_/_0.2)] bg-[oklch(0.60_0.20_25_/_0.03)] p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-[oklch(0.60_0.20_25)]" />
                <div className="space-y-0.5">
                  <h2 className="text-base font-semibold tracking-tight text-[oklch(0.60_0.20_25)]">
                    Danger zone
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Irreversible actions. Proceed with extreme caution.
                  </p>
                </div>
              </div>

              <Button
                variant="destructive"
                className="gap-2"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete account and vault
              </Button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* Helper component */
function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="min-w-0 space-y-0.5">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
