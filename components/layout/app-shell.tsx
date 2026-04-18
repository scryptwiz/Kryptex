"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AppShellProps {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, topbar, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-kryptex-gradient text-foreground">
      {/* Sidebar — desktop */}
      <motion.aside
        className={cn(
          "relative hidden flex-col border-r border-border/30 bg-[oklch(0.12_0.02_250_/_0.8)] backdrop-blur-xl lg:flex",
          collapsed ? "w-[72px]" : "w-64"
        )}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex flex-1 flex-col overflow-y-auto px-3 py-5">
          {sidebar}
        </div>

        {/* Collapse toggle */}
        <div className="border-t border-border/20 p-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full text-muted-foreground hover:text-foreground"
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

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 border-b border-border/20 bg-[oklch(0.13_0.02_250_/_0.8)] px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
          {topbar}
        </header>

        {/* Page content with transitions */}
        <AnimatePresence mode="wait">
          <motion.main
            className="page-container"
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
