import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findRowIndex, getRowValues } from "@/lib/sheets";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const isoDate = searchParams.get("isoDate") ?? "";
  const opponent = searchParams.get("opponent") ?? "";
  const team = searchParams.get("team") ?? "";

  const rowIndex = await findRowIndex(
    "HS-Schedule",
    (row) =>
      row.isoDate?.trim() === isoDate.trim() &&
      row.opponent?.trim().toLowerCase() === opponent.trim().toLowerCase() &&
      row.team?.trim().toLowerCase() === team.trim().toLowerCase()
  );

  if (!rowIndex) return NextResponse.json({ found: false });

  const values = await getRowValues("HS-Schedule", rowIndex);
  return NextResponse.json({ found: true, values });
}