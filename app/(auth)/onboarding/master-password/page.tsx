"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function MasterPasswordOnboardingPage() {
  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          Step 1 of 2
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Create your master password
        </h1>
        <p className="text-sm leading-relaxed text-slate-300">
          This is the only password you need to remember. It never leaves your
          device and cannot be recovered if lost.
        </p>
      </header>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="master-password">Master password</Label>
          <Input
            id="master-password"
            type="password"
            autoComplete="new-password"
            placeholder="Use a long, unique phrase"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <Input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
          />
        </div>

        <div className="mt-3 space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300">
          <p className="font-medium text-slate-100">Strength preview</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500" />
          </div>
          <p>
            This is a visual indicator only for now. We’ll calculate real
            strength once logic is connected.
          </p>
        </div>
      </div>

      <footer className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-400">
          Kryptex never sends your master password or decrypted vault contents
          to the server.
        </p>
        <Button className="w-full sm:w-auto">Continue to recovery key</Button>
      </footer>
    </div>
  );
}

