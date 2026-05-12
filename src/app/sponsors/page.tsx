import Sponsors from "@/components/Sponsors";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sponsors | Centennial Knights Football',
}

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-silver-300 pt-24">
      <Sponsors />
    </main>
  )
}