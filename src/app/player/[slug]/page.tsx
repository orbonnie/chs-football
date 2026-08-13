export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import InfoCard from "@/components/profile/InfoCard";
import StatCard from "@/components/profile/StatCard";
import { PlayerSocialLink } from "@/components/links/SocialLinks";
import { getSheetData } from "@/lib/sheets";
import { cloudinaryImage } from "@/lib/cloudinary";
import { formatPosition } from "@/lib/positions";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const players = await getSheetData("HS-Players");
  const player = players.find((p) => p.slug === slug);

  if (!player) return {};

  return {
    title: `${player.firstName} ${player.lastName} | Centennial Knights Football`,
    description:
      player.bio ??
      `${player.firstName} ${player.lastName} — #${player.number} ${player.position.split("|").join(" / ")}, Class of ${player.classYear}. Centennial Knights Football.`,
    openGraph: {
      title: `${player.firstName} ${player.lastName} | Centennial Knights Football`,
      description:
        player.bio ??
        `#${player.number} ${player.position.split("|").join(" / ")} • Class of ${player.classYear}`,
      images: player.photo ? [{ url: player.photo }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${player.firstName} ${player.lastName} | Centennial Knights Football`,
      description:
        player.bio ??
        `#${player.number} ${player.position.split("|").join(" / ")} • Class of ${player.classYear}`,
      images: player.photo ? [player.photo] : [],
    },
  };
}

export default async function PlayerPage({ params }: Props) {
  const players = await getSheetData("HS-Players");

  const { slug } = await params;

  const player = players.find((p) => p.slug === slug);

  if (!player) return notFound();

  return (
    <div className="text-white pb-20">
      {/* HERO */}
      <section className="border-b bg-black-500 border-white/10 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-silver-400 text-center tracking-[0.2em] uppercase text-sm mb-6">
            Centennial Knights Football
          </p>

          {/* PHOTO + INFO OVERLAY CARD */}
          <div className="relative w-full max-w-lg max-h-[500px] mx-auto rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-royal-600">
            {/* Background photo */}
            {player.photo && (
              <Image
                src={cloudinaryImage(player.photo, 800)}
                alt={`${player.firstName} ${player.lastName}`}
                fill
                sizes="(min-width: 512px) 512px, 100vw"
                priority
                className="object-cover object-top"
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Jersey number badge */}
            <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-black-500 flex items-center justify-center border border-white/10">
              <span className="font-display text-3xl text-white">
                {player.number}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-full p-6 lg:p-8">
              <h1 className="font-display text-4xl md:text-5xl leading-none tracking-wider">
                {player.firstName.toUpperCase()}
                <br />
                {player.lastName.toUpperCase()}
              </h1>

              <span className="self-start mt-4 text-lg text-white bg-black-500/40">
                #{player.number} • {formatPosition(player.position)} • Class of{" "}
                {player.classYear}
              </span>

              {/* SOCIAL LINKS */}
              {(player.instagramUrl || player.xUrl || player.hudlUrl) && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {player.xUrl && (
                    <PlayerSocialLink
                      label="X"
                      href={player.xUrl}
                      svg={
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="#07102B"
                          className="shrink-0"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      }
                    />
                  )}
                  {player.instagramUrl && (
                    <PlayerSocialLink
                      label="Instagram"
                      href={player.instagramUrl}
                      svg={
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#07102B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      }
                    />
                  )}
                  {player.hudlUrl && (
                    <PlayerSocialLink
                      label="Hudl"
                      href={player.hudlUrl}
                      svg={
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="#07102B"
                        >
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      }
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* INFO GRID */}
          {(player.height ||
            player.weight ||
            player.gpa
          ) &&
          (<div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            <InfoCard label="Height" value={player.height} />
            <InfoCard label="Weight" value={`${player.weight} lbs`} />
            {player.gpa && <InfoCard label="GPA" value={player.gpa} />}
          </div>)}

          {/* BIO */}
          {player.bio && (
            <div className="mt-10 max-w-3xl">
              <h2 className="font-display text-2xl tracking-widest mb-3">
                ABOUT
              </h2>
              <p className="text-white/70 leading-relaxed">{player.bio}</p>
            </div>
          )}
        </div>
      </section>

      {/* OFFERS */}
      {player.offers && player.offers.length > 0 && (
        <section className="bg-silver-400 max-w-6xl mx-auto px-6 py-12 border-b border-black-500/50">
          <h2 className="font-display text-4xl text-black-500 tracking-widest mb-6">
            OFFERS
          </h2>

          <div className="flex flex-wrap gap-4">
            {player.offers.split(",").map((offer: string) => (
              <div
                key={offer}
                className="bg-royal-600 px-6 py-4 rounded-lg font-semibold tracking-wide border border-black-500/20"
              >
                {offer.trim()}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTBALL STATS */}
      {(player.gamesPlayed ||
        player.tackles ||
        player.yards ||
        player.touchdowns) && (
        <section className="bg-white max-w-6xl mx-auto px-6 py-8 border-b border-x-black-500/50">
          <h2 className="font-display text-black-500 text-3xl tracking-widest mb-6">
            FOOTBALL STATS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {player.gamesPlayed && (
              <StatCard label="Games" value={player.gamesPlayed} />
            )}

            {player.tackles && (
              <StatCard label="Tackles" value={player.tackles} />
            )}

            {player.yards && <StatCard label="Yards" value={player.yards} />}

            {player.touchdowns && (
              <StatCard label="TDs" value={player.touchdowns} />
            )}
          </div>
        </section>
      )}

      {/* ATHLETIC METRICS */}
      {(player.bench ||
        player.squat ||
        player.deadlift ||
        player.clean ||
        player.forty) && (
        <section className="bg-white max-w-6xl mx-auto px-6 py-8 border-b border-black-500/30">
        <h2 className="font-display text-black-500 text-3xl tracking-widest mb-6">
          ATHLETIC METRICS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {player.bench && (
            <StatCard label="Bench" value={`${player.bench} lbs`} />
          )}

          {player.squat && (
            <StatCard label="Squat" value={`${player.squat} lbs`} />
          )}

          {player.deadlift && (
            <StatCard label="Deadlift" value={`${player.deadlift} lbs`} />
          )}

          {player.clean && (
            <StatCard label="Clean" value={`${player.clean} lbs`} />
          )}

          {player.forty && (
            <StatCard label="40 Yard" value={`${player.forty}s`} />
          )}
        </div>
      </section>
    )}

      {/* HIGHLIGHTS (HUDL) */}
      {player.hudlUrl && (
        <section className="bg-black-500 max-w-6xl mx-auto px-6 py-12">
          <h2 className="font-display text-silver-400 text-4xl tracking-widest mb-6">
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
  );
}
