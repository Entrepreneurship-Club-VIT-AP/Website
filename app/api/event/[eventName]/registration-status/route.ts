import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, isAdminEmail, isAllowedCollegeEmail } from "@/lib/auth";
import { getEventBySlug } from "@/data/events";
import { isAlreadyRegistered } from "@/lib/googleSheets";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ eventName: string }> },
) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  if (!email) {
    return NextResponse.json(
      { registered: false, authenticated: false },
      { status: 200 },
    );
  }

  if (!isAllowedCollegeEmail(email) && !isAdminEmail(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventName } = await params;
  const event = getEventBySlug(eventName);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  try {
    const registered = await isAlreadyRegistered(event, email);
    return NextResponse.json(
      { registered, authenticated: true },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch status" },
      { status: 500 },
    );
  }
}
