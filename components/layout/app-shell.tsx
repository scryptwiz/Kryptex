"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MonolithGridBackdrop } from "@/components/marketing/monolith-chrome";

interface AppShellProps {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, topbar, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="vault-monolith-root relative flex min-h-screen w-full overflow-x-hidden bg-black text-foreground">
      <MonolithGridBackdrop className="z-0" />
      {/* Sidebar — desktop */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-white/[0.06] bg-neutral-950/85 backdrop-blur-xl lg:flex",
          collapsed ? "w-[72px]" : "w-64"
        )}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex flex-1 flex-col overflow-y-auto px-3 py-5">
          {sidebar}
        </div>

        <div className="border-t border-white/[0.06] p-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full text-white/45 hover:bg-white/[0.06] hover:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.aside>

      <div
        className={cn(
          "relative z-10 flex min-h-screen flex-1 flex-col transition-[margin] duration-300 ease-out",
          collapsed ? "lg:ml-[72px]" : "lg:ml-64"
        )}
      >
        <header className="absolute inset-x-0 top-10 z-20 border-0 bg-transparent px-0 py-0 backdrop-blur-0">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {topbar}
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.main
            className="page-container pt-16 sm:pt-16 lg:pt-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
