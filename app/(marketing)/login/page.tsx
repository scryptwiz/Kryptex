"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Show, SignIn, SignUp, useAuth } from "@clerk/nextjs";
import { MonolithGridBackdrop, MonolithHeader } from "@/components/marketing/monolith-chrome";
import {
  AUTH_CONTROL_RADIUS,
  clerkFormAppearance,
} from "@/lib/clerk-form-appearance";
import { cn } from "@/lib/utils";

function RedirectSignedInToVault() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/vault");
    }
  }, [isLoaded, isSignedIn, router]);

  return null;
}

function LoginTabs() {
  const searchParams = useSearchParams();
  const defaultTab =
    searchParams.get("tab") === "sign-up" ? "sign-up" : "sign-in";

  return (
    <Tabs
      key={defaultTab}
      defaultValue={defaultTab}
      className="flex w-full min-w-0 max-w-full flex-col gap-4"
    >
      {/* Equal-width pill switch (same track as before) */}
      <TabsList
        variant="default"
        className={cn(
          "grid h-11 min-h-11 w-full min-w-0 shrink-0 grid-cols-2 gap-1 border border-white/20 bg-neutral-950 p-1 shadow-none",
          AUTH_CONTROL_RADIUS
        )}
      >
        <TabsTrigger
          value="sign-in"
          className={cn(
            AUTH_CONTROL_RADIUS,
            "text-sm font-medium text-white/90 shadow-none",
            "hover:text-white data-active:hover:bg-white data-active:hover:text-black",
            "data-active:bg-white data-active:text-black data-active:shadow-none",
            "dark:data-active:bg-white dark:data-active:text-black dark:data-active:hover:text-black"
          )}
        >
          Sign in
        </TabsTrigger>
        <TabsTrigger
          value="sign-up"
          className={cn(
            AUTH_CONTROL_RADIUS,
            "text-sm font-medium text-white/90 shadow-none",
            "hover:text-white data-active:hover:bg-white data-active:hover:text-black",
            "data-active:bg-white data-active:text-black data-active:shadow-none",
            "dark:data-active:bg-white dark:data-active:text-black dark:data-active:hover:text-black"
          )}
        >
          Create account
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sign-in" className="mt-0 min-w-0 outline-none">
        <SignIn
          routing="hash"
          appearance={clerkFormAppearance}
          signUpUrl="/login?tab=sign-up"
          signInUrl="/login"
          fallbackRedirectUrl="/vault"
        />
      </TabsContent>
      <TabsContent value="sign-up" className="mt-0 min-w-0 outline-none">
        <SignUp
          routing="hash"
          appearance={clerkFormAppearance}
          signInUrl="/login"
          fallbackRedirectUrl="/vault"
        />
      </TabsContent>
    </Tabs>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full max-w-[100%] overflow-x-hidden">
      <RedirectSignedInToVault />
      <MonolithGridBackdrop />
      <div className="relative z-10 flex min-h-screen flex-col">
        <MonolithHeader variant="auth" />

        <main className="flex min-h-0 flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          {/* w-fit: width follows the form; cap at viewport */}
          <div className="mx-auto w-fit max-w-full min-w-0">
            <div className="px-1 sm:px-0">
              <Show when="signed-out">
                <Suspense fallback={null}>
                  <LoginTabs />
                </Suspense>
              </Show>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
