import type { Metadata } from 'next'
import { getSheetData } from '@/lib/sheets'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Roster | Centennial Knights Football',
}

const POSITION_ABBREVIATIONS: Record<string, string> = {
  'Quarterback': 'QB',
  'Running Back': 'RB',
  'Wide Receiver': 'WR',
  'Tight End': 'TE',
  'Offensive Line': 'OL',
  'Defensive Line': 'DL',
  'Defensive End': 'DE',
  'Linebacker': 'LB',
  'Defensive Back': 'DB',
  'ATH': 'ATH',
  'Kicker': 'K',
  'Punter': 'P',
}

type Player = {
  number: string
  firstName: string
  lastName: string
  classYear: string
  position: string
}

async function getRoster(): Promise<Player[]> {
  const rows = await getSheetData('HS-Players')
  return rows
    .map(r => ({
      number: r.number,
      firstName: r.firstName,
      lastName: r.lastName,
      classYear: r.classYear,
      position: r.position,
    }))
    .sort((a, b) => Number(a.number) - Number(b.number))
}

function formatPosition(pos: string) {
  if (!pos) return ''
  return pos
    .split('|')
    .map(pos => POSITION_ABBREVIATIONS[pos.trim()] ?? pos.trim())
    .join('/')
}

export default async function RosterPage() {
  const roster = await getRoster()

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <p className="font-display text-black-500 text-3xl tracking-[0.4em]">2026</p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest">ROSTER</h1>
        </div>

        <div className="border border-black-500/10 rounded-lg overflow-hidden">
          <table className="w-full text-xs sm:text-sm table-fixed">
            <thead>
              <tr className="bg-royal-600 text-white font-display tracking-widest uppercase text-xs">
                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left w-[12%]">#</th>
                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left w-[25%]">First</th>
                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left w-[25%]">Last</th>
                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left w-[25%]">Pos</th>
                <th className="px-1 sm:px-4 py-2 sm:py-3 text-left w-[13%]">Class</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((p, i) => (
                <tr
                  key={`${p.number}-${p.lastName}`}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-silver-500/10'}
                >
                  <td className="px-1 sm:px-4 py-1.5 sm:py-2 font-semibold text-royal-600 truncate">{p.number}</td>
                  <td className="px-1 sm:px-4 py-1.5 sm:py-2 text-black-500 truncate">{p.firstName}</td>
                  <td className="px-1 sm:px-4 py-1.5 sm:py-2 text-black-500 truncate">{p.lastName}</td>
                  <td className="px-1 sm:px-4 py-1.5 sm:py-2 text-black-500/70 truncate">
                    {formatPosition(p.position)}
                  </td>
                  <td className="px-1 sm:px-4 py-1.5 sm:py-2 text-black-500/70 truncate">{p.classYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
