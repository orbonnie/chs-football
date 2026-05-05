import type { Metadata } from 'next'
import RecruitingFilters from '@/components/RecruitingFilters'
import { players } from '@/data/players'

export const metadata: Metadata = {
  title: 'Recruiting | Centennial Knights Football',
}

export default function RecruitingPage() {
  return (
    <div className="min-h-screen bg-silver-300 pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="bg-royal-600 -mx-6 px-6 py-10 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-white text-6xl tracking-widest text-center">
              KNIGHTS RECRUITING PORTAL
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/5 mb-6 md:mb-12">
          {[
            { stat: '5A', label: 'Classification' },
            { stat: 'Region 6', label: 'Conference' },
          ].map(({ stat, label }) => (
            <div key={label} className="bg-black-500 p-10 text-center">
              <p className="font-display text-silver-400 text-4xl sm:text-6xl">{stat}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase mt-2">{label}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-black-500/90 text-lg leading-relaxed mb-8">
            Centennial Knights Football is committed to developing student-athletes at the highest level.
            Our program emphasizes academic excellence, character development, and elite football.
          </p>

          <RecruitingFilters players={players}/>

          <div className="border border-white/10 p-8 mb-8">
            <h2 className="font-display text-black-500 text-3xl tracking-widest mb-4">CONTACT RECRUITING</h2>
            <p className="text-black-500/90 text-sm mb-6">
              Coaches and college recruiters interested in our athletes, please reach out directly.
            </p>
            <a
              href="mailto:recruiting@centennialfootball.com"
              className="bg-royal-600 text-black font-bold text-sm tracking-widest uppercase px-8 py-3 hover:bg-royal-500 transition-colors inline-block rounded-lg"
            >
              Email Recruiting Staff
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
