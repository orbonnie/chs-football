import Hero from "@/components/Hero";
import Calendar from "@/components/Calendar"
import NextGame from "@/components/NextGame";
import News from "@/components/News";
import Sponsors, { Sponsor } from "@/components/Sponsors";
import { getSheetData } from "@/lib/sheets";
import type { NewsStory } from "@/types";
import type { CalendarConfig } from "@/types"

// This is a Server Component — no JS bundle cost, renders on the server
export default async function HomePage() {
  const news = await getSheetData("HS-News")
  const AllCalendars = await getSheetData("Calendars") as unknown as CalendarConfig[]
  const sponsors = await getSheetData("Sponsors") as unknown as Sponsor[]

  const fullCalendar = AllCalendars.map(({ name }) => name);

  return (
    <>
      <Hero />
      <News news={news as NewsStory[]}/>
      <NextGame />
      <Calendar selectedCalendars={fullCalendar} ALL_CALENDARS={AllCalendars}/>
      <Sponsors sponsors={sponsors} />
    </>
  );
}
