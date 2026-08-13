import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { appendSheetRow, findRowIndex, updateSheetRow } from "@/lib/sheets";
import { capWords } from "@/lib/formData";

function formatDisplayDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatGameTime(time: string) {
  if (!time?.trim()) return "";

  const normalized = time.trim().toUpperCase();

  // Add PM if AM/PM wasn't provided
  const withPeriod = /\b(AM|PM)\b/.test(normalized)
    ? normalized
    : `${normalized} PM`;

  // Normalize to H:MM AM/PM
  const match = withPeriod.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/);

  if (!match) return withPeriod;

  const [, hour, minutes = "00", period] = match;

  return `${hour}:${minutes} ${period}`;
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {team, isoDate, opponent, time, note, location, result, recording } = body;

  if (!isoDate || !opponent || !team) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const values = [
    team,
    formatDisplayDate(isoDate),
    isoDate,
    capWords(opponent),
    formatGameTime(time) || "",
    note || "",
    location || "",
    result || "",
    recording || "",
  ]

  const existingRow = await findRowIndex(
    "HS-Schedule",
    (row) =>
      row.isoDate?.trim().toLowerCase() === isoDate.trim().toLowerCase() &&
      row.opponent.trim().toLowerCase() === opponent.trim().toLowerCase() &&
      row.team?.trim().toLowerCase() === team.trim().toLowerCase()
  );

  if (existingRow) {
    await updateSheetRow("HS-Schedule", existingRow, values);
  } else {
    await appendSheetRow("HS-Schedule", values)
  }

  return NextResponse.json({ success: true, updated: !!existingRow })
}
