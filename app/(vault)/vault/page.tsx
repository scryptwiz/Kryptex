"use client";

import { motion } from "framer-motion";
import { KeyRound, Sparkles, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PasswordGeneratorPanel } from "@/components/vault/password-generator";
import { monolithAccent } from "@/components/marketing/monolith-chrome";
import { AUTH_CARD_RADIUS, AUTH_CONTROL_RADIUS } from "@/lib/clerk-form-appearance";
import { cn } from "@/lib/utils";

const tips = [
  {
    icon: Sparkles,
    title: "Tune it",
    body: "Length and character types update the preview as you go.",
  },
  {
    icon: ClipboardList,
    title: "Copy once",
    body: "Grab the value and paste it where you need it—then move on.",
  },
];

export default function VaultDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 text-white">
      <PageHeader
        title="Passwords"
        description="Create a strong password, then copy it when you need it."
      />

      <motion.div
        className={cn(
          "glass-card overflow-hidden p-5 shadow-none sm:p-6",
          AUTH_CARD_RADIUS
        )}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <section
          className={cn(
            "relative border border-white/[0.08] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent px-5 py-5 sm:px-6",
            AUTH_CONTROL_RADIUS
          )}
        >
          <div className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
            <div
              className={cn(
                "relative mx-auto flex size-24 items-center justify-center border border-white/[0.1] bg-neutral-950/80 sm:size-28 lg:mx-0",
                AUTH_CONTROL_RADIUS
              )}
            >
              <div
                className="absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
                aria-hidden
              />
              <KeyRound className="relative z-[1] size-[38%] text-white/35" strokeWidth={1} />
            </div>

            <div>
              <p
                className={cn(
                  "border-l-2 pl-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45",
                  monolithAccent.line
                )}
              >
                Quick tips
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                Shape the password you want
              </h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {tips.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className={cn(
                        "flex items-start gap-3 border border-white/[0.08] bg-white/[0.03] px-3 py-3",
                        AUTH_CONTROL_RADIUS
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-8 shrink-0 items-center justify-center border border-white/10 bg-white/[0.05]",
                          AUTH_CONTROL_RADIUS
                        )}
                      >
                        <Icon className="size-3.5 text-white/65" strokeWidth={1.25} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white/90">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-white/45">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

        <div className="sm:px-1">
          <PasswordGeneratorPanel />
        </div>
      </motion.div>
    </div>
  );
}
