"use client"

import { useState } from "react"
import { sixthRoster, seventhRoster, eighthRoster } from "@/data/jrkRoster"
import type { JrkPlayer } from "@/data/jrkRoster"

const grades = [
  { id: "6th", label: "6th Grade", roster: sixthRoster },
  { id: "7th", label: "7th Grade", roster: seventhRoster },
  { id: "8th", label: "8th Grade", roster: eighthRoster },
]

function PlayerCard({ player }: { player: JrkPlayer }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-300 last:border-0">
      <span className="font-display text-royal-600 text-2xl tracking-widest w-12 shrink-0">
        #{player.number}
      </span>
      <span className="font-display text-black-500 text-lg tracking-wider flex-1">
        {player.name.toUpperCase()}
      </span>
      <span className="text-xs tracking-widest uppercase text-royal-600 bg-royal-600/10 px-3 py-1 rounded-lg shrink-0">
        {player.position}
      </span>
    </div>
  )
}

export default function JrkRosterPage() {
  const [activeGrade, setActiveGrade] = useState("6th")
  const active = grades.find(g => g.id === activeGrade)!

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="mb-10">
          <p className="font-display text-silver-700 text-3xl tracking-widest mt-1 flex items-center gap-4">
            <span className="font-display text-royal-600 text-3xl tracking-[0.2em]">2026</span>
            JR KNIGHTS
          </p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest">ROSTER</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 pb-0">
          {grades.map((grade) => (
            <button
              key={grade.id}
              onClick={() => setActiveGrade(grade.id)}
              className={`flex items-center gap-2 font-display tracking-widest uppercase text-sm px-6 py-3 rounded-t-xl transition-all duration-200 -mb-px ${
                activeGrade === grade.id
                  ? "bg-royal-600 text-white border-black-500"
                  : "bg-black-500 text-white border border-black-500/50 hover:bg-gray-500"
              }`}
            >
              {grade.label}
            </button>
          ))}
        </div>

        {/* Roster table */}
        <div className="rounded-2xl rounded-tl-none overflow-hidden border border-gray-400">
          {/* Header */}
          <div className="bg-royal-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-white text-2xl tracking-widest">
                {active.label.toUpperCase()}
              </h2>
            </div>
            <span className="font-display text-silver-200 text-sm tracking-widest">
              {active.roster.length} PLAYERS
            </span>
          </div>

          {/* Column headers */}
          <div className="flex items-center px-6 py-2 border-b border-gray-400 text-md tracking-widest bg-gray-200 uppercase text-gray-700">
            <span className="font-display w-12 shrink-0">#</span>
            <span className="font-display flex-1">Name</span>
            <span className="font-display">Position</span>
          </div>

          {/* Players */}
          {active.roster.length > 0 ? (
            [...active.roster]
              .map((player, i) => <PlayerCard key={i} player={player} />)
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="font-display text-silver-500 text-xl tracking-widest">ROSTER COMING SOON</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}