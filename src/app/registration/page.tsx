import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Centennial Knights Football",
};

const TEAMSNAP_URL = "https://registration.teamsnap.com/form/48104";
const K5_REG_URL =
  "https://app.amilia.com/store/en/city-of-roswell/shop/programs/128058?subCategoryIds=6626396";

// const fees = [
//   {
//     label: "Registration Fee",
//     elementary: "$360",
//     middle: "$150",
//     highSchool: "$150",
//   },
//   {
//     label: "Player Dues",
//     elementary: "$0",
//     middle: "$650",
//     highSchool: "$850",
//   },
// ];

const fees = [
  {
    program: 'High School',
    registration: '$150',
    dues: '$850',
  },
  {
    program: 'Middle School',
    registration: '$150',
    dues: '$500',
  },
  {
    program: 'K–5th',
    registration: '$360',
    dues: '$0',
  },
]

const programs = [
  {
    label: "Elementary (K–5th)",
    description:
      "While the actual season runs from late-July to (potentially) early-December, each K-5th player is expected to take part in as many 'off-season' activities organized by the team as is possible. These may include workouts, camps, and more. Summer Workouts for K-5th will take place Tuesday evenings from 6:30-7:30PM (K-3rd) and 7:30-8:30PM (4th-5th) at East Roswell Park. During the season, practices will most-often occur on Monday, Tuesday, and Thursday evenings from 6:30-8:30PM. Games take place on Saturdays.",
  },
  {
    label: "Middle School (6th–8th)",
    description:
      "The season runs from July through early November. Players are expected to participate in all practices and training. During the season, practices occur Monday, Tuesday, and Thursday evenings. Games take place on Saturdays.",
  },
  {
    label: "High School (9th–12th)",
    description:
      "The season runs from late Spring through early December (with playoff potential). Players are expected to participate in off-season workouts, camps, and 7-on-7 events. During the season, practices occur Monday through Thursday afternoons. Freshman/JV games take place on Thursdays while Varsity games are held on Friday nights at 7:30 PM.",
  },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-12">
          <p className="font-display text-royal-600 text-3xl tracking-[0.4em]">
            2026
          </p>
          <h1 className="font-display text-black-500 text-5xl sm:text-7xl tracking-widest">
            REGISTRATION
          </h1>
        </div>

        {/* Intro */}
        <div className="mb-10 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold">
              Welcome to Centennial Knights Football.
            </span>{" "}
            We're excited to open registration for the 2026 season. To be a
            Knight is more than wearing a uniform. It's joining a family built
            on hard work, discipline, and excellence. We can't wait to see your
            student-athlete take the field.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold">Registration Overview:</span> We work
            hard to keep our program fees as low as possible without
            compromising the quality of our program. Every student has the
            opportunity to be part of the Knights family regardless of financial
            circumstances. Payment plans and hardship waivers are available.
            Email us at{" "}
            <a
              href="mailto:chsbapres@gmail.com"
              className="text-royal-600 underline"
            >
              chsbapres@gmail.com
            </a>{" "}
            for more information.
          </p>
        </div>

        {/* Fees */}
        <div className="mb-12">
          <h2 className="font-display text-black-500 text-3xl tracking-widest mb-2">
            2026 FEES
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thanks to our TD Club and boosters, we're able to offer one of the
            best playing experiences in the state while keeping fees among the
            lowest in the area.
          </p>
          <p className="text-gray-700 mb-10 leading-relaxed">
            These fees cover equipment usage, league fees, insurance, field
            usage, referees, game film, meals, travel, and apparel. Registration
            is not complete and equipment will not be issued until payment is
            made.{" "}
            <span className="underline">
              After August 1, there will be no refunds issued.
            </span>
          </p>

          {/* Fundraising */}
          <h2 className="font-display text-black-500 text-3xl tracking-widest mb-2">
            FUNDRAISING
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            We offer fundraising oppurtunities through banner sales and
            SnapRaise to offset player fees. Check out our{" "}
            <a href="/banners" className="text-royal-600 font-bold">
              Banners Page
            </a>{" "}
            for more information.
          </p>

          {/* Fee table */}
          <div className="rounded-lg overflow-hidden border border-gray-400">
              <div className="grid grid-cols-3 bg-black-500 px-6 py-3 font-display text-sm tracking-widest uppercase text-white">
              <span>Program</span>
              <span className="text-center">Registration Fee</span>
              <span className="text-right">Players Dues</span>
            </div>
            {fees.map((fee, i) => (
              <div key={i} className={`grid grid-cols-3 px-6 py-4 border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <span className="font-display text-royal-600 text-md tracking-wider">{fee.program}</span>
                <span className="text-gray-700 text-md text-center">{fee.registration}</span>
                <span className="text-gray-700 text-md text-right">{fee.dues}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Program info */}
        <div className="mb-12">
          <h2 className="font-display text-black-500 text-3xl tracking-widest mb-6">
            PROGRAM INFO
          </h2>
          <div className="space-y-6">
            <div className="space-y-6">
              {programs.map((program) => (
                <div
                  key={program.label}
                  className="bg-silver-300 rounded-xl px-6 py-5"
                >
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-royal-600">
                      {program.label}:
                    </span>{" "}
                    {program.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="mb-12">
          <h2 className="font-display text-black-500 text-3xl tracking-widest mb-6">
            Touchdown Club
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            we are pleased to offer parents the opportunity to purchase a 2026
            Touchdown Club Package, giving you the opportunity to enjoy
            convenient parking in our stadium Lot at each Varsity home game as
            well pre-game meals and 2 entries to each home game throughout the
            season.
          </p>
        </div> */}

        {/* Bottom CTA */}
        <div className="bg-black-500 rounded-2xl px-8 py-10 flex flex-col items-center gap-6 text-center">
          <h3 className="font-display text-white text-3xl tracking-widest leading-tight">
            READY TO JOIN THE KNIGHTS?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={TEAMSNAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-royal-600 text-white hover:bg-silver-400 hover:text-royal-600 hover:font-bold font-display tracking-widest uppercase px-10 py-4 rounded-xl transition-all duration-200"
            >
              General Registration
            </a>
            <a
              href={K5_REG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-royal-600  text-white hover:bg-silver-400 hover:text-royal-600 hover:font-bold font-display tracking-widest uppercase px-10 py-4 rounded-xl transition-all duration-200"
            >
              K-5th Registration
            </a>
          </div>
          <p className="text-silver-400 text-sm tracking-wide">
            Questions? Contact us at{" "}
            <a
              href="mailto:chsbapres@gmail.com"
              className="text-white underline"
            >
              chsbapres@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
