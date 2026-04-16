import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AppShellProps {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, topbar, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-background to-slate-950/80 text-foreground">
      <aside className="hidden w-64 border-r border-border/60 bg-slate-950/40 px-4 py-6 lg:block">
        {sidebar}
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="border-b border-border/60 bg-slate-950/60 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          {topbar}
        </header>
        <motion.main
          className="page-container"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

