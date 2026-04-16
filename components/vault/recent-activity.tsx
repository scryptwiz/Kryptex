import { motion } from "framer-motion";
import { Activity, LogIn, ShieldOff } from "lucide-react";

const rows = [
  {
    icon: LogIn,
    label: "Vault unlocked",
    meta: "Chrome · Lagos, NG",
    time: "Just now",
  },
  {
    icon: Activity,
    label: "3 items viewed",
    meta: "Desktop · Nigeria",
    time: "2 min ago",
  },
  {
    icon: ShieldOff,
    label: "Failed unlock attempt",
    meta: "Chrome · Unknown device",
    time: "8 min ago",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-2">
      {rows.map((row, index) => {
        const Icon = row.icon;
        return (
          <motion.div
            key={row.label + row.time}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.04, duration: 0.18 }}
            className="flex items-center justify-between rounded-xl border border-border/60 bg-slate-950/30 px-3 py-2.5 text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-accent">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-medium">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.meta}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{row.time}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

