import { ReactNode } from "react";

interface CardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur-sm sm:p-5">
      <header className="mb-4 flex flex-col gap-1 sm:mb-5">
        <h2 className="text-base font-semibold tracking-tight sm:text-lg">
          {title}
        </h2>
        {description ? (
          <p className="text-xs text-muted-foreground sm:text-sm">
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

