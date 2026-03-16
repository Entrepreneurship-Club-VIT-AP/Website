import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import EventRegisterForm from "@/components/event/EventRegisterForm";
import {
  formatEventDate,
  getEventBySlug,
  isRegistrationOpen,
} from "@/data/events";
import { authOptions } from "@/lib/auth";

export default async function EventRegisterPage({
  params,
}: {
  params: Promise<{ eventName: string }>;
}) {
  const { eventName } = await params;
  const event = getEventBySlug(eventName);

  if (!event) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(`/event/${event.slug}/register`)}`,
    );
  }

  const registrationOpen = isRegistrationOpen(
    event.eventDate,
    event.isActive,
    new Date(),
    event.registrationOpen,
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <section
        className={`border border-white/10 rounded-xl p-6 bg-gradient-to-br ${event.color} ${event.borderColor}`}
      >
        <p className="text-xs text-orange-300 mb-2">
          {formatEventDate(event.eventDate)}
        </p>
        <h1 className="text-3xl font-bold text-orange-400 mb-2">
          Register: {event.title}
        </h1>
        <p className="text-gray-300 mb-6">
          {registrationOpen
            ? "Complete the form below to register for this event."
            : "Registrations are closed for this event."}
        </p>
        {registrationOpen ? <EventRegisterForm event={event} /> : null}
      </section>
    </main>
  );
}
