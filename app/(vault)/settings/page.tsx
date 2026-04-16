"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-description">
            Tune appearance, security preferences, and advanced export options.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-4 sm:p-5">
          <header className="space-y-1">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              Appearance
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Light or dark mode with calm blues and indigos.
            </p>
          </header>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/60 p-3">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">
                  Neutral light/dark toggle — theme switch wiring will come
                  later.
                </p>
              </div>
              <div className="flex gap-1">
                <button className="h-7 rounded-full bg-background px-3 text-xs font-medium text-foreground shadow-sm">
                  Light
                </button>
                <button className="h-7 rounded-full bg-slate-900 px-3 text-xs font-medium text-slate-100">
                  Dark
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-4 sm:p-5">
          <header className="space-y-1">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              Security & privacy
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Visual placeholders for inactivity timeout and lock behavior.
            </p>
          </header>
          <div className="space-y-3 text-sm">
            <div className="space-y-1.5">
              <Label htmlFor="timeout">Inactivity lock timeout (minutes)</Label>
              <Input id="timeout" type="number" min={1} max={60} value={5} readOnly />
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>
                The real value will be enforced client‑side, clearing in‑memory
                keys and locking the vault.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-4 sm:p-5">
          <header className="space-y-1">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              Recovery & export
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Flows for recovery and export will plug into secure APIs later.
            </p>
          </header>
          <div className="space-y-3 text-sm">
            <Button variant="outline" className="w-full justify-between">
              View recovery key
              <span className="text-xs text-muted-foreground">
                Requires re‑authentication
              </span>
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Export encrypted vault
              <span className="text-xs text-muted-foreground">
                Ciphertext only, no plaintext
              </span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

