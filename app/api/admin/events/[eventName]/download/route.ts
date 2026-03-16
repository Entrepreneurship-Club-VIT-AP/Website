import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import * as XLSX from "xlsx";
import { authOptions, isAdminEmail } from "@/lib/auth";
import { getEventBySlug, getSheetTabName } from "@/data/events";
import { getEventSheetValues } from "@/lib/googleSheets";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ eventName: string }> },
) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  if (!email || !isAdminEmail(email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { eventName } = await params;
  const event = getEventBySlug(eventName);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  try {
    const values = await getEventSheetValues(event);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(
      values.length > 0 ? values : [["No registrations yet"]],
    );
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      getSheetTabName(event.slug),
    );

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    const fileName = `${event.slug}-registrations.xlsx`;

    return new NextResponse(buffer as BodyInit, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=\"${fileName}\"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate download" },
      { status: 500 },
    );
  }
}
