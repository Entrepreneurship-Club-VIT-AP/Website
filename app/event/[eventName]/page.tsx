import { notFound } from "next/navigation";
import { formatEventDate, getEventBySlug } from "@/data/events";
import EventRegistrationCta from "@/components/event/EventRegistrationCta";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventName: string }>;
}) {
  const { eventName } = await params;
  const event = getEventBySlug(eventName);

  if (!event) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <section
        className={`border border-white/10 rounded-xl p-6 bg-gradient-to-br ${event.color} ${event.borderColor}`}
      >
        <p className="text-xs text-orange-300 mb-2">
          {formatEventDate(event.eventDate)}
        </p>
        <h1 className="text-3xl md:text-4xl text-orange-400 font-bold mb-3 flex items-center gap-2">
          <span>{event.icon}</span>
          {event.title}
        </h1>
        <p className="text-gray-300 mb-5">{event.description}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">
            What to expect
          </h2>
          <ul className="text-gray-300 space-y-2 list-disc list-inside">
            {event.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <EventRegistrationCta
          slug={event.slug}
          eventDate={event.eventDate}
          registrationOpenOverride={event.registrationOpen}
          isActive={event.isActive}
        />
      </section>
    </main>
  );
}
