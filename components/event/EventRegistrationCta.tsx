"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { isRegistrationOpen } from "@/data/events";

export default function EventRegistrationCta({
  slug,
  eventDate,
  registrationOpenOverride,
  isActive = true,
}: {
  slug: string;
  eventDate: string;
  registrationOpenOverride?: boolean;
  isActive?: boolean;
}) {
  const { data: session, status } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const registrationOpen = isRegistrationOpen(
    eventDate,
    isActive,
    new Date(),
    registrationOpenOverride,
  );

  useEffect(() => {
    if (!session?.user?.email) {
      setIsRegistered(false);
      return;
    }

    let mounted = true;
    setLoading(true);

    fetch(`/api/event/${slug}/registration-status`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          return { registered: false };
        }
        return (await res.json()) as { registered?: boolean };
      })
      .then((data) => {
        if (mounted) {
          setIsRegistered(Boolean(data.registered));
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [session?.user?.email, slug]);

  const label = useMemo(() => {
    if (!registrationOpen) {
      return "Registrations Closed";
    }
    if (status === "loading" || loading) {
      return "Checking...";
    }
    if (!session?.user) {
      return "Login to Register";
    }
    return isRegistered ? "Already Registered" : "Register Now";
  }, [registrationOpen, isRegistered, loading, session?.user, status]);

  if (!registrationOpen) {
    return (
      <button
        type="button"
        disabled
        className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 font-semibold"
      >
        {label}
      </button>
    );
  }

  if (!session?.user) {
    const callbackUrl = encodeURIComponent(`/event/${slug}/register`);
    return (
      <Link
        href={`/login?callbackUrl=${callbackUrl}`}
        className="inline-block px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
      >
        {label}
      </Link>
    );
  }

  if (isRegistered) {
    return (
      <button
        type="button"
        disabled
        className="px-4 py-2 rounded-lg bg-green-700/70 text-green-200 font-semibold"
      >
        {label}
      </button>
    );
  }

  return (
    <Link
      href={`/event/${slug}/register`}
      className="inline-block px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
    >
      {label}
    </Link>
  );
}
