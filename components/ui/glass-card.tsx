import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
  glow?: boolean;
  children: React.ReactNode;
}

export function GlassCard({
  variant = "default",
  glow = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variant === "default" && "glass-card",
        variant === "elevated" && "glass-card-elevated",
        variant === "interactive" &&
          "glass-card cursor-pointer hover:bg-[oklch(0.19_0.02_250_/_0.7)] hover:border-[oklch(1_0_0_/_0.1)] hover:shadow-lg",
        glow && "glow-ring-subtle",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4 flex flex-col gap-1 sm:mb-5", className)} {...props}>
      {children}
    </div>
  );
}

export function GlassCardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-base font-semibold tracking-tight text-foreground sm:text-lg",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function GlassCardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-muted-foreground sm:text-sm", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function GlassCardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}
