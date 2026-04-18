"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, EyeOff, KeyRound, Network, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MonolithGridBackdrop,
  MonolithHeader,
  monolithAccent,
} from "@/components/marketing/monolith-chrome";

function HeroKeyVisual() {
  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[240px] sm:max-w-[300px] lg:mx-0 lg:max-w-[min(380px,38vw)]"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="absolute inset-0 rounded-lg border border-white/[0.08] bg-neutral-950" />
      <div
        className="absolute inset-[1px] rounded-[7px] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.14)_0%,transparent_55%)]"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <KeyRound
          className="size-[42%] text-neutral-300 drop-shadow-[0_0_24px_rgba(255,255,255,0.25)]"
          strokeWidth={1}
        />
      </div>
      <div className="absolute -bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
}

function PrivacyDiagram() {
  return (
    <div className="relative flex aspect-[4/3] w-full max-w-md items-center justify-center rounded-lg border border-white/[0.08] bg-neutral-950/80 p-8 lg:max-w-none">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden
      />
      <div className="relative flex size-40 items-center justify-center sm:size-48">
        <div className="absolute rotate-45 border border-white/15 p-10 sm:p-12">
          <div className="size-16 border border-white/25 sm:size-20" />
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full max-w-[100%] overflow-x-hidden">
      <MonolithGridBackdrop />
      <div className="relative z-10 flex min-h-screen flex-col">
        <MonolithHeader variant="landing" />

        <main className="flex-1">
          {/* Hero — fills viewport below header */}
          <section
            className={cn(
              "relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center border-b border-white/[0.06]",
              "px-4 py-10 sm:min-h-[calc(100svh-4rem)] sm:px-6 sm:py-12 lg:px-8 lg:py-16"
            )}
          >
            <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 xl:gap-20">
              <div className="max-w-xl text-center lg:text-left">
                <motion.h1
                  className="font-heading text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                >
                  The monolith{" "}
                  <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                    vault
                  </span>
                </motion.h1>
                <motion.p
                  className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/55 lg:mx-0 lg:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                >
                  Structural integrity for your digital life. Encryption terminates
                  at the edge — your device — so credentials and recovery material
                  never exist as plaintext on our systems.
                </motion.p>
                <motion.div
                  className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap lg:justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15 }}
                >
                  <Link
                    href="/login?tab=sign-up"
                    className={cn(
                      "inline-flex min-h-11 items-center justify-center px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] no-underline transition-colors sm:text-sm",
                      monolithAccent.bg,
                      monolithAccent.bgHover,
                      monolithAccent.text
                    )}
                  >
                    Initialize vault
                  </Link>
                  <Link
                    href="#specs"
                    className="inline-flex min-h-11 items-center gap-2 border border-white/20 bg-transparent px-6 py-3 text-xs font-medium uppercase tracking-wider text-white/80 no-underline transition-colors hover:border-white/35 hover:text-white sm:text-sm"
                  >
                    View specs
                    <ArrowRight className="size-3.5 opacity-70" />
                  </Link>
                </motion.div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <HeroKeyVisual />
              </div>
            </div>
          </section>

          {/* Absolute Privacy */}
          <section className="border-b border-white/[0.06] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <h2
                  className={cn(
                    "border-l-2 pl-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl",
                    monolithAccent.line
                  )}
                >
                  Absolute privacy
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-white/55 sm:text-base">
                  Zero-knowledge architecture means we cannot decrypt your vault
                  — by design. What you store is opaque ciphertext tied to your
                  identity, not readable by operators or databases alone.
                </p>
                <ul className="mt-10 space-y-6">
                  <li className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded border border-white/10 bg-white/[0.03]">
                      <Shield className="size-5 text-white/70" strokeWidth={1.25} />
                    </span>
                    <div>
                      <p className="font-medium text-white">Zero-knowledge proofs</p>
                      <p className="mt-1 text-sm text-white/50">
                        Server-side logic never requires plaintext secrets.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded border border-white/10 bg-white/[0.03]">
                      <EyeOff className="size-5 text-white/70" strokeWidth={1.25} />
                    </span>
                    <div>
                      <p className="font-medium text-white">Blind infrastructure</p>
                      <p className="mt-1 text-sm text-white/50">
                        Storage and APIs handle blobs and metadata — not your keys.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <PrivacyDiagram />
            </div>
          </section>

          {/* Architectural Security */}
          <section
            id="specs"
            className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
          >
            <div className="mx-auto max-w-6xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 sm:text-xs">
                Technical specifications // Layer 1 integration
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Architectural security
              </h2>

              <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-2">
                <motion.article
                  className="group relative flex min-h-[280px] flex-col justify-between rounded-lg border border-white/[0.08] bg-neutral-950/50 p-6 sm:min-h-[300px] sm:p-8 md:row-span-2"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45 }}
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                      Core engine
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                      Obsidian core protocol
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
                      AES-256-GCM in the browser, Argon2id for key derivation, and
                      authenticated additional data binding every ciphertext to its
                      owner.
                    </p>
                  </div>
                  <div className="mt-8 space-y-2">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={cn(
                          "h-full w-[72%] rounded-full bg-gradient-to-r",
                          monolithAccent.glow,
                          "to-white/30"
                        )}
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-white/35">
                      Integrity stream active
                    </p>
                  </div>
                </motion.article>

                <motion.article
                  className="rounded-lg border border-white/[0.08] bg-neutral-950/50 p-6 sm:p-7"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                >
                  <div className="flex size-10 items-center justify-center rounded border border-white/10">
                    <Network className="size-5 text-white/65" strokeWidth={1.25} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    Decentralized storage
                  </h3>
                  <p className="mt-2 text-sm text-white/50">
                    Encrypted shards across resilient infrastructure — no single
                    plaintext vault file.
                  </p>
                </motion.article>

                <motion.article
                  className="rounded-lg border border-white/[0.08] bg-neutral-950/50 p-6 sm:p-7"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                >
                  <div className="flex size-10 items-center justify-center rounded border border-white/10">
                    <KeyRound className="size-5 text-white/65" strokeWidth={1.25} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    Immutable access
                  </h3>
                  <p className="mt-2 text-sm text-white/50">
                    Session-verified APIs and append-only audit trails for
                    accountability.
                  </p>
                </motion.article>

                <motion.article
                  className="flex flex-col justify-between rounded-lg border border-white/[0.08] bg-neutral-950/50 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8 md:col-span-2"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: 0.12 }}
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                      Infrastructure
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                      Global monolith network
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm text-white/50">
                      Edge-aligned auth, strict transport, and policy-bound data
                      planes — one coherent security posture end to end.
                    </p>
                  </div>
                  <div className="mt-6 flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 sm:mt-0">
                    <ArrowRight className="size-5 text-white/50" />
                  </div>
                </motion.article>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-20 border-t border-white/[0.06] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 sm:text-[11px]">
              © {new Date().getFullYear()} The monolith. All rights reserved.
            </p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-white/40 sm:text-[11px]">
              <Link href="#" className="no-underline transition-colors hover:text-white/70">
                Terms of service
              </Link>
              <Link href="#" className="no-underline transition-colors hover:text-white/70">
                Privacy policy
              </Link>
              <Link href="#" className="no-underline transition-colors hover:text-white/70">
                Legal
              </Link>
              <Link href="#" className="no-underline transition-colors hover:text-white/70">
                Security audit
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
