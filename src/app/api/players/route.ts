import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { appendSheetRow, findRowIndex, updateSheetRow } from "@/lib/sheets";
import { capWords } from "@/lib/formatData";


function createSlug(fname: string, lname: string) {
  return `${fname.trim().toLowerCase()}-${lname.trim().toLowerCase()}`;
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    slug,
    number,
    firstName,
    lastName,
    classYear,
    position,
    photo,
    height,
    weight,
    gpa,
    bio,
    gamesPlayed,
    yards,
    touchdowns,
    tackles,
    bench,
    squat,
    deadlift,
    clean,
    forty,
    hudlUrl,
    offers,
  } = body;

  if ( !number || !firstName || !lastName || !classYear || !Array.isArray(position) || position.length === 0) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

   const values = [
    createSlug(firstName, lastName),
    number,
    capWords(firstName),
    capWords(lastName),
    classYear,
    position.join("|"),
    photo|| "",
    height|| "",
    weight|| "",
    gpa|| "",
    bio|| "",
    gamesPlayed || "",
    yards || "",
    touchdowns || "",
    tackles || "",
    bench || "",
    squat || "",
    deadlift || "",
    clean || "",
    forty || "",
    hudlUrl || "",
    offers || "",
   ];

   const existingRow = await findRowIndex(
      "HS-Players",
      (row) =>
        row.slug === createSlug(firstName, lastName)
    );
    if (existingRow) {
      await updateSheetRow("HS-Players", existingRow, values);
    } else {
      await appendSheetRow("HS-Players", values);
    }



  return NextResponse.json({ success: true, updated: !!existingRow });
}
