"use client";

import { Button } from "@/components/ui/button";

const blocks = ["KRYPT", "EX-9F", "A4Z7", "L0CK", "SAFE", "NODE"];

export default function RecoveryKeyOnboardingPage() {
  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          Step 2 of 2
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Secure your recovery key
        </h1>
        <p className="text-sm leading-relaxed text-slate-300">
          This is your last‑resort way back into the vault if you ever forget
          your master password. Store it somewhere offline and safe.
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Recovery key (example only)</span>
          <span>Displayed once · never stored in plaintext</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {blocks.map((b) => (
            <div
              key={b}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm font-mono tracking-[0.18em] text-slate-100"
            >
              {b}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Real recovery keys will be longer and more random when we connect the
          crypto layer.
        </p>
      </section>

      <section className="space-y-3 text-xs text-slate-300">
        <label className="flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded border border-slate-600 bg-slate-950/60" />
          <span>
            I have written this recovery key down or stored it in a secure,
            offline location.
          </span>
        </label>
        <label className="flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded border border-slate-600 bg-slate-950/60" />
          <span>
            I understand that Kryptex cannot restore this key or reset my vault
            if I lose both my master password and recovery key.
          </span>
        </label>
      </section>

      <footer className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" className="w-full sm:w-auto">
          Back
        </Button>
        <Button className="w-full sm:w-auto">Finish and open vault</Button>
      </footer>
    </div>
  );
}

