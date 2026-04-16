import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={
          "flex h-9 w-full rounded-lg border border-border/70 bg-background px-3 text-sm text-foreground shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground/80 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 " +
          (className ?? "")
        }
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

