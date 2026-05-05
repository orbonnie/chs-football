"use client";

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
  if (!open) return null;

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-silver-300 w-full max-w-3xl rounded-lg shadow-xl overflow-auto max-h-[90vh]">

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
              <form className="space-y-10">

                {/* PLAYER SECTION */}
                <div>
                  <h3 className="text-royal-600 text-lg font-bold uppercase tracking-wider mb-2">
                    Player Name
                  </h3>
                  <p className="text-sm text-black-500 mb-4">
                    If your player understands and agrees to the contract, enter their FULL NAME.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700">
                        First Name <span className="text-red-500">(required)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700">
                        Last Name <span className="text-red-500">(required)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* PARENT SECTION */}
                <div>
                  <h3 className="text-royal-600 text-lg font-bold uppercase tracking-wider mb-2">
                    Parent / Guardian Name
                  </h3>
                  <p className="text-sm text-black-500 mb-4">
                    If you understand and agree to the contract, enter your FULL NAME.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700">
                        First Name <span className="text-red-500">(required)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700">
                        Last Name <span className="text-red-500">(required)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* DATE */}
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Date <span className="text-red-500">(required)</span>
                  </label>

                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>

                {/* SUBMIT */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-royal-600 text-white font-bold px-8 py-3 rounded hover:bg-royal-700 transition"
                  >
                    SUBMIT
                  </button>
                </div>

              </form>

          </div>
        </div>
      </div>
    </>
  );
}
