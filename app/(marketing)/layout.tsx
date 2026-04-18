import type { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full max-w-[100%] overflow-x-hidden bg-black text-white antialiased selection:bg-white/20 selection:text-white">
      {children}
    </div>
  );
}
