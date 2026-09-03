import { NextRequest, NextResponse } from "next/server";
import { appendSheetRow } from "@/lib/sheets";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, image, href, date, isoDate, team } = body;

  if (!title || !description || !image || !date || !isoDate || !team) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await appendSheetRow("News", [
    title,
    description,
    image,
    href || "",
    date,
    isoDate,
    new Date().toISOString(),
    team,
  ]);

  return NextResponse.json({ success: true });
}
