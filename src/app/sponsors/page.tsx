import Sponsors from "@/components/Sponsors";
import { main } from "framer-motion/client";
import { SP } from "next/dist/shared/lib/utils";

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-silver-300 pt-24">
      <Sponsors />
    </main>
  )
}