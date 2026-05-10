import type { Metadata } from "next";
import { Play } from "lucide-react";
import { varsity, jv, freshman } from "@/data/schedule";
import type { Game } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Schedule | Centennial Knights Football",
};

function gameTextColor(location: string) {
  if (location === "@") return "text-black-500 font-semibold"; // away — black
  if (location === "BYE") return "text-silver-700 font-semibold"; // bye — gray
  return "text-royal-600 font-bold"; // home — blue
}

const colGrid =
  "grid grid-cols-[8rem_minmax(0,20rem)_14rem_5rem_5rem_4rem] items-center";

function ColumnHeaders() {
  return (
    <div
      className={`hidden md:grid ${colGrid} px-6 py-2 border-b border-gray-200 text-gray-500 bg-gray-50 font-display text-xs tracking-widest uppercase `}
    >
      <span className="font-display text-xs tracking-widest uppercase text-left">
        Date
      </span>
      <span>Opponent</span>
      <span className="text-center">Notes</span>
      <span className="text-center">Time</span>
      <span className="text-center">Score</span>
      <span className="text-center">Watch</span>
    </div>
  );
}

function VarsityRow({ game }: { game: Game }) {
  const isBye = game.location === "BYE";
  const textColor = gameTextColor(game.location);
  return (
    <div className="px-6 py-4 border-b border-gray-400 last:border-0">
      {/* Mobile */}
      <div className="flex items-start justify-between md:hidden">
        <div>
          <span
            className={`font-display text-sm tracking-wider block ${textColor}`}
          >
            {game.date}
          </span>
          <span
            className={`font-display text-xl tracking-wider block ${textColor}`}
          >
            {isBye
              ? "BYE WEEK"
              : game.location === "scrimmage"
                ? `${game.opponent.toUpperCase()} ${game.location.toUpperCase()}`
                : `${game.location.toUpperCase()} ${game.opponent.toUpperCase()}`}
          </span>
          {game.note && (
            <span className="text-xs tracking-widest uppercase text-royal-600 mt-0.5 block">
              {game.note}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {!isBye && (
            <span
              className={`font-display text-sm tracking-wider ${textColor}`}
            >
              {game.result ? game.result : game.time}
            </span>
          )}
          {!isBye && (
            <a
              href={game.recording || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`mx-auto flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 ${
                game.recording
                  ? "bg-black-500/80 hover:bg-black-500 text-white border border-white/20"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed pointer-events-none"
              }`}
              aria-label="Watch recording"
            >
              <Play className={`w-3.5 h-3.5 fill-current`} />
            </a>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className={`hidden md:grid ${colGrid}`}>
        <span
          className={`font-display text-lg tracking-wider text-left ${textColor}`}
        >
          {game.date}
        </span>
        <span className={`font-display text-2xl tracking-wider ${textColor}`}>
          {isBye
            ? "BYE WEEK"
            : game.location === "scrimmage"
              ? `${game.opponent.toUpperCase()} ${game.location.toUpperCase()}`
              : `${game.location.toUpperCase()} ${game.opponent.toUpperCase()}`}
        </span>
        <span
          className={`text-xs tracking-widest uppercase text-royal-600 bg-royal-600/10 px-2 py-1 rounded text-center truncate w-fit whitespace-pre-line ${!game.note ? "invisible" : ""}`}
        >
          {game.note || ""}
        </span>
        <span
          className={`text-sm tracking-wider text-center ${isBye ? "invisible" : textColor}`}
        >
          {game.time}
        </span>
        {!isBye && (
          <span className={`text-sm tracking-wider text-center ${textColor}`}>
            {game.result || "—"}
          </span>
        )}

        {!isBye && (
          <a
            href={game.recording || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`justify-self-center flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              game.recording
                ? "bg-black-500/80 hover:bg-black-500 text-white border border-white/20"
                : "bg-gray-100 text-gray-300 cursor-not-allowed pointer-events-none"
            }`}
            aria-label="Watch recording"
          >
            <Play className={`w-3.5 h-3.5 fill-current`} />
          </a>
        )}
      </div>
    </div>
  );
}

const jvColGrid =
  "grid grid-cols-[4rem_1fr_4rem_4rem_2rem] items-center gap-x-4";

function JVRow({ game }: { game: Game }) {
  const isBye = game.location === 'BYE'
  const textColor = gameTextColor(game.location)
  return (
    <div className="px-4 py-3 border-b border-black-500/50 last:border-0">
      {/* Mobile */}
      <div className="flex items-start justify-between md:hidden">
        <div>
          <span className={`font-display text-sm tracking-wider block ${textColor}`}>{game.date}</span>
          <span className={`font-display text-sm tracking-wider block ${textColor}`}>
            {isBye ? 'BYE WEEK' : `${game.location.toUpperCase()} ${game.opponent.toUpperCase()}`}
          </span>
        </div>
        {!isBye && (
          <div className="flex flex-col items-center gap-1">
            <span className={`font-display text-xs tracking-wider ${textColor}`}>
              {game.result ? game.result : game.time}
            </span>
              <a
                href={game.recording || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`justify-self-center flex items-center justify-center w-5 h-5 rounded-md transition-all duration-200 ${
                  game.recording
                    ? 'bg-black-500/80 hover:bg-black-500 text-white border border-white/20'
                    : 'bg-white text-gray-300 cursor-not-allowed pointer-events-none'
                }`}
                aria-label="Watch recording"
              >
              <Play className="w-3 h-3 fill-current" />
            </a>
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className={`hidden md:grid ${jvColGrid}`}>
        <span className={`font-display text-sm tracking-wider ${textColor}`}>{game.date}</span>
        <span className={`font-display text-sm tracking-wider ${textColor}`}>
          {isBye ? 'BYE WEEK' : `${game.location.toUpperCase()} ${game.opponent.toUpperCase()}`}
        </span>
        <span className={`text-sm tracking-wider text-right ${isBye ? 'invisible' : textColor}`}>{game.time}</span>
        <span className={`text-sm tracking-wider text-right ${textColor}`}>{game.result || '—'}</span>
          <a
            href={game.recording || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`justify-self-center flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 ${
              game.recording
                ? 'bg-black-500/80 hover:bg-black-500 text-white border border-white/20'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed pointer-events-none'
            }`}
            aria-label="Watch recording"
          >
          <Play className="w-3 h-3 fill-current" />
        </a>
      </div>
    </div>
  )
}

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="font-display text-royal-600 text-3xl tracking-[0.4em]">
            2026
          </p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest">
            SCHEDULE
          </h1>
        </div>

        {/* Varsity */}
        <div className="bg-silver-00 rounded-2xl overflow-hidden mb-14">
          {/* Varsity header */}
          <div className="bg-black-500 px-6 py-5 flex items-end justify-between">
            <div>
              <h2 className="font-display text-white text-4xl tracking-widest leading-none">
                VARSITY
              </h2>
            </div>
            {/* Color key */}
            <div className="flex items-center gap-1 sm:gap-6 pb-1">
              <span className="font-display text-royal-400 text-xs sm:text-sm tracking-wider sm:tracking-widest">
                HOME
              </span>
              <span className="text-white/70">/</span>
              <span className="bg-white px-0.5 sm:px-1 rounded-md sm:rounded-lg">
                <span className="font-display text-black-500 text-xs sm:text-sm tracking-wider sm:tracking-widest">
                  AWAY
                </span>
              </span>
              <span className="text-white/70">/</span>
              <span className="font-display text-silver-500 text-xs sm:text-sm tracking-wider sm:tracking-widest">
                BYE
              </span>
            </div>
          </div>

          <ColumnHeaders />
          {/* Varsity rows */}
          {varsity.map((game, i) => (
            <VarsityRow key={i} game={game} />
          ))}
        </div>

        {/* JV + Freshman side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* JV */}
          <div className="bg-silver-300 rounded-2xl overflow-hidden pb-5 mb-8">
            <div className="bg-black-500 px-6 py-4">
              <h2 className="font-display text-white text-2xl tracking-widest leading-none">
                JV
              </h2>
            </div>
            {jv.map((game, i) => (
              <JVRow key={i} game={game} />
            ))}
          </div>

          {/* Freshman */}
          <div className="bg-silver-300 rounded-2xl overflow-hidden pb-5 mb-8">
            <div className="bg-black-500 px-6 py-4">
              <h2 className="font-display text-white text-2xl tracking-widest leading-none">
                FRESHMAN
              </h2>
            </div>
            {freshman.map((game, i) => (
              <JVRow key={i} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
