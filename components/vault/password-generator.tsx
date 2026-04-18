"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  RefreshCw,
  Check,
  Shuffle,
  Lightbulb,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { monolithAccent } from "@/components/marketing/monolith-chrome";
import { AUTH_CONTROL_RADIUS } from "@/lib/clerk-form-appearance";
import { cn } from "@/lib/utils";

type PasswordMode = "random" | "memorable" | "pin";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

/** Short words for memorable mode (hyphenated). */
const MEMORABLE_WORDS = [
  "amber", "swift", "vault", "north", "pixel", "grain", "quiet", "silver",
  "signal", "orbit", "stone", "river", "cloud", "ember", "frost", "coral",
  "nebula", "prism", "monolith", "cipher", "harbor", "summit", "meadow",
  "crystal", "vector", "nova", "echo", "atlas", "solace", "vertex", "mirage",
  "fable", "quartz", "zenith", "anchor", "beacon", "compass", "drift",
  "falcon", "grove", "horizon", "ivory", "juniper", "kindle", "lumen",
  "marble", "nimbus", "oasis", "pulse", "quill", "ridge", "sable",
] as const;

function randomIndex(max: number): number {
  if (max <= 0) return 0;
  const limit = Math.floor(0x1_0000_0000 / max) * max;
  const buf = new Uint32Array(1);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0]!;
  } while (x >= limit);
  return x % max;
}

function generateRandomPassword(
  len: number,
  opts: { numbers: boolean; symbols: boolean }
): string {
  const length = Math.max(8, Math.min(128, Math.floor(len)));
  let charset =
    CHARS.uppercase + CHARS.lowercase;
  if (opts.numbers) charset += CHARS.numbers;
  if (opts.symbols) charset += CHARS.symbols;
  if (charset.length < 8) charset = CHARS.lowercase;

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[randomIndex(charset.length)]!;
  }
  return result;
}

function generateMemorable(wordCount: number): string {
  const n = Math.max(3, Math.min(8, Math.floor(wordCount)));
  const parts: string[] = [];
  for (let i = 0; i < n; i++) {
    parts.push(MEMORABLE_WORDS[randomIndex(MEMORABLE_WORDS.length)]!);
  }
  return parts.join("-");
}

function generatePin(digits: number): string {
  const n = Math.max(4, Math.min(12, Math.floor(digits)));
  let result = "";
  for (let i = 0; i < n; i++) {
    result += String(randomIndex(10));
  }
  return result;
}

function charClass(char: string, mode: PasswordMode) {
  if (mode === "pin") return "text-white/90";
  if (char === "-") return "text-white/40";
  if (/[A-Z]/.test(char)) return "text-white";
  if (/[a-z]/.test(char)) return "text-white/60";
  if (/[0-9]/.test(char)) return "text-[#9eb0d8]";
  return "text-white/85";
}

const LENGTH_DEBOUNCE_MS = 120;

/** ~0.5–1.6s total reveal depending on length; per-char delay clamped for feel */
function msPerCharForTyping(length: number): number {
  if (length <= 0) return 20;
  const targetTotal = Math.min(1600, 520 + length * 14);
  return Math.max(14, Math.min(42, Math.floor(targetTotal / length)));
}

function useTypewriterReveal(target: string) {
  const [visibleCount, setVisibleCount] = useState(0);
  /** Browser timer id (`window.setTimeout`); avoid `NodeJS.Timeout` from `setTimeout` typing */
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!target) {
      setVisibleCount(0);
      return;
    }

    setVisibleCount(0);
    const n = target.length;
    const step = msPerCharForTyping(n);
    let i = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      i += 1;
      if (i >= n) {
        setVisibleCount(n);
        timerRef.current = null;
        return;
      }
      setVisibleCount(i);
      timerRef.current = window.setTimeout(tick, step);
    };

    timerRef.current = window.setTimeout(tick, step);

    return () => {
      cancelled = true;
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [target]);

  const displayed = target.slice(0, visibleCount);
  const isTyping = target.length > 0 && visibleCount < target.length;
  return { displayed, isTyping };
}

const MODE_TABS: {
  id: PasswordMode;
  label: string;
  icon: typeof Shuffle;
}[] = [
  { id: "random", label: "Random", icon: Shuffle },
  { id: "memorable", label: "Memorable", icon: Lightbulb },
  { id: "pin", label: "PIN", icon: Hash },
];

function sectionHeading(text: string) {
  return (
    <h3 className="text-sm font-semibold tracking-tight text-white">{text}</h3>
  );
}

export function PasswordGeneratorPanel({ className }: { className?: string }) {
  const [mode, setMode] = useState<PasswordMode>("random");
  const [length, setLength] = useState(20);
  const [genLength, setGenLength] = useState(20);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [password, setPassword] = useState("");

  const { displayed: displayedPassword, isTyping } = useTypewriterReveal(password);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lengthBounds = (m: PasswordMode) =>
    m === "pin"
      ? { min: 4, max: 12 }
      : m === "memorable"
        ? { min: 3, max: 8 }
        : { min: 8, max: 128 };

  useEffect(() => {
    const { min, max } = lengthBounds(mode);
    setLength((prev) => Math.min(max, Math.max(min, prev)));
  }, [mode]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
      setGenLength(length);
    }, LENGTH_DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [length]);

  useEffect(() => {
    let next = "";
    if (mode === "random") {
      next = generateRandomPassword(genLength, { numbers, symbols });
    } else if (mode === "memorable") {
      next = generateMemorable(genLength);
    } else {
      next = generatePin(genLength);
    }
    setPassword(next);
  }, [mode, genLength, numbers, symbols, refreshKey]);

  const flushLengthDebounce = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setGenLength(length);
  }, [length]);

  const refresh = useCallback(() => {
    flushLengthDebounce();
    setRefreshKey((k) => k + 1);
    setCopied(false);
  }, [flushLengthDebounce]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const { min, max } = lengthBounds(mode);
  const lengthLabel =
    mode === "pin" ? "Digits" : mode === "memorable" ? "Words" : "Characters";

  return (
    <div className={cn("divide-y divide-white/[0.08]", className)}>
      {/* Choose password type */}
      <section className="space-y-3 pb-6">
        {sectionHeading("Choose password type")}
        <div
          className={cn(
            "flex w-full gap-1 border border-white/[0.1] bg-white/[0.04] p-1",
            AUTH_CONTROL_RADIUS
          )}
        >
          {MODE_TABS.map(({ id, label, icon: Icon }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all sm:text-[13px]",
                  AUTH_CONTROL_RADIUS,
                  active
                    ? "bg-white/[0.14] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                    : "text-white/45 hover:bg-white/[0.05] hover:text-white/75"
                )}
              >
                <Icon className="size-3.5 shrink-0 opacity-90" strokeWidth={1.75} />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Customize */}
      <section className="space-y-5 py-6">
        {sectionHeading("Customize your new password")}
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Label
              htmlFor="pwd-length-slider"
              className="shrink-0 text-sm font-medium text-white/70 sm:w-28"
            >
              {lengthLabel}
            </Label>
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Slider
                id="pwd-length-slider"
                value={[length]}
                onValueChange={(val) => {
                  const raw = Array.isArray(val) ? val[0] : val;
                  const v =
                    typeof raw === "number" && !Number.isNaN(raw)
                      ? Math.round(raw)
                      : min;
                  setLength(Math.min(max, Math.max(min, v)));
                }}
                min={min}
                max={max}
                step={1}
                className="min-w-0 flex-1 py-1"
              />
              <Input
                readOnly
                value={String(length)}
                className={cn(
                  "h-9 w-14 shrink-0 border-white/18 bg-white/[0.06] text-center text-sm font-semibold tabular-nums text-white",
                  AUTH_CONTROL_RADIUS
                )}
                aria-label={`${lengthLabel} value`}
              />
            </div>
          </div>

          {mode === "random" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className={cn(
                  "flex items-center justify-between border border-white/[0.1] bg-white/[0.03] px-3.5 py-3",
                  AUTH_CONTROL_RADIUS
                )}
              >
                <span className="text-sm font-medium text-white/80">Numbers</span>
                <Switch
                  checked={numbers}
                  onCheckedChange={(checked) => {
                    flushLengthDebounce();
                    setNumbers(checked);
                  }}
                />
              </div>
              <div
                className={cn(
                  "flex items-center justify-between border border-white/[0.1] bg-white/[0.03] px-3.5 py-3",
                  AUTH_CONTROL_RADIUS
                )}
              >
                <span className="text-sm font-medium text-white/80">Symbols</span>
                <Switch
                  checked={symbols}
                  onCheckedChange={(checked) => {
                    flushLengthDebounce();
                    setSymbols(checked);
                  }}
                />
              </div>
            </div>
          )}

          {mode === "memorable" && (
            <p className="text-xs leading-relaxed text-white/45">
              Hyphenated words picked at random—easy to read, still unique each time.
            </p>
          )}

          {mode === "pin" && (
            <p className="text-xs leading-relaxed text-white/45">
              Numbers only—good for device or card PINs.
            </p>
          )}
        </div>
      </section>

      {/* Generated password */}
      <section className="space-y-3 py-6">
        {sectionHeading("Generated password")}
        <div
          className={cn(
            "relative min-h-[5.5rem] border border-white/[0.12] bg-black/40 px-4 py-4 sm:min-h-[6rem] sm:px-5 sm:py-5",
            AUTH_CONTROL_RADIUS
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]"
            aria-hidden
          />
          <div className="relative flex min-h-[4rem] items-center justify-center text-center font-mono text-base font-medium leading-snug tracking-wide sm:text-lg">
            {password ? (
              <span
                className="inline-flex max-h-40 flex-wrap items-center justify-center gap-0 overflow-y-auto break-all"
                aria-busy={isTyping}
              >
                {Array.from(displayedPassword, (char, i) => (
                  <motion.span
                    key={`${i}-${password[i] ?? ""}`}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={charClass(char, mode)}
                  >
                    {char}
                  </motion.span>
                ))}
                {isTyping && (
                  <span
                    className="ml-px inline-block h-[1.05em] w-px shrink-0 self-center bg-white/55 animate-pulse motion-reduce:animate-none"
                    aria-hidden
                  />
                )}
              </span>
            ) : (
              <span className="text-white/40">Loading…</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:gap-3">
          <Button
            type="button"
            onClick={handleCopy}
            disabled={!password}
            size="sm"
            className={cn(
              "h-10 flex-1 gap-2 border-0 font-semibold shadow-none",
              monolithAccent.bg,
              monolithAccent.bgHover,
              monolithAccent.text,
              AUTH_CONTROL_RADIUS
            )}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="ok"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="size-3.5" strokeWidth={2} />
                  Copied
                </motion.span>
              ) : (
                <motion.span
                  key="cp"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy className="size-3.5" strokeWidth={2} />
                  Copy password
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <Button
            type="button"
            onClick={refresh}
            variant="outline"
            size="sm"
            className={cn(
              "h-10 flex-1 gap-2 border-white/25 bg-transparent text-white/95 hover:bg-white/[0.08] hover:text-white",
              AUTH_CONTROL_RADIUS
            )}
          >
            <RefreshCw className="size-3.5" strokeWidth={2} />
            Refresh password
          </Button>
        </div>
      </section>
    </div>
  );
}
