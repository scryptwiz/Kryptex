"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield,
  KeyRound,
  Activity,
  Settings2,
  LayoutDashboard,
  LockKeyhole,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/vault", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vault/items", label: "Items", icon: KeyRound },
  { href: "/vault/security", label: "Security", icon: Shield },
  { href: "/vault/activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export function VaultSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Brand */}
      <div className="flex items-center gap-3 px-1">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
          <Shield className="h-4 w-4 text-primary" />
          {/* Status dot */}
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[oklch(0.12_0.02_250)] bg-[oklch(0.72_0.19_155)]" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">
            Kryptex
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            Vault unlocked
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        {links.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              )}
            >
              {/* Active indicator — animated sliding pill */}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/15"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              <Icon className={cn("relative z-10 h-4 w-4 shrink-0", active && "text-primary")} />
              <span className="relative z-10 truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom quick action */}
      <div className="space-y-2 border-t border-border/20 pt-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-[oklch(0.60_0.20_25_/_0.08)] hover:text-[oklch(0.60_0.20_25)]">
          <LockKeyhole className="h-4 w-4 shrink-0" />
          <span className="truncate">Lock vault</span>
        </button>
      </div>
    </div>
  );
}
