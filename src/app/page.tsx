import Hero from "@/components/Hero";
import NextGame from "@/components/NextGame";
import News from "@/components/News";
import Sponsors from "@/components/Sponsors";

// This is a Server Component — no JS bundle cost, renders on the server
export default function HomePage() {
  return (
    <>
      <Hero />
      <NextGame />
      <News />
      <Sponsors />
    </>
  );
}
