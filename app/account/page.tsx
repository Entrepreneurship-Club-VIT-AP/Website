import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { extractRegistrationNumberFromEmail } from "@/lib/user";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/account")}`);
  }

  const name = session.user.name ?? "Unknown";
  const email = session.user.email;
  const registrationNumber =
    extractRegistrationNumberFromEmail(email) ?? "Not found";

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <section className="rounded-xl border border-white/10 bg-black/30 p-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Account</h1>

        <div className="space-y-3 text-gray-200">
          <p>
            <span className="text-gray-400">Name:</span>{" "}
            <span className="font-semibold">{name}</span>
          </p>
          <p>
            <span className="text-gray-400">Email:</span>{" "}
            <span className="font-semibold">{email}</span>
          </p>
          <p>
            <span className="text-gray-400">Registration Number:</span>{" "}
            <span className="font-semibold">{registrationNumber}</span>
          </p>
        </div>

        <div className="mt-6 flex gap-3 flex-wrap">
          <Link
            href="/event"
            className="inline-block px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
          >
            Browse Events
          </Link>
          {session.user.isAdmin ? (
            <Link
              href="/admin/events"
              className="inline-block px-4 py-2 rounded-lg border border-white/20 text-white hover:border-orange-500"
            >
              Admin Events
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}
