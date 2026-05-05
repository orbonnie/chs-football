'use client'

import { useState, useMemo } from 'react'
import PlayerCard from './PlayerCard'
import type { Player } from './PlayerCard'

export default function RecruitingFilters({ players }: { players: Player[] }) {
  const [search, setSearch] = useState('')
  const [classYear, setClassYear] = useState('')
  const [position, setPosition] = useState('')

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const fullName = `${p.firstName} ${p.lastName}`.toLowerCase()
      const matchesSearch = fullName.includes(search.toLowerCase())
      const matchesClass = classYear ? p.classYear === Number(classYear) : true
      const matchesPosition = position
        ? p.position.toLowerCase().includes(position.toLowerCase())
        : true
      return matchesSearch && matchesClass && matchesPosition
    })
  }, [players, search, classYear, position])

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white text-black-500 placeholder-royal-900/40 rounded-2xl px-6 py-4 text-sm outline-none"
        />
        <select
          value={classYear}
          onChange={(e) => setClassYear(e.target.value)}
          className="bg-white text-royal-900 rounded-2xl px-6 py-4 text-sm outline-none cursor-pointer min-w-44"
        >
          <option value="">All Classes</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="bg-white text-royal-900 rounded-2xl px-6 py-4 text-sm outline-none cursor-pointer min-w-44"
        >
          <option value="">All Positions</option>
          <option value="Quarterback">QB</option>
          <option value="Running Back">RB</option>
          <option value="Wide Receiver">WR</option>
          <option value="Tight End">TE</option>
          <option value="Offensive Line">OL</option>
          <option value="Defensive Line">DL</option>
          <option value="Linebacker">LB</option>
          <option value="Defensive Back">DB</option>
          <option value="Kicker">K</option>
          <option value="Punter">P</option>
        </select>
      </div>

      {/* Player grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((player) => (
            <PlayerCard key={`${player.number}-${player.lastName}`} player={player} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-display text-white/30 text-3xl tracking-widest">NO PLAYERS FOUND</p>
        </div>
      )}
    </>
  )
}
