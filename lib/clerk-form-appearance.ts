/** Clerk UI for monolith (black / white) auth surfaces. */

/** 0.375rem (6px) — matches `variables.borderRadius`; use on marketing auth tabs too. */
export const AUTH_CONTROL_RADIUS = "rounded-[0.375rem]";

/** ~12px — matches Clerk `elements.card` (`rounded-xl`); use for main auth / vault panels. */
export const AUTH_CARD_RADIUS = "rounded-[0.75rem]";

const CLERK_CONTROL_RADIUS = `!${AUTH_CONTROL_RADIUS}`;
const CLERK_CARD_RADIUS = `!${AUTH_CARD_RADIUS}`;

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
    colorForeground: "#ffffff",
    colorPrimaryForeground: "#0a0a0a",
    colorMutedForeground: "rgba(255,255,255,0.78)",
    colorBackground: "#000000",
    colorInput: "#0a0a0a",
    colorInputForeground: "#ffffff",
    borderRadius: "0.375rem",
  },
  elements: {
    rootBox: cnRootBox(),
    card: `w-full max-w-none ${CLERK_CARD_RADIUS} !border-white/42 bg-neutral-950/50 p-0 shadow-none backdrop-blur-[2px] text-white`,
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
  return "w-full min-w-0 max-w-full text-white";
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

function cnInput() {
  return [
    "!border !border-white/20 !bg-neutral-950 !text-white !shadow-none",
    "placeholder:!text-white/45",
    "focus:!border-white/42 focus:!shadow-[0_0_0_2px_rgba(255,255,255,0.08)]",
    `${CLERK_CONTROL_RADIUS} min-h-10 px-3 py-2 text-sm`,
  ].join(" ");
}
