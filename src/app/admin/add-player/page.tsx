"use client";

import { useState } from "react";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const positions = [
  "Quarterback",
  "Running Back",
  "Wide Receiver",
  "Tight End",
  "Offensive Line",
  "Defensive Line",
  "Defensive End",
  "Linebacker",
  "Defensive Back",
  "ATH",
  "Kicker",
  "Punter",
];

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset!);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!res.ok) throw new Error("Image upload failed");
  const data = await res.json();
  return data.public_id as string;
}

// ---------- FORM ----------
export function AddPlayerForm()  {
  const [number, setNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [classYear, setClassYear] = useState("");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [existingPhoto, setExistingPhoto] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gpa, setGpa] = useState("");
  const [bio, setBio] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState("");
  const [yards, setYards] = useState("");
  const [touchdowns, setTouchdowns] = useState("");
  const [tackles, setTackles] = useState("");
  const [bench, setBench] = useState("");
  const [squat, setSquat] = useState("");
  const [deadlift, setDeadlift] = useState("");
  const [clean, setClean] = useState("");
  const [forty, setForty] = useState("");
  const [hudlUrl, setHudlUrl] = useState("");
  const [offers, setOffers] = useState("");

  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [lookupStatus, setLookupStatus] = useState<
    "idle" | "checking" | "found" | "new"
  >("idle");

  const runLookup = async () => {
    if (!firstName.trim() || !lastName.trim()) return;
    setLookupStatus("checking");

    const res = await fetch(
      `/api/players/lookup?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`,
    );
    const data = await res.json();

    if (data.found) {
      const [
        ,
        num,
        ,
        ,
        clsYear,
        pos,
        photo,
        ht,
        wt,
        gpaVal,
        bioVal,
        gp,
        yds,
        td,
        tkl,
        benchVal,
        squatVal,
        deadliftVal,
        cleanVal,
        fortyVal,
        hudl,
        offersVal,
      ] = data.values;

      setNumber(num ?? "");
      setClassYear(clsYear ?? "");
      setSelectedPositions(pos ?? []);
      setExistingPhoto(photo ?? "");
      setHeight(ht ?? "");
      setWeight(wt ?? "");
      setGpa(gpaVal ?? "");
      setBio(bioVal ?? "");
      setGamesPlayed(gp ?? "");
      setYards(yds ?? "");
      setTouchdowns(td ?? "");
      setTackles(tkl ?? "");
      setBench(benchVal ?? "");
      setSquat(squatVal ?? "");
      setDeadlift(deadliftVal ?? "");
      setClean(cleanVal ?? "");
      setForty(fortyVal ?? "");
      setHudlUrl(hudl ?? "");
      setOffers(offersVal ?? "");
      setLookupStatus("found");
    } else {
      setNumber("");
      setClassYear("");
      setSelectedPositions([]);
      setExistingPhoto("");
      setFile(null);
      setHeight("");
      setWeight("");
      setGpa("");
      setBio("");
      setGamesPlayed("");
      setYards("");
      setTouchdowns("");
      setTackles("");
      setBench("");
      setSquat("");
      setDeadlift("");
      setClean("");
      setForty("");
      setHudlUrl("");
      setOffers("");
      setLookupStatus("new");
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");

    try {
      const publicId = file ? await uploadImage(file) : existingPhoto;

      const res = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number,
          firstName,
          lastName,
          classYear,
          selectedPositions,
          photo: publicId,
          height,
          weight,
          gpa,
          bio,
          gamesPlayed,
          yards,
          touchdowns,
          tackles,
          bench,
          squat,
          deadlift,
          clean,
          forty,
          hudlUrl,
          offers,
        }),
      });

      if (res.status === 401) {
        setErrorMsg("Your session expired. Please refresh and log in again.");
        setStatus("error");
        return;
      }
      if (!res.ok) throw new Error("Failed to save player");

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
        ADD / UPDATE PLAYER
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
            <label className={labelClass}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={runLookup}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={runLookup}
              required
              className={inputClass}
            />
          </div>
        </div>

        {lookupStatus === "checking" && (
          <p className="text-sm text-gray-400">Checking for existing player…</p>
        )}
        {lookupStatus === "found" && (
          <p className="text-sm text-royal-600">
            Existing player found — fields below are pre-filled. Editing and
            submitting will update this player.
          </p>
        )}
        {lookupStatus === "new" && (
          <p className="text-sm text-gray-400">
            No existing player found — this will add a new one.
          </p>
        )}

        <div>
          <label className={labelClass}>Position (Select up to 2)</label>

          <div className="grid grid-cols-2 gap-2">
            {positions.map((position) => (
              <label key={position} className="flex items-center gap-2 text-black-500">
                <input
                  type="checkbox"
                  value={position}
                  checked={selectedPositions.includes(position)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPositions([
                        ...selectedPositions,
                        position,
                      ]);
                    } else {
                      setSelectedPositions(
                        selectedPositions.filter((p) => p !== position)
                      );
                    }
                  }}
                />

                {position}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Class Year</label>
          <select
            value={classYear}
            onChange={(e) => setClassYear(e.target.value)}
            required
            className={inputClass}
          >
            <option value="">Select a class</option>
            <option value="2027">2027</option>
            <option value="2027">2028</option>
            <option value="2027">2029</option>
            <option value="2027">2030</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Height</label>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Weight</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>GPA</label>
          <input
            type="text"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className={inputClass}
          />
        </div>

        <h2 className="font-display text-black-500 text-lg tracking-widest pt-2">
          STATS
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Games Played</label>
            <input
              type="text"
              value={gamesPlayed}
              onChange={(e) => setGamesPlayed(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Yards</label>
            <input
              type="text"
              value={yards}
              onChange={(e) => setYards(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Touchdowns</label>
            <input
              type="text"
              value={touchdowns}
              onChange={(e) => setTouchdowns(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Tackles</label>
            <input
              type="text"
              value={tackles}
              onChange={(e) => setTackles(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <h2 className="font-display text-black-500 text-lg tracking-widest pt-2">
          LIFTS
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Bench</label>
            <input
              type="text"
              value={bench}
              onChange={(e) => setBench(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Squat</label>
            <input
              type="text"
              value={squat}
              onChange={(e) => setSquat(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Deadlift</label>
            <input
              type="text"
              value={deadlift}
              onChange={(e) => setDeadlift(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Clean</label>
            <input
              type="text"
              value={clean}
              onChange={(e) => setClean(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>40-Yard Dash</label>
            <input
              type="text"
              value={forty}
              onChange={(e) => setForty(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Hudl URL</label>
          <input
            type="text"
            value={hudlUrl}
            onChange={(e) => setHudlUrl(e.target.value)}
            placeholder="https://hudl.com/..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Offers</label>
          <input
            type="text"
            value={offers}
            onChange={(e) => setOffers(e.target.value)}
            placeholder="Comma-separated list"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Photo{" "}
            {lookupStatus === "found" && "(leave blank to keep current photo)"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-black-500 w-full"
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
              ? "Update Player"
              : "Add Player"}
        </button>

        {status === "done" && (
          <p className="text-green-600 text-sm text-center">Player saved!</p>
        )}
        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}
      </form>
    </section>
  );
}

// ---------- PAGE ----------
export default function AddPlayerPage() {
  return <AddPlayerForm />;
}