"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import type { ClubEvent } from "@/data/events";
import { extractRegistrationNumberFromEmail } from "@/lib/user";
import { normalizeIndianPhoneNumber } from "@/lib/validation";

type FormState = Record<string, string>;

export default function EventRegisterForm({ event }: { event: ClubEvent }) {
  const { data: session } = useSession();
  const registrationNumber = useMemo(
    () => extractRegistrationNumberFromEmail(session?.user?.email),
    [session?.user?.email],
  );
  const registrationNumberDisplay = registrationNumber ?? "Not found";
  const [form, setForm] = useState<FormState>(() =>
    Object.fromEntries(
      event.registrationFields.map((field) => [field.key, ""]),
    ),
  );
  const [statusLoading, setStatusLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/event/${event.slug}/registration-status`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(data.error ?? "Could not fetch registration status");
        }
        return (await res.json()) as { registered?: boolean };
      })
      .then((data) => {
        if (mounted) {
          setIsRegistered(Boolean(data.registered));
        }
      })
      .catch((err: unknown) => {
        if (mounted) {
          const message =
            err instanceof Error
              ? err.message
              : "Failed to fetch registration status";
          setError(message);
        }
      })
      .finally(() => {
        if (mounted) {
          setStatusLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [event.slug]);

  const buttonLabel = useMemo(() => {
    if (statusLoading) {
      return "Checking...";
    }
    if (isRegistered) {
      return "Already Registered";
    }
    if (submitting) {
      return "Submitting...";
    }
    return "Register";
  }, [isRegistered, statusLoading, submitting]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (isRegistered) {
      return;
    }

    const requestPayload = { ...form };
    const rawPhone = requestPayload.phone?.trim();
    if (rawPhone) {
      const normalized = normalizeIndianPhoneNumber(rawPhone);
      if (!normalized) {
        setError("Enter a valid Indian phone number (10 digits).");
        return;
      }
      requestPayload.phone = normalized;
    } else if ("phone" in requestPayload) {
      requestPayload.phone = "";
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/event/${event.slug}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Registration failed");
        return;
      }

      setIsRegistered(true);
      setSuccess(
        `Registration successful (Reg No: ${registrationNumberDisplay}).`,
      );
    } catch {
      setError("Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  function renderField(field: ClubEvent["registrationFields"][number]) {
    const baseClass =
      "w-full rounded-lg border border-white/20 bg-black/20 p-3 text-white placeholder:text-gray-400";
    const value = form[field.key] ?? "";

    return (
      <input
        id={field.key}
        name={field.key}
        type={field.type}
        required={field.required}
        placeholder={field.placeholder}
        className={baseClass}
        value={value}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
        }
        disabled={isRegistered || statusLoading || submitting}
        inputMode={field.key === "phone" ? "numeric" : undefined}
        autoComplete={field.key === "phone" ? "tel" : undefined}
        title={
          field.key === "phone"
            ? "Enter a valid Indian number: 10 digits, or with +91/0 prefix."
            : undefined
        }
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-lg md:text-xl font-semibold text-white">
        Registered Account Details
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/15 bg-black/20 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-cyan-200/80">
            Name
          </p>
          <p className="text-base md:text-lg font-semibold text-white mt-1 break-words">
            {session?.user?.name ?? "Unknown"}
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 md:col-span-2">
          <p className="text-xs uppercase tracking-wide text-cyan-200/80">
            Email
          </p>
          <p className="text-base md:text-lg font-semibold text-white mt-1 break-all">
            {session?.user?.email ?? ""}
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 md:col-span-3">
          <p className="text-xs uppercase tracking-wide text-cyan-200/80">
            Registration Number
          </p>
          <p className="text-base md:text-lg font-semibold text-white mt-1">
            {registrationNumberDisplay}
          </p>
        </div>
      </div>
      {event.registrationFields.map((field) => (
        <div key={field.key}>
          <label
            htmlFor={field.key}
            className="block mb-1 text-sm font-medium text-gray-200"
          >
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}

      {error ? <p className="text-red-400 text-sm">{error}</p> : null}
      {success ? <p className="text-green-400 text-sm">{success}</p> : null}

      <button
        type="submit"
        disabled={isRegistered || statusLoading || submitting}
        className="px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-60"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
