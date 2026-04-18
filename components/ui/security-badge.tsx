import { cn } from "@/lib/utils";
import { Shield, Lock, Fingerprint } from "lucide-react";

type BadgeType = "aes" | "e2ee" | "zero-knowledge";

interface SecurityBadgeProps {
  type: BadgeType;
  className?: string;
}

const badgeConfig: Record<
  BadgeType,
  { icon: typeof Shield; label: string; color: string }
> = {
  aes: {
    icon: Shield,
    label: "Protected",
    color: "text-[oklch(0.72_0.19_155)] bg-[oklch(0.72_0.19_155_/_0.1)]",
  },
  e2ee: {
    icon: Lock,
    label: "Locked down",
    color: "text-[oklch(0.72_0.14_230)] bg-[oklch(0.72_0.14_230_/_0.1)]",
  },
  "zero-knowledge": {
    icon: Fingerprint,
    label: "Yours only",
    color: "text-primary bg-primary/10",
  },
};

export function SecurityBadge({ type, className }: SecurityBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
        config.color,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
