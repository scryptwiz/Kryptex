"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/vault/card";
import { VaultStats } from "@/components/vault/vault-stats";
import { RecentActivity } from "@/components/vault/recent-activity";

export default function VaultDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Vault overview</h1>
          <p className="page-description">
            A high-level view of your encrypted items and recent security
            activity.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">Lock vault</Button>
          <Button>New item</Button>
        </div>
      </div>

      <VaultStats />

      <div className="grid gap-4 lg:grid-cols-[2fr,1.3fr]">
        <Card title="Recent activity" description="A quick snapshot of what’s been happening in your vault.">
          <RecentActivity />
        </Card>
        <Card
          title="Security snapshot"
          description="Placeholder insights into password hygiene, MFA status, and sessions."
        >
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Detailed security insights will appear here once we hook up real
              data. For now, this layout showcases how health summaries will
              look.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

