import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Lock, KeyRound, Activity, Settings2 } from "lucide-react";
import { Button } from "../ui/button";

const links = [
  { href: "/vault", label: "Dashboard", icon: Shield },
  { href: "/vault/items", label: "Items", icon: KeyRound },
  { href: "/vault/security", label: "Security", icon: Lock },
  { href: "/vault/activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export function VaultSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex items-center gap-2 px-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Shield className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">Kryptex</p>
          <p className="text-xs text-muted-foreground">Zero-knowledge vault</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Button
              key={item.href}
              asChild
              variant={active ? "default" : "ghost"}
              size="lg"
              className="justify-start rounded-xl px-3"
            >
              <Link href={item.href}>
                <Icon className="mr-3 h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}

