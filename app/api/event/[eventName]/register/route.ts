import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, isAdminEmail, isAllowedCollegeEmail } from "@/lib/auth";
import { appendRegistration, isAlreadyRegistered } from "@/lib/googleSheets";
import { getEventBySlug, isRegistrationOpen } from "@/data/events";
import {
  isValidIndianPhoneNumber,
  normalizeIndianPhoneNumber,
} from "@/lib/validation";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ eventName: string }> },
) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();
  const nameFromGoogle = session?.user?.name?.trim();
  const name = nameFromGoogle || (email ? email.split("@")[0] : "Unknown");

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAllowedCollegeEmail(email) && !isAdminEmail(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventName } = await params;
  const event = getEventBySlug(eventName);
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  if (
    !isRegistrationOpen(
      event.eventDate,
      event.isActive,
      new Date(),
      event.registrationOpen,
    )
  ) {
    return NextResponse.json(
      { error: "Registrations are closed for this event." },
      { status: 400 },
    );
  }

  const payload = (await request.json()) as Record<string, string>;

  for (const field of event.registrationFields) {
    const value = payload[field.key]?.toString().trim();
    if (field.required && !value) {
      return NextResponse.json(
        { error: `${field.label} is required` },
        { status: 400 },
      );
    }
  }

  const rawPhone = payload.phone?.toString().trim();
  if (rawPhone) {
    if (!isValidIndianPhoneNumber(rawPhone)) {
      return NextResponse.json(
        { error: "Enter a valid Indian phone number (10 digits)." },
        { status: 400 },
      );
    }
    payload.phone = normalizeIndianPhoneNumber(rawPhone) ?? "";
  } else if ("phone" in payload) {
    payload.phone = "";
  }

  try {
    const alreadyRegistered = await isAlreadyRegistered(event, email);
    if (alreadyRegistered) {
      return NextResponse.json(
        { error: "Already registered" },
        { status: 409 },
      );
    }

    await appendRegistration(event, email, name, payload);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to submit registration" },
      { status: 500 },
    );
  }
}
