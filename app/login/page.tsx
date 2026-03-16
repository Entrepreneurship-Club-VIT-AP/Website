"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const { status } = useSession();

  const callbackUrl = useMemo(
    () => searchParams.get("callbackUrl") ?? "/event",
    [searchParams],
  );

  return (
    <main className="max-w-xl mx-auto px-4 py-20">
      <section className="border border-white/10 rounded-xl p-8 bg-black/30">
        <h1 className="text-3xl font-bold text-orange-500 mb-4">Login</h1>
        <p className="text-gray-300 mb-6">
          Continue with Google. College users from the allowed domain can
          register for events.
        </p>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl })}
          disabled={status === "loading"}
          className="px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-60"
        >
          {status === "loading" ? "Loading..." : "Continue with Google"}
        </button>
      </section>
    </main>
  );
}
