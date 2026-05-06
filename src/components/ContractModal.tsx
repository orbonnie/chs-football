"use client";
import { useState } from "react";

type AgreementModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  step: "view" | "sign";
  setStep: (v: "view" | "sign") => void;
};

export default function AgreementModal({
  open,
  setOpen,
  step,
  setStep,
}: AgreementModalProps) {
  const [playerFirst, setPlayerFirst] = useState("");
  const [playerLast, setPlayerLast] = useState("");
  const [parentFirst, setParentFirst] = useState("");
  const [parentLast, setParentLast] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();

    const fields = {
      playerFirst,
      playerLast,
      parentFirst,
      parentLast,
      date,
      email,
    };

    const hasEmpty = Object.values(fields).some(
      (v) => typeof v === "string" && v.trim() === "",
    );

    if (hasEmpty) {
      setError("All fields are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerFirst,
          playerLast,
          parentFirst,
          parentLast,
          date,
          email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-silver-300 w-full h-full sm:h-auto sm:max-w-3xl rounded-lg shadow-xl overflow-y-auto s:max-h-[90vh]">
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            {/* <h2 className="text-xl font-bold text-gray-800">
              Agreement Form
            </h2> */}

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="px-6 py-6 text-gray-800">
            {/* SIGN FORM */}
            {submitted ? (
              <div className="text-center py-12">
                <p className="font-display text-royal-600 text-4xl tracking-widest mb-4">
                  SUBMITTED
                </p>
                <p className="text-gray-600">
                  Thank you for completing the agreement.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-8 bg-royal-600 text-white font-bold px-8 py-3 rounded hover:bg-royal-700 transition"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div>
                  <h3 className="text-royal-600 text-lg font-bold uppercase tracking-wider mb-2">
                    Player Name
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If your player understands and agrees to the contract, enter
                    their FULL NAME.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700">
                        First Name{" "}
                        <span className="text-red-500">(required)</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={playerFirst}
                        onChange={(e) => setPlayerFirst(e.target.value)}
                        className="w-full border px-3 py-2 rounded mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700">
                        Last Name{" "}
                        <span className="text-red-500">(required)</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={playerLast}
                        onChange={(e) => setPlayerLast(e.target.value)}
                        className="w-full border px-3 py-2 rounded mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-royal-600 text-lg font-bold uppercase tracking-wider mb-2">
                    Parent / Guardian Name
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you understand and agree to the contract, enter your FULL
                    NAME.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700">
                        First Name{" "}
                        <span className="text-red-500">(required)</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={parentFirst}
                        onChange={(e) => setParentFirst(e.target.value)}
                        className="w-full border px-3 py-2 rounded mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700">
                        Last Name{" "}
                        <span className="text-red-500">(required)</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={parentLast}
                        onChange={(e) => setParentLast(e.target.value)}
                        className="w-full border px-3 py-2 rounded mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Date <span className="text-red-500">(required)</span>
                  </label>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Email <span className="text-red-500">(required)</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-royal-600 text-white font-bold px-8 py-3 rounded hover:bg-royal-700 transition disabled:opacity-50"
                  >
                    {submitting ? "SUBMITTING..." : "SUBMIT"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
