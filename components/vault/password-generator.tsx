"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  RefreshCw,
  Check,
  Dices,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* Mock character set — visual only, no real crypto here */
const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generateMockPassword(
  length: number,
  options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }
): string {
  let charset = "";
  if (options.uppercase) charset += CHARS.uppercase;
  if (options.lowercase) charset += CHARS.lowercase;
  if (options.numbers) charset += CHARS.numbers;
  if (options.symbols) charset += CHARS.symbols;
  if (!charset) charset = CHARS.lowercase;

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }
  return result;
}

function getStrength(length: number, optionCount: number) {
  const score = Math.min(100, (length / 64) * 50 + optionCount * 12.5);
  if (score >= 80) return { label: "Very Strong", color: "text-[oklch(0.72_0.19_155)]", barColor: "bg-[oklch(0.72_0.19_155)]", percent: score };
  if (score >= 60) return { label: "Strong", color: "text-[oklch(0.72_0.14_230)]", barColor: "bg-[oklch(0.72_0.14_230)]", percent: score };
  if (score >= 40) return { label: "Fair", color: "text-[oklch(0.78_0.16_70)]", barColor: "bg-[oklch(0.78_0.16_70)]", percent: score };
  return { label: "Weak", color: "text-[oklch(0.60_0.20_25)]", barColor: "bg-[oklch(0.60_0.20_25)]", percent: score };
}

interface PasswordGeneratorProps {
  trigger?: React.ReactElement;
}

export function PasswordGenerator({ trigger }: PasswordGeneratorProps) {
  const [length, setLength] = useState(20);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState(() =>
    generateMockPassword(20, { uppercase: true, lowercase: true, numbers: true, symbols: true })
  );

  const optionCount = Object.values(options).filter(Boolean).length;
  const strength = getStrength(length, optionCount);

  const regenerate = useCallback(() => {
    setPassword(generateMockPassword(length, options));
    setCopied(false);
  }, [length, options]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          trigger ?? (
            <Button variant="outline" size="sm" className="gap-2" />
          )
        }
      >
        {!trigger && (
          <>
            <Dices className="h-3.5 w-3.5" />
            Generate password
          </>
        )}
      </DialogTrigger>

      <DialogContent className="glass-card-elevated border-border/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Dices className="h-5 w-5 text-primary" />
            Password Generator
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Generate a strong, random password for your vault items.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Generated password display */}
          <div className="space-y-2">
            <div className="relative overflow-hidden rounded-xl border border-border/30 bg-background/60 p-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={password}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="break-all font-mono text-base font-medium tracking-wide sm:text-lg"
                >
                  {password.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.015, duration: 0.1 }}
                      className={cn(
                        /[A-Z]/.test(char) && "text-primary",
                        /[0-9]/.test(char) && "text-[oklch(0.72_0.14_230)]",
                        /[^a-zA-Z0-9]/.test(char) && "text-[oklch(0.78_0.16_70)]"
                      )}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1.5 text-[oklch(0.72_0.19_155)]"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Copied!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1.5"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
              <Button
                onClick={regenerate}
                variant="default"
                size="sm"
                className="flex-1 gap-2"
              >
                <motion.div
                  whileTap={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </motion.div>
                Regenerate
              </Button>
            </div>
          </div>

          {/* Strength meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium">Strength</span>
              </div>
              <span className={cn("text-xs font-medium", strength.color)}>
                {strength.label}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
              <motion.div
                className={cn("h-full rounded-full", strength.barColor)}
                animate={{ width: `${strength.percent}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
              />
            </div>
          </div>

          {/* Length slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Length</Label>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {length}
              </span>
            </div>
            <Slider
              value={[length]}
              onValueChange={(val) => {
                const v = Array.isArray(val) ? val[0] : val;
                setLength(v);
                setPassword(generateMockPassword(v, options));
              }}
              min={8}
              max={128}
              step={1}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/50">
              <span>8</span>
              <span>64</span>
              <span>128</span>
            </div>
          </div>

          {/* Character options */}
          <div className="space-y-3">
            <Label className="text-sm">Character types</Label>
            {(
              [
                { key: "uppercase", label: "Uppercase (A-Z)" },
                { key: "lowercase", label: "Lowercase (a-z)" },
                { key: "numbers", label: "Numbers (0-9)" },
                { key: "symbols", label: "Symbols (!@#$)" },
              ] as const
            ).map((opt) => (
              <div
                key={opt.key}
                className="flex items-center justify-between rounded-lg border border-border/15 bg-muted/10 px-3 py-2.5"
              >
                <span className="text-xs font-medium">{opt.label}</span>
                <Switch
                  checked={options[opt.key]}
                  onCheckedChange={(checked) => {
                    const next = { ...options, [opt.key]: checked };
                    setOptions(next);
                    setPassword(generateMockPassword(length, next));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
