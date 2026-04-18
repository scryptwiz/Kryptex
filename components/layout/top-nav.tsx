"use client";

import { UserButton } from "@clerk/nextjs";
import { MobileNav } from "./mobile-nav";

export function VaultTopNav() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <MobileNav />
      </div>

      <div className="flex items-center gap-2">
        <UserButton
          appearance={{
            variables: {
              colorPrimary: "#ffffff",
              colorForeground: "#ffffff",
              colorBackground: "#0a0a0a",
              colorMutedForeground: "rgba(255,255,255,0.55)",
            },
            elements: {
              avatarBox: "h-8 w-8 ring-1 ring-white/10",
            },
          }}
        />
      </div>
    </div>
  );
}
