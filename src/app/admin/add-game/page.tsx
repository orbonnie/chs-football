"use client";

import { useState } from "react";

export function AddGameForm() {
  const [team, setTeam] = useState("");
  const [isoDate, setIsoDate] = useState("");
  const [opponent, setOpponent] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState("");
  const [recording, setRecording] = useState("");

  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [lookupStatus, setLookupStatus] = useState<
    "idle" | "checking" | "found" | "new"
  >("idle");

  const runLookup = async () => {
    if (!isoDate.trim() || !opponent.trim() || !team.trim()) return;
    setLookupStatus("checking");

    const res = await fetch(
      `/api/games/lookup?isoDate=${encodeURIComponent(isoDate)}&opponent=${encodeURIComponent(opponent)}&team=${encodeURIComponent(team)}`,
    );
    const data = await res.json();

    if (data.found) {
      // values order: team, date, isoDate, opponent, time, note, location, result, recording
      const [tm, , , , tm2, noteVal, loc, res2, rec] = data.values;
      setTeam(tm ?? "");
      setTime(tm2 ?? "");
      setNote(noteVal ?? "");
      setLocation(loc ?? "");
      setResult(res2 ?? "");
      setRecording(rec ?? "");
      setLookupStatus("found");
    } else {
      setTime("");
      setNote("");
      setLocation("");
      setResult("");
      setRecording("");
      setLookupStatus("new");
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");

    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team,
          isoDate,
          opponent,
          time,
          note,
          location,
          result,
          recording,
        }),
      });

      if (res.status === 401) {
        setErrorMsg("Your session expired. Please refresh and log in again.");
        setStatus("error");
        return;
      }
      if (!res.ok) throw new Error("Failed to save game");

      setStatus("done");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const inputClass =
    "text-black-500 w-full border border-gray-300 rounded-md px-3 py-2";
  const labelClass = "block text-sm font-medium text-black-500 mb-1";

  return (
    <section className="max-w-xl mt-10 mx-auto p-16 px-6">
      <h1 className="font-display text-black-500 text-4xl tracking-widest mb-8 text-center">
        ADD / UPDATE GAME
      </h1>

      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            (e.target as HTMLElement).tagName !== "TEXTAREA" &&
            (e.target as HTMLElement).getAttribute("type") !== "submit"
          ){
            e.preventDefault();

          }
        }}
        className="space-y-5"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              value={isoDate}
              onChange={(e) => setIsoDate(e.target.value)}
              onBlur={runLookup}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Opponent</label>
            <input
              type="text"
              value={opponent}
              onChange={(e) => setOpponent(e.target.value)}
              onBlur={runLookup}
              required
              className={inputClass}
            />
          </div>
        </div>

        {lookupStatus === "checking" && (
          <p className="text-sm text-gray-400">Checking for existing game…</p>
        )}
        {lookupStatus === "found" && (
          <p className="text-sm text-royal-600">
            Existing game found — fields below are pre-filled. Editing and
            submitting will update this game.
          </p>
        )}
        {lookupStatus === "new" && (
          <p className="text-sm text-gray-400">
            No existing game found — this will add a new one.
          </p>
        )}

        <div>
          <label className={labelClass}>Team</label>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            onBlur={runLookup}
            required
            className={inputClass}
          >
            <option value="">Select a team</option>
            <option value="varsity">Varsity</option>
            <option value="jv">JV</option>
            <option value="freshman">Freshman</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Time</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="7:30 PM"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className={inputClass}
            >
              <option value="">Select a location</option>
              <option value="vs">Home</option>
              <option value="@">Away</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Result</label>
          <input
            type="text"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="W 21-14"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Recording URL</label>
          <input
            type="text"
            value={recording}
            onChange={(e) => setRecording(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={status === "saving"}
          className="w-full bg-royal-600 hover:bg-royal-700 text-white font-display tracking-widest uppercase py-3 rounded-md transition-colors disabled:opacity-50"
        >
          {status === "saving"
            ? "Saving..."
            : lookupStatus === "found"
              ? "Update Game"
              : "Add Game"}
        </button>

        {status === "done" && (
          <p className="text-green-600 text-sm text-center">Game saved!</p>
        )}
        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}
      </form>
    </section>
  );
}

// ---------- PAGE ----------
export default function AddGamePage() {
  return <AddGameForm />;
}
