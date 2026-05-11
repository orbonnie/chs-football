import Hero from "@/components/Hero";
import Calendar from "@/components/Calendar"
import NextGame from "@/components/NextGame";
import News from "@/components/News";
import Sponsors from "@/components/Sponsors";

// This is a Server Component — no JS bundle cost, renders on the server
export default function HomePage() {
  return (
    <>
      <Hero />
      <News />
      <NextGame />
      <Calendar />
      <Sponsors />
    </>
  );
}
