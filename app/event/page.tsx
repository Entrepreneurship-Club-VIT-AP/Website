import Link from "next/link";
import { events, formatEventDate } from "@/data/events";

export default function EventListPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-orange-500 mb-4">
          Events
        </h1>
        <p className="text-gray-300 text-base md:text-lg">
          Explore event details and register from each event page.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <article
            key={event.slug}
            className={`border border-white/10 rounded-xl p-6 bg-linear-to-br ${event.color} ${event.borderColor}`}
          >
            <p className="text-xs text-orange-300 mb-2">
              {formatEventDate(event.eventDate)}
            </p>
            <h2 className="text-2xl text-orange-400 font-bold mb-2 flex items-center gap-2">
              <span>{event.icon}</span>
              {event.title}
            </h2>
            <p className="text-gray-300 mb-4">{event.description}</p>
            {event.stats ? (
              <p className="text-green-400 text-sm mb-4">{event.stats}</p>
            ) : null}
            <Link
              href={`/event/${event.slug}`}
              className="inline-block px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
            >
              View Event
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
