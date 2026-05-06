"use client";

import { useState } from "react";
import ContractModal from "@/components/ContractModal";

export default function AgreementPage() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"view" | "sign">("view");

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* AGREEMENT CONTENT (like North Cobb page) */}
      <div className="max-w-4xl mx-auto text-black-500 text-center px-6 space-y-6 text-sm leading-relaxed">
        <h1 className="text-3xl font-bold mb-16">2026 Season Commitment</h1>

        <p>...your full agreement text here...</p>
        <p>...more sections...</p>
        <p>...scrollable content...</p>
      </div>

      {/* CTA AT BOTTOM */}
      <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
        <button
          onClick={() => {
            setStep("view");
            setOpen(true);
          }}
          className="bg-royal-600 text-white font-bold px-8 py-4 uppercase tracking-widest hover:bg-royal-700 transition rounded-lg"
        >
          Im Ready To Commit
        </button>
      </div>

      {/* MODAL */}
      <ContractModal
        open={open}
        setOpen={setOpen}
        step={step}
        setStep={setStep}
      />
    </div>
  );
}
