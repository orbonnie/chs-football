import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { appendSheetRow, findRowIndex, updateSheetRow } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {team, date, isoDate, opponent, time, note, location, result, recording } = body;

  if (!isoDate || !date || !opponent || !team) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const values = [
    team,
    date,
    isoDate,
    opponent,
    time || "",
    note || "",
    location || "",
    result || "",
    recording || "",
  ]

  const existingRow = await findRowIndex(
    "HS-Schedule",
    (row) =>
      row.Date?.trim().toLowerCase() === isoDate.trim().toLowerCase() &&
      row.opponent.trim().toLowerCase() === opponent.trim().toLowerCase()
  );

  if (existingRow) {
    await updateSheetRow("HS-Schedule", existingRow, values);
  } else {
    await appendSheetRow("HS-Schedule", values)
  }

  return NextResponse.json({ success: true, updated: !!existingRow })
}
