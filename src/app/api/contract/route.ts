import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try{
    const body = await req.json();
    const {
      playerFirst,
      playerLast,
      parentFirst,
      parentLast,
      date,
      email,
    } = body;

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            playerLast,
            playerFirst,
            parentLast,
            parentFirst,
            email,
            date,
            new Date().toISOString(),
            req.headers.get("x-forwarded-for") ?? "",
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
}catch(error) {
  console.error("Sheet error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
}
}