"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { VaultSidebar } from "@/components/layout/sidebar";
import { VaultTopNav } from "@/components/layout/top-nav";

export default function VaultLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell sidebar={<VaultSidebar />} topbar={<VaultTopNav />}>
      {children}
    </AppShell>
  );
}

