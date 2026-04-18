"use client";

import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

/** Monolith palette: monochrome + soft cool accent for marketing CTAs only */
export const monolithAccent = {
  bg: "bg-[#c8cee8]",
  bgHover: "hover:bg-[#d8def8]",
  text: "text-neutral-950",
  line: "border-l-[#8b93b8]",
  glow: "from-[#8b93b8]/40",
} as const;

export function MonolithGridBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="absolute top-0 right-0 h-[min(80vh,720px)] w-[min(100%,720px)] max-w-[90vw] translate-x-[20%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)]" />
    </div>
  );
}

type MonolithHeaderVariant = "landing" | "auth";

export function MonolithHeader({ variant = "landing" }: { variant?: MonolithHeaderVariant }) {
  return (
    <header className="relative z-20 border-b border-white/[0.06]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/landing"
          className="text-sm font-semibold tracking-[0.2em] text-white no-underline sm:text-base"
        >
          Kryptex
        </Link>
        <nav className="flex items-center gap-8 sm:gap-10">
          <Show when="signed-in">
            <Link
              href="/vault"
              className="hidden text-xs font-medium uppercase tracking-wider text-white/60 no-underline transition-colors hover:text-white sm:inline"
            >
              Vault
            </Link>
            <UserButton
              appearance={{
                variables: {
                  colorPrimary: "#ffffff",
                  colorText: "#ffffff",
                  colorBackground: "#0a0a0a",
                  colorTextSecondary: "rgba(255,255,255,0.55)",
                },
                elements: {
                  avatarBox: "size-8 ring-1 ring-white/10",
                },
              }}
            />
          </Show>
          {variant === "landing" ? (
            <Show when="signed-out">
              <Link
                href="/login"
                className="text-xs font-medium uppercase tracking-wider text-white/55 no-underline transition-colors hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/login?tab=sign-up"
                className={cn(
                  "rounded px-4 py-2 text-xs font-semibold uppercase tracking-wider no-underline transition-colors",
                  monolithAccent.bg,
                  monolithAccent.bgHover,
                  monolithAccent.text
                )}
              >
                Join
              </Link>
            </Show>
          ) : (
            <Show when="signed-out">
              <Link
                href="/landing"
                className="text-xs font-medium uppercase tracking-wider text-white/55 no-underline transition-colors hover:text-white"
              >
                Home
              </Link>
            </Show>
          )}
        </nav>
      </div>
    </header>
  );
}
