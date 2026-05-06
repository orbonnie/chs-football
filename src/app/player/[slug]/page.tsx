import { players } from "@/data/players"
import InfoCard from "@/components/profile/InfoCard"
import StatCard from "@/components/profile/StatCard"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PlayerPage({ params }: Props) {
  const { slug } = await params

  const player = players.find((p) => p.slug === slug)

  if (!player) return notFound()

  return (
    <div className="bg-black-500 text-white pt-24 pb-20">

      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10">

          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">

            {/* PHOTO */}
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden bg-royal-700 border border-white/10">

              {!player.photo ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-8xl text-white/80 tracking-widest">
                    {player.firstName[0]}
                    {player.lastName[0]}
                  </span>
                </div>
              ) : (
                <Image
                  src={player.photo}
                  alt={`${player.firstName} ${player.lastName}`}
                  fill
                  className="object-cover object-top"
                />
              )}

              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-black/80 flex items-center justify-center border border-white/10">
                <span className="font-display text-3xl text-white">
                  {player.number}
                </span>
              </div>
            </div>

            {/* INFO */}
            <div className="flex-1 w-full">

              <p className="text-silver-400 tracking-[0.3em] uppercase text-sm">
                Centennial Knights Football
              </p>

              <h1 className="font-display text-5xl md:text-7xl leading-none tracking-wider mt-2">
                {player.firstName.toUpperCase()}
                <br />
                {player.lastName.toUpperCase()}
              </h1>

              <p className="mt-5 text-lg text-white/70">
                #{player.number} • {player.position.join(" / ")} • Class of{" "}
                {player.classYear}
              </p>

              {/* INFO GRID */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">

                <InfoCard label="Height" value={player.height} />
                <InfoCard label="Weight" value={`${player.weight} lbs`} />
                {player.gpa && <InfoCard label="GPA" value={player.gpa} />}
                {player.hometown && (
                  <InfoCard label="Hometown" value={player.hometown} />
                )}
              </div>

              {/* BIO */}
              {player.bio && (
                <div className="mt-10 max-w-3xl">
                  <h2 className="font-display text-2xl tracking-widest mb-3">
                    PLAYER BIO
                  </h2>

                  <p className="text-white/70 leading-relaxed">
                    {player.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTBALL STATS */}
      <section className="bg-white max-w-6xl mx-auto px-6 py-12">

        <h2 className="font-display text-black-500 text-3xl tracking-widest mb-6">
          FOOTBALL STATS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <StatCard
            label="Games"
            value={player.footballStats.gamesPlayed}
          />

          {player.footballStats.tackles !== undefined && (
            <StatCard label="Tackles" value={player.footballStats.tackles} />
          )}

          {player.footballStats.yards !== undefined && (
            <StatCard label="Yards" value={player.footballStats.yards} />
          )}

          {player.footballStats.touchdowns !== undefined && (
            <StatCard label="TDs" value={player.footballStats.touchdowns} />
          )}
        </div>
      </section>

      {/* ATHLETIC METRICS */}
      {player.weightRoomStats && (
        <section className="bg-white max-w-6xl mx-auto px-6 pb-12">

          <h2 className="font-display text-black-500 text-3xl tracking-widest mb-6">
            ATHLETIC METRICS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            {player.weightRoomStats.bench && (
              <StatCard label="Bench" value={`${player.weightRoomStats.bench} lbs`} />
            )}

            {player.weightRoomStats.squat && (
              <StatCard label="Squat" value={`${player.weightRoomStats.squat} lbs`} />
            )}

            {player.weightRoomStats.deadlift && (
              <StatCard label="Deadlift" value={`${player.weightRoomStats.deadlift} lbs`} />
            )}

            {player.weightRoomStats.clean && (
              <StatCard label="Clean" value={`${player.weightRoomStats.clean} lbs`} />
            )}

            {player.weightRoomStats.forty && (
              <StatCard label="40 Yard" value={`${player.weightRoomStats.forty}s`} />
            )}
          </div>
        </section>
      )}

      {/* OFFERS */}
      {player.offers && player.offers.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">

          <h2 className="font-display text-4xl tracking-widest mb-6">
            OFFERS
          </h2>

          <div className="flex flex-wrap gap-4">

            {player.offers.map((offer) => (
              <div
                key={offer}
                className="bg-royal-600 px-6 py-4 rounded-2xl font-semibold tracking-wide"
              >
                {offer}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HIGHLIGHTS (HUDL) */}
        {player.hudlUrl && (
          <section className="bg-silver-500 max-w-6xl mx-auto px-6 py-12">
            <h2 className="font-display text-royal-600 text-4xl tracking-widest mb-6">
              HIGHLIGHTS
            </h2>
            <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
              <iframe
                src={player.hudlUrl}
                title="Highlights"
                className="w-full h-full border-2 border-black bg-black shadow-2xl ring-1 ring-white/10"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </section>
        )}

    </div>
  )
}
