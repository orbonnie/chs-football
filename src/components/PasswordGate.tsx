"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PasswordGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChecking(true);
    setError("");

    try {
      const res = await fetch("api/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({password})
      });

      if (res.status === 401) {
        setError("Incorrect Password");
        setChecking(false);
        return;
      }
      if (!res.ok) throw new Error();

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setChecking(false);
    }
  };

  return (
    <section className="max-w-sm mx-auto py-24 px-6">
      <h1 className="font-display text-black-500 text-2xl tracking-widest mb-6 text-center">
        ADMIN ACCESS
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          autoFocus
          className="text-black-500 w-full border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          type="submit"
          disabled={checking}
          className="w-full bg-royal-600 hover:bg-royal-700 text-white font-display tracking-widest uppercase py-3 rounded-md transition-colors disabled:opacity-50"
        >
          {checking ? "Checking..." : "Enter"}
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </section>
  );
}