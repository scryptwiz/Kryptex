"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  KeyRound,
  Activity,
  Settings2,
  LayoutDashboard,
  LockKeyhole,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const links = [
  { href: "/vault", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vault/items", label: "Items", icon: KeyRound },
  { href: "/vault/security", label: "Security", icon: Shield },
  { href: "/vault/activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Open navigation"
          />
        }
      >
        <Menu className="h-4 w-4" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 border-r border-border/20 bg-[oklch(0.12_0.02_250)] p-0"
      >
        <SheetHeader className="border-b border-border/20 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <Shield className="h-4 w-4 text-primary" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[oklch(0.12_0.02_250)] bg-[oklch(0.72_0.19_155)]" />
            </div>
            <div>
              <SheetTitle className="text-sm font-semibold tracking-tight text-foreground">
                Kryptex
              </SheetTitle>
              <p className="text-[11px] text-muted-foreground">
                Vault unlocked
              </p>
            </div>
          </div>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {links.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <SheetClose key={item.href} render={<Link href={item.href} />}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-primary/10 border border-primary/15 text-foreground"
                      : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active && "text-primary"
                    )}
                  />
                  {item.label}
                </div>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border/20 px-3 py-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-[oklch(0.60_0.20_25_/_0.08)] hover:text-[oklch(0.60_0.20_25)]">
            <LockKeyhole className="h-4 w-4 shrink-0" />
            Lock vault
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
