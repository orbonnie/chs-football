import { getNextGame } from '@/data/schedule'

export default function NextGame() {
  const game = getNextGame()

    if (!game) {
    return (
      <section className="bg-royal-800 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-silver-400 text-lg tracking-[0.4em] mb-4">SEASON COMPLETE</p>
          <h2 className="font-display text-white text-6xl tracking-widest">SEE YOU NEXT YEAR</h2>
        </div>
      </section>
    )
  }

  const isAway = game.location === '@'
  return (
    <section className="bg-black-500 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">

        <p className="font-display text-silver-400 text-lg tracking-[0.4em] mb-2">NEXT GAME</p>

        <h2 className="font-display text-white text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-wider mb-2">
          CENTENNIAL
        </h2>
        <p className="font-display text-white/30 text-4xl tracking-widest mb-2">
          {game.location}
        </p>
        <h2 className="font-display text-silver-400 text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-wider mb-8">
          {game.opponent.toUpperCase()}
        </h2>

        <div className="border border-white/10 inline-block px-8 py-4 mb-8">
          <p className="text-white/50 text-sm tracking-widest uppercase">Varsity Football</p>
          <p className="text-white font-semibold text-lg mt-1">{game.date} · {game.time}</p>
          <p className="text-silver-500 text-sm mt-1">
            {isAway ? `Away @ ${game.opponent}` : 'Centennial High School · Roswell, GA'}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <a
            href="/schedule"
            className="bg-royal-600 text-white font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-royal-500 transition-colors rounded-lg"
          >
            Full Schedule
          </a>
        </div>
      </div>
    </section>
  )
}
