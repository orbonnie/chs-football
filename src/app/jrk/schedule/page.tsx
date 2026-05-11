"use client"

import { useState } from "react"
import { sixthGrade, seventhGrade, eighthGrade } from "@/data/jrkSchedule"
import type { JrkGame } from "@/data/jrkSchedule"

function gameTextColor(location: string) {
  if (location === "@") return "text-black-500 font-semibold"
  if (location === "BYE") return "text-silver-700 font-semibold"
  return "text-royal-600 font-bold"
}

function gamePrefix(game: JrkGame) {
  return game.location === 'TBD' ? "" : `${game.location} `
}

const colGrid = "grid grid-cols-[7rem_1fr_5rem_5rem] items-center gap-x-4"

function GradeHeaders() {
  return (
    <div className={`hidden md:grid ${colGrid} bg-silver-400 px-6 py-2 border-b border-gray-400 font-display text-sm tracking-widest uppercase text-gray-700`}>
      <span>Date</span>
      <span>Opponent</span>
      <span className="text-center">Time</span>
      <span className="text-center">Score</span>
    </div>
  )
}

function GameRow({ game }: { game: JrkGame }) {
  const isBye = game.location === "BYE"
  const textColor = gameTextColor(game.location)
  return (
    <div className="px-6 py-4 border-b border-gray-400 last:border-0">
      {/* Mobile */}
      <div className="flex items-start justify-between md:hidden">
        <div>
          <span className={`font-display text-sm tracking-wider block ${textColor}`}>{game.date}</span>
          <span className={`font-display text-lg tracking-wider block ${textColor}`}>
            {isBye ? "BYE WEEK" : `${gamePrefix(game) }${game.opponent.toUpperCase()}`}
          </span>
          {game.note && <span className="text-xs tracking-widest uppercase text-royal-600 mt-0.5 block">{game.note}</span>}
        </div>
        {!isBye && (
          <span className={`font-display text-sm tracking-wider shrink-0 ml-4 ${textColor}`}>
            {game.result || game.time}
          </span>
        )}
      </div>

      {/* Desktop */}
      <div className={`hidden md:grid ${colGrid}`}>
        <span className={`font-display text-base tracking-wider ${textColor}`}>{game.date}</span>
        <div>
          <span className={`font-display text-xl tracking-wider ${textColor}`}>
            {isBye ? "BYE WEEK" : `${gamePrefix(game) }${game.opponent.toUpperCase()}`}
          </span>
          {game.note && (
            <span className="block text-xs tracking-widest uppercase text-royal-600 mt-0.5">{game.note}</span>
          )}
        </div>
        <span className={`text-sm tracking-wider text-center ${isBye ? "invisible" : textColor}`}>{game.time}</span>
        <span className={`text-sm tracking-wider text-center ${textColor}`}>{game.result || "—"}</span>
      </div>
    </div>
  )
}

const grades = [
  { id: "6th", label: "6th Grade", games: sixthGrade },
  { id: "7th", label: "7th Grade", games: seventhGrade },
  { id: "8th", label: "8th Grade", games: eighthGrade },
]

export default function JrkSchedulePage() {
  const [activeGrade, setActiveGrade] = useState("6th")
  const active = grades.find(g => g.id === activeGrade)!

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="mb-10">
          <p className="font-display text-silver-700 text-3xl tracking-widest mt-1 flex items-center gap-6">
            <span className="font-display text-royal-600 text-3xl tracking-[0.2em]">2026</span>
            JR KNIGHTS
          </p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest">SCHEDULE</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {grades.map((grade) => (
            <button
              key={grade.id}
              onClick={() => setActiveGrade(grade.id)}
              className={`font-display tracking-widest uppercase text-sm px-6 py-3 rounded-t-xl transition-all duration-200 -mb-px ${
                activeGrade === grade.id
                  ? "bg-royal-600 text-white border-black-50"
                  : "bg-black-500 text-white border border-black-500/50 hover:bg-gray-500"
              }`}
            >
              {grade.label}
            </button>
          ))}
        </div>

        {/* Active grade */}
        <div className="rounded-b-2xl sm:rounded-2xl sm:rounded-tl-none  overflow-hidden border border-gray-400">
          <div className="bg-royal-600 px-6 py-5 flex items-center justify-between">
            <h2 className="font-display text-white text-3xl tracking-widest leading-none">
              {active.label.toUpperCase()}
            </h2>
            <div className="bg-white/90 px-3 py-1 rounded-lg flex items-center gap-3 sm:gap-6">

              <span className="font-display text-royal-600 text-md tracking-widest">HOME</span>

              <span className="text-black-500">/</span>
              <span className="font-display text-black-500 text-md tracking-widest">AWAY</span>
              <span className="text-black-500/70">/</span>
              <span className="font-display text-silver-700 text-md tracking-widest">BYE</span>
            </div>
          </div>
          <GradeHeaders />
          {active.games.map((game, i) => (
            <GameRow key={i} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}
