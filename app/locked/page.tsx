"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function LockedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/80 backdrop-blur-md sm:p-7">
        <div className="mb-5 flex flex-col items-center gap-3 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-primary">
            <Lock className="h-5 w-5" />
          </span>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight text-slate-50">
              Vault locked
            </h1>
            <p className="text-xs text-slate-400 sm:text-sm">
              For your security, the in‑memory vault key was wiped after
              inactivity or manual lock. Enter your master password to continue.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="unlock-password">Master password</Label>
            <Input
              id="unlock-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter to unlock vault"
            />
          </div>
          <Button className="mt-1 w-full">Unlock vault</Button>
          <button className="w-full text-xs text-slate-400 underline-offset-2 hover:underline">
            I forgot my master password
          </button>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        Unlock attempts, successful and failed, will be logged in the audit log
        once wired up.
      </p>
    </div>
  );
}

