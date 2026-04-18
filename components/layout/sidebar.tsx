"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { KeyRound, LockKeyhole } from "lucide-react";
import { AUTH_CONTROL_RADIUS } from "@/lib/clerk-form-appearance";
import { cn } from "@/lib/utils";

const links = [{ href: "/vault", label: "Passwords", icon: KeyRound }];

export function VaultSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center gap-3 px-1">
        <div
          className={cn(
            "relative flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03]",
            AUTH_CONTROL_RADIUS
          )}
        >
          <KeyRound className="h-4 w-4 text-white/80" strokeWidth={1.25} />
          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-neutral-950 bg-white/90" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-white">
            Kryptex
          </p>
          <p className="truncate text-[11px] text-white/45">Signed in</p>
        </div>
      </div>

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
                "relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200",
                AUTH_CONTROL_RADIUS,
                active
                  ? "text-white"
                  : "text-white/45 hover:bg-white/[0.04] hover:text-white/90"
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className={cn(
                    "absolute inset-0 border border-white/[0.12] bg-white/[0.06]",
                    AUTH_CONTROL_RADIUS
                  )}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              <Icon
                className={cn(
                  "relative z-10 h-4 w-4 shrink-0",
                  active ? "text-white" : "text-white/50"
                )}
                strokeWidth={1.25}
              />
              <span className="relative z-10 truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/[0.06] pt-3">
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/45 transition-colors hover:bg-white/[0.04] hover:text-white/80",
            AUTH_CONTROL_RADIUS
          )}
        >
          <LockKeyhole className="h-4 w-4 shrink-0" strokeWidth={1.25} />
          <span className="truncate">Lock vault</span>
        </button>
      </div>
    </div>
  );
}
