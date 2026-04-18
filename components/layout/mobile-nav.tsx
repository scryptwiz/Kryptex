"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { KeyRound, LockKeyhole, Menu } from "lucide-react";
import { AUTH_CONTROL_RADIUS } from "@/lib/clerk-form-appearance";
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

const links = [{ href: "/vault", label: "Passwords", icon: KeyRound }];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white/50 hover:bg-white/[0.06] hover:text-white lg:hidden"
            aria-label="Open navigation"
          />
        }
      >
        <Menu className="h-4 w-4" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 border-r border-white/[0.08] bg-neutral-950 p-0"
      >
        <SheetHeader className="border-b border-white/[0.06] px-5 py-5">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "relative flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03]",
                AUTH_CONTROL_RADIUS
              )}
            >
              <KeyRound className="h-4 w-4 text-white/80" strokeWidth={1.25} />
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-neutral-950 bg-white/90" />
            </div>
            <div>
              <SheetTitle className="text-sm font-semibold tracking-tight text-white">
                Kryptex
              </SheetTitle>
              <p className="text-[11px] text-white/45">Signed in</p>
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
                    "flex items-center gap-3 px-3 py-3 text-sm font-medium transition-all duration-200",
                    AUTH_CONTROL_RADIUS,
                    active
                      ? "border border-white/[0.12] bg-white/[0.06] text-white"
                      : "text-white/45 hover:bg-white/[0.04] hover:text-white/90"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active ? "text-white" : "text-white/50"
                    )}
                    strokeWidth={1.25}
                  />
                  {item.label}
                </div>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/[0.06] px-3 py-4">
          <button
            type="button"
            className={cn(
              "flex w-full items-center gap-3 px-3 py-3 text-sm font-medium text-white/45 transition-colors hover:bg-white/[0.04] hover:text-white/80",
              AUTH_CONTROL_RADIUS
            )}
          >
            <LockKeyhole className="h-4 w-4 shrink-0" strokeWidth={1.25} />
            Lock vault
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
