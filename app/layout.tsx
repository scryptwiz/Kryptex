import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import { dark } from "@clerk/ui/themes";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kryptex",
  description: "A calm place for your passwords and important keys.",
  keywords: ["password manager", "passwords", "vault", "privacy", "security"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ClerkProvider
          ui={ui}
          afterSignOutUrl="/landing"
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: "hsl(250, 80%, 65%)",
              colorBackground: "hsl(222, 47%, 8%)",
              colorInput: "hsl(222, 35%, 11%)",
              colorForeground: "hsl(210, 40%, 93%)",
              borderRadius: "0.75rem",
            },
          }}
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
