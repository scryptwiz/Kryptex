import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
  title: "Kryptex — Zero-Knowledge Password Vault",
  description:
    "Kryptex keeps your passwords, recovery keys, and secrets encrypted entirely in your browser. The server never sees your master password or decrypted data.",
  keywords: [
    "password manager",
    "zero knowledge",
    "encrypted vault",
    "end-to-end encryption",
    "security",
  ],
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
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ClerkProvider
          afterSignOutUrl="/landing"
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "hsl(250, 80%, 65%)",
              colorBackground: "hsl(222, 47%, 8%)",
              colorInputBackground: "hsl(222, 35%, 11%)",
              colorText: "hsl(210, 40%, 93%)",
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
