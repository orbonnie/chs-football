import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findRowIndex, getRowValues } from "@/lib/sheets";


function createSlug(fname: string, lname: string) {
  return `${fname.trim().toLowerCase()}-${lname.trim().toLowerCase()}`;
}

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const firstName = searchParams.get("firstName") ?? "";
  const lastName = searchParams.get("lastName") ?? "";

  const rowIndex = await findRowIndex(
    "HS-Players",
    (row) => row.slug === createSlug(firstName, lastName)
  );

  if (!rowIndex) return NextResponse.json({ found: false });

  const values = await getRowValues("HS-Players", rowIndex);
  return NextResponse.json({ found: true, values });
}
