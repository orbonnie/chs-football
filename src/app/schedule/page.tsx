import type { Metadata } from 'next'
import { varsity, jv } from '@/data/schedule'

export const metadata: Metadata = {
  title: 'Schedule | Centennial Knights Football',
}

type Game = { date: string; location: string; opponent: string; time: string; note: string }

function gameTextColor(location: string) {
  if (location === 'vs') return 'text-royal-600'   // vs — royal blue
  if (location === 'BYE') return 'text-silver-700'  // bye — gray
  return 'text-black-500'                               // @ — black
}

function VarsityRow({ game }: { game: Game }) {
  const isBye = game.location === 'BYE'
  const textColor = gameTextColor(game.location)
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 gap-1 border-b border-gray-300 last:border-0">
      <span className={`font-display text-lg tracking-wider w-48 shrink-0 ${textColor}`}>
        {game.date}
      </span>
      <div className="flex items-center gap-3 flex-1">
        <span className={`font-display text-2xl tracking-wider ${textColor}`}>
          {isBye ? 'BYE WEEK' : `${game.location.toUpperCase()} ${game.opponent.toUpperCase()}`}
        </span>
        {game.note && (
          <span className="text-xs tracking-widest uppercase text-royal-600 bg-royal-600/10 px-2 py-1 rounded hidden sm:inline">
            {game.note}
          </span>
        )}
      </div>
      {!isBye && (
        <span className={`text-sm tracking-wider shrink-0 ${textColor}`}>{game.time}</span>
      )}
    </div>
  )
}

function JVRow({ game }: { game: Game }) {
  const isBye = game.location === 'BYE'
  const textColor = gameTextColor(game.location)
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0">
      <span className={`font-display text-base tracking-wider w-36 shrink-0 ${textColor}`}>
        {game.date}
      </span>
      <span className={`font-display text-base tracking-wider flex-1 ${textColor}`}>
        {isBye ? 'BYE WEEK' : `${game.location.toUpperCase()} ${game.opponent.toUpperCase()}`}
      </span>
      {!isBye && (
        <span className={`text-xs tracking-wider shrink-0 ${textColor}`}>{game.time}</span>
      )}
    </div>
  )
}

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <p className="font-display text-royal-600 text-3xl tracking-[0.4em]">2026</p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest">SCHEDULE</h1>
        </div>

        {/* Varsity */}
        <div className="bg-silver-00 rounded-2xl overflow-hidden mb-6">
          {/* Varsity header */}
          <div className="bg-black-500 px-6 py-5 flex items-end justify-between">
            <div>
              <h2 className="font-display text-white text-4xl tracking-widest leading-none">VARSITY</h2>
            </div>
            {/* Color key */}
            <div className="flex items-center gap-6 pb-1">
              <span className="bg-white px-1 rounded-lg">
                <span className="font-display text-black-500 text-sm tracking-widest">HOME</span>
              </span>
              <span className="text-white/70">/</span>
              <span className="font-display text-royal-400 text-sm tracking-widest">vs</span>
              <span className="text-white/70">/</span>
              <span className="font-display text-silver-500 text-sm tracking-widest">BYE</span>
            </div>
          </div>

          {/* Varsity rows */}
          {varsity.map((game, i) => <VarsityRow key={i} game={game} />)}
        </div>

        {/* JV — smaller card below */}
        <div className="bg-silver-300 rounded-2xl overflow-hidden">
          <div className="bg-black-500 px-6 py-4 flex items-end justify-between">
            <div>
              <h2 className="font-display text-white text-2xl tracking-widest leading-none">JV</h2>
            </div>
            <div className="flex items-center gap-4 pb-0.5">
              <span className="bg-white px-1 rounded-lg">
                <span className="font-display text-black-500 text-xs tracking-widest">HOME</span>
              </span>
              <span className="text-white/20">/</span>
              <span className="font-display text-royal-400 text-xs tracking-widest">vs</span>
              <span className="text-white/20">/</span>
              <span className="font-display text-silver-500 text-xs tracking-widest">BYE</span>
            </div>
          </div>
          {jv.map((game, i) => <JVRow key={i} game={game} />)}
        </div>
        {/* Playoffs footer */}
        <div className="bg-royal-600 mt-12 px-6 py-4 text-center">
          <p className="font-display text-silver-400 text-sm tracking-[0.4em]">GHSA STATE PLAYOFFS</p>
        </div>

      </div>
    </div>
  )
}
