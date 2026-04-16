import { UserButton } from "@clerk/nextjs";
import { Menu, Moon, SunMedium } from "lucide-react";
import { Button } from "../ui/button";

export function VaultTopNav() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-border/60 bg-slate-900/60 text-muted-foreground hover:bg-slate-800/80 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">
            Vault
          </span>
          <span className="text-base font-semibold tracking-tight">
            Welcome back
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          <SunMedium className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </Button>
        <div className="h-8 w-px bg-border/60" />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

