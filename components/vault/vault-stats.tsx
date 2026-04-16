import { motion } from "framer-motion";
import { ShieldCheck, KeyRound, Clock } from "lucide-react";
import { Card } from "./card";

const items = [
  {
    icon: ShieldCheck,
    label: "Items secured",
    value: "128",
    hint: "All encrypted end-to-end in your browser.",
  },
  {
    icon: KeyRound,
    label: "Reused passwords",
    value: "12",
    hint: "Placeholder metric for future health checks.",
  },
  {
    icon: Clock,
    label: "Last unlock",
    value: "3m ago",
    hint: "Shows when you last decrypted your vault.",
  },
];

export function VaultStats() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            <Card title={item.label} description={item.hint}>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold tracking-tight">
                  {item.value}
                </p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

