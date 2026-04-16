"use client";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Your passwords deserve a fortress, not a sticky note.
        </h1>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          Kryptex keeps passwords, recovery keys, and secrets encrypted entirely
          in your browser. The server never sees your master password or
          decrypted data.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>Sign in or create an account</span>
          <span>Clerk auth UI will render here</span>
        </div>
        <div className="h-28 rounded-xl border border-dashed border-slate-700 bg-slate-900/80" />
      </section>

      <section className="space-y-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[11px] text-slate-200">
            1
          </span>
          <p>
            Create an account and set a{" "}
            <span className="font-medium text-slate-100">
              master password
            </span>{" "}
            that never leaves your device.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[11px] text-slate-200">
            2
          </span>
          <p>
            Receive a{" "}
            <span className="font-medium text-slate-100">recovery key</span> as
            a last‑resort backup.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[11px] text-slate-200">
            3
          </span>
          <p>
            Unlock your{" "}
            <span className="font-medium text-slate-100">encrypted vault</span>{" "}
            and start saving secrets.
          </p>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          No plaintext secrets. No tracking. Just a focused, secure vault.
        </p>
        <Button size="sm" className="px-4 text-xs">
          Learn how Kryptex works
        </Button>
      </div>
    </div>
  );
}

