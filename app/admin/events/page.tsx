import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { events, formatEventDate } from "@/data/events";
import { authOptions, isAdminEmail } from "@/lib/auth";
import {
  ensureEventSheetReady,
  getEventSheetOpenLink,
} from "@/lib/googleSheets";

export default async function AdminEventsPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  if (!email) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/admin/events")}`);
  }

  if (!isAdminEmail(email)) {
    redirect("/event");
  }

  const sheetLinks = new Map<string, string>();
  await Promise.all(
    events.map(async (event) => {
      try {
        await ensureEventSheetReady(event);
        const link = await getEventSheetOpenLink(event);
        sheetLinks.set(event.slug, link);
      } catch (error) {
        console.error(`Failed to initialize sheet for ${event.slug}`, error);
      }
    }),
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-3">
        Admin Events
      </h1>
      <p className="text-gray-300 mb-8">
        Open registration sheets directly for each event.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <article
            key={event.slug}
            className="rounded-xl border border-white/10 p-5 bg-black/30"
          >
            <h2 className="text-xl font-semibold text-orange-400 mb-1 flex items-center gap-2">
              <span>{event.icon}</span>
              {event.title}
            </h2>
            <p className="text-sm text-gray-400 mb-3">
              {formatEventDate(event.eventDate)}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href={sheetLinks.get(event.slug) ?? "#"}
                target="_blank"
                className="inline-block px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                Open Sheet
              </Link>
              <Link
                href={`/event/${event.slug}`}
                className="inline-block px-4 py-2 rounded-lg border border-white/20 text-white hover:border-orange-500"
              >
                View Event
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
