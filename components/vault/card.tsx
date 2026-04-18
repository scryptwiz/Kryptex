import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface VaultCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function VaultCard({
  title,
  description,
  icon: Icon,
  children,
  footer,
  className,
  ...props
}: VaultCardProps) {
  return (
    <section
      className={cn("glass-card overflow-hidden", className)}
      {...props}
    >
      <div className="p-4 sm:p-5">
        <header className="mb-4 flex items-start gap-3 sm:mb-5">
          {Icon && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
          )}
          <div className="min-w-0 flex-1 space-y-0.5">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              {title}
            </h2>
            {description && (
              <p className="text-xs text-muted-foreground sm:text-sm">
                {description}
              </p>
            )}
          </div>
        </header>
        {children}
      </div>
      {footer && (
        <div className="border-t border-border/20 px-4 py-3 sm:px-5">
          {footer}
        </div>
      )}
    </section>
  );
}
