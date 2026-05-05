// src/components/PlayerCard.tsx
import Image from 'next/image'

export type Player = {
  number: number
  firstName: string
  lastName: string
  classYear: number
  position: string
  photo: string
  profileUrl?: string
}

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col border border-royal-800/20">

      {/* Photo with jersey number badge */}
      <div className="relative aspect-[6/7] bg-royal-700">
        {!player.photo ? (
          <div className="absolute inset-0 flex items-center justify-center bg-royal-600">
            <span className="text-white text-7xl font-bold">
              {player.firstName[0]}{player.lastName[0]}
            </span>
          </div>
        ) : (
          <Image
            src={player.photo}
            alt={`${player.firstName} ${player.lastName}`}
            fill
            className="object-cover object-top"
            onError={(e) => {
              // Hide broken image so the parent bg-royal-600 shows through
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        )}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black-500 flex items-center justify-center">
          <span className="font-display text-white text-xl">{player.number}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col items-center text-center px-6 pt-6 pb-4 flex-1">
        <h3 className="font-display text-black-500 text-3xl leading-tight tracking-wider">
          {player.firstName.toUpperCase()}<br />{player.lastName.toUpperCase()}
        </h3>

        {/* Class year pill */}
        <span className="mt-3 bg-royal-600 text-white text-sm font-bold px-5 py-1.5 rounded-full">
          {player.classYear}
        </span>

        <p className="mt-4 text-black-500/70 text-sm font-medium">
          {player.position}
        </p>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <a
          href={player.profileUrl ?? '#'}
          className="block w-full bg-royal-600 hover:bg-royal-500 text-white font-display text-lg tracking-widest text-center py-4 rounded-xl transition-colors"
        >
          VIEW PROFILE
        </a>
      </div>
    </div>
  )
}
