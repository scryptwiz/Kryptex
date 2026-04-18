/** Clerk UI for monolith (black / white) auth surfaces. */

/** 0.375rem (6px) — matches `variables.borderRadius`; use on marketing auth tabs too. */
export const AUTH_CONTROL_RADIUS = "rounded-[0.375rem]";

const CLERK_CONTROL_RADIUS = `!${AUTH_CONTROL_RADIUS}`;

export const clerkFormAppearance = {
  layout: {
    socialButtonsVariant: "blockButton",
  },
  variables: {
    colorPrimary: "#ffffff",
    colorDanger: "#fca5a5",
    colorSuccess: "#e5e5e5",
    colorWarning: "#fde68a",
    colorNeutral: "rgba(255,255,255,0.65)",
    colorText: "#ffffff",
    colorTextOnPrimaryBackground: "#0a0a0a",
    colorTextSecondary: "rgba(255,255,255,0.78)",
    colorBackground: "#000000",
    colorInputBackground: "#0a0a0a",
    colorInputText: "#ffffff",
    borderRadius: "0.375rem",
  },
  elements: {
    rootBox: cnRootBox(),
    card:
      "w-full max-w-none rounded-xl !border-white/42 bg-neutral-950/50 p-0 shadow-none backdrop-blur-[2px] text-white",
    headerTitle: "text-xl font-semibold tracking-tight text-white",
    headerSubtitle: "text-sm text-white/75",

    socialButtonsRoot: "mx-0 flex w-full flex-col gap-2",
    socialButtons: "flex w-full flex-col gap-2",
    socialButtonsBlockButton: cnSocialButton(),
    socialButtonsIconButton: cnSocialButton(),
    socialButtonsBlockButtonText: "!text-white font-semibold",
    socialButtonsProviderIcon:
      "size-5 shrink-0 brightness-0 invert opacity-95",

    dividerRow:
      "!m-0 !my-0 !py-0 flex w-full items-center gap-2 !border-0",
    dividerLine:
      "!m-0 !h-px !min-h-px flex-1 !border-0 !bg-white/22 shadow-none self-center",
    dividerText:
      "shrink-0 px-1 text-xs font-semibold uppercase tracking-wider text-white/45",

    formFieldLabel: "text-sm font-medium text-white",
    formFieldHintText: "text-white/55",
    formFieldErrorText: "text-red-300",
    formFieldSuccessText: "text-white/65",
    formFieldRow: "gap-2",
    formFieldInput: cnInput(),
    formFieldInputShowPasswordButton: "text-white/70 hover:text-white",

    formButtonPrimary: `!bg-white !text-black hover:!bg-white/90 !border-0 !shadow-none font-semibold ${CLERK_CONTROL_RADIUS} !py-2.5 !px-4 !min-h-0 h-auto text-sm leading-tight`,
    formButtonSecondary: `border-2 border-white/40 bg-transparent text-white hover:bg-white/[0.08] font-medium ${CLERK_CONTROL_RADIUS} !py-2.5 !px-4 !min-h-0 h-auto text-sm`,

    identityPreviewText: "text-white",
    identityPreviewEditButton: "text-white/75 hover:text-white",
    formResendCodeLink: "text-white/80 hover:text-white underline-offset-4",
    otpCodeFieldInput: `!border !border-white/24 !bg-neutral-950 !text-white caret-white focus:!border-white/42 ${CLERK_CONTROL_RADIUS}`,
    alternativeMethodsBlockButton: `border-2 border-white/40 text-white hover:bg-white/[0.06] ${CLERK_CONTROL_RADIUS} min-h-10`,

    footer: "mt-6 border-t border-white/15 pt-4",
    footerAction: "hidden",
    footerPages: "hidden",
    footerActionLink: "text-white/70 hover:text-white text-sm",

    logoBox: "opacity-85 grayscale contrast-125",
    logoImage: "opacity-90",

    formFieldAction: "text-white/80 hover:text-white",
    spinner: "text-white",
    alertText: "text-white/85",
    formHeaderTitle: "text-white",
    formHeaderSubtitle: "text-white/75",
    scrollBox: "w-full !p-0 !m-0 text-white",
    header: "!pb-0",
  },
} as const;

/** Tailwind-only strings split for readability */
function cnRootBox() {
  return [
    "w-full min-w-0 max-w-full text-white",
    /* Clerk “or” divider — hairline only, no thick theme borders */
    "[&_.cl-dividerLine]:!m-0 [&_.cl-dividerLine]:!block [&_.cl-dividerLine]:!h-px [&_.cl-dividerLine]:!min-h-px",
    "[&_.cl-dividerLine]:!flex-1 [&_.cl-dividerLine]:!border-0 [&_.cl-dividerLine]:!bg-white/22",
    "[&_.cl-dividerLine]:shadow-none",
    "[&_.cl-dividerRow]:!m-0 [&_.cl-dividerRow]:!my-0 [&_.cl-dividerRow]:!py-0 [&_.cl-dividerRow]:!border-0",
    "[&_.cl-dividerRow]:flex [&_.cl-dividerRow]:w-full [&_.cl-dividerRow]:items-center [&_.cl-dividerRow]:gap-2",
    "[&_.cl-dividerRow]:text-white/45",
    /* Collapse wrapper spacing around socials / divider / first field */
    "[&_.cl-socialButtonsRoot]:!mb-0 [&_.cl-socialButtons]:!mb-0",
    "[&_.cl-dividerRow+*]:!mt-0",
    /* OAuth buttons — backup targets when appearance slots merge away utilities */
    ...cnRootSocialButtonSelectors(),
  ].join(" ");
}

function cnSocialButton() {
  return [
    `!flex !w-full !min-h-[2.5rem] !items-center !justify-center !gap-3 ${CLERK_CONTROL_RADIUS}`,
    "!border !border-white/20 !bg-neutral-950 !px-3 !py-2",
    "!text-[15px] !font-semibold !text-white !shadow-none",
    "!transition-colors hover:!border-white/32 hover:!bg-white/[0.05]",
    "focus-visible:!border-white/42 focus-visible:!shadow-[0_0_0_2px_rgba(255,255,255,0.08)]",
  ].join(" ");
}

/**
 * Descendant selectors from rootBox so utilities apply even when Clerk merges away
 * direct `socialButtonsBlockButton` / `socialButtonsIconButton` class strings.
 */
function cnRootSocialButtonSelectors() {
  /* Substring match: Clerk uses `cl-socialButtonsBlockButton__google` etc. on the same node. */
  const b = "[&_[class*='cl-socialButtonsBlockButton']]";
  const i = "[&_[class*='cl-socialButtonsIconButton']]";
  return [
    `${b}:!flex ${b}:!w-full ${b}:!min-h-[2.5rem] ${b}:!items-center ${b}:!justify-center ${b}:!gap-3 ${b}:${CLERK_CONTROL_RADIUS}`,
    `${b}:!border ${b}:!border-white/20 ${b}:!bg-neutral-950 ${b}:!px-3 ${b}:!py-2 ${b}:!shadow-none`,
    `${b}:!text-[15px] ${b}:!font-semibold ${b}:!text-white`,
    `${b}:hover:!border-white/32 ${b}:hover:!bg-white/[0.05]`,
    `${b}:focus-visible:!border-white/42 ${b}:focus-visible:!shadow-[0_0_0_2px_rgba(255,255,255,0.08)]`,
    `${i}:!flex ${i}:!items-center ${i}:!justify-center ${i}:${CLERK_CONTROL_RADIUS} ${i}:!border ${i}:!border-white/20 ${i}:!bg-neutral-950 ${i}:!shadow-none`,
    `${i}:hover:!border-white/32 ${i}:hover:!bg-white/[0.05]`,
    `${i}:focus-visible:!border-white/42 ${i}:focus-visible:!shadow-[0_0_0_2px_rgba(255,255,255,0.08)]`,
  ];
}

function cnInput() {
  return [
    "!border !border-white/20 !bg-neutral-950 !text-white !shadow-none",
    "placeholder:!text-white/45",
    "focus:!border-white/42 focus:!shadow-[0_0_0_2px_rgba(255,255,255,0.08)]",
    `${CLERK_CONTROL_RADIUS} min-h-10 px-3 py-2 text-sm`,
  ].join(" ");
}
