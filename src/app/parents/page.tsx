import type { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Parent Playbook | Centennial Knights Football',
}

const values = [
  { letter: 'U', word: 'UNITY',      description: 'We are one team, one family — what affects one affects all.' },
  { letter: 'K', word: 'KNIGHTHOOD', description: 'We carry the honor of the shield — on the field, in the classroom, and in our community.' },
  { letter: 'N', word: 'NOBLE',      description: 'We hold ourselves to a higher standard in how we speak, act, and compete.' },
  { letter: 'I', word: 'INTEGRITY',  description: "We do what's right when no one is watching — because character is who you are in the dark." },
  { letter: 'G', word: 'GRIT',       description: 'We embrace adversity, push through pain, and refuse to quit when it matters most.' },
  { letter: 'H', word: 'HONOR',      description: 'We represent our school, our families, and each other with pride in everything we do.' },
  { letter: 'T', word: 'TOUGHNESS',  description: 'We are mentally and physically prepared to compete at the highest level every single day.' },
  { letter: 'E', word: 'EXCELLENCE', description: 'We pursue the highest standard in preparation, performance, and purpose.' },
  { letter: 'D', word: 'DISCIPLINE', description: 'We do the right things, the right way, every time — because championships are built in the details.' },
]

const eliteParentActions = [
  'Ensure your player is on-time, properly equipped, and ready to give their all at every practice and game.',
  'Promote healthy habits, including proper sleep, nutrition, and hydration.',
  'Reinforce positive attitudes and encouragement. Model the behavior you want to see on the field and in life.',
  'Communicate proactively with coaches regarding absences, scheduling conflicts, or emergencies.',
  'Support the Centennial Knights through fundraising and volunteering.',
]

const faqs = [
  {
    q: 'Best time for a vacation?',
    a: 'Ideally, the weeks of May 23-31 or July 1-5, is the best time to take a vacation. during GHSA Dead Weeks. These are GHSA Dead Weeks and allow your family to enjoy time away without missing practice, camps, or other important activities.',
  },
  {
    q: 'How should I communicate a concern to coaches?',
    a: 'If you have a question or concern, please email your Head Coach with a request to set up an appointment. Under no circumstances should you expect to speak with a coach immediately before, during, or after a game.',
  },
  {
    q: 'What about weather-related issues?',
    a: "On days where inclement weather may be a factor, it's critical that you monitor official communication channels for updates. As a program, we abide by all GHSA and league standards regarding weather regulations.",
  },
  {
    q: 'What are acclimation days?',
    a: 'Before full-contact practices begin, GHSA mandates a 5-day acclimation period where athletes practice in helmets and shorts only to safely adjust to weather conditions. Attendance is required for participation in subsequent practices.',
  },
  {
    q: 'What should my player wear on gameday?',
    a: 'Players are strongly encouraged to wear BLACK cleats for games. All other necessary game gear will be provided. All undershirts and accessories should be program colors unless otherwise specified.',
  },
  {
    q: 'When should I schedule appointments for my player?',
    a: 'Please schedule doctor, dentist, orthodontic, or other appointments outside of scheduled practice times. Most importantly, communicate any planned absences to your head coach as early as possible.',
  },
]

const contacts = [
  { role: 'Head Coach', name: 'Coach Name', email: 'headcoach@centennialknights.com', for: 'Varsity questions, general program inquiries' },
  { role: 'General Manager', name: 'Name', email: 'gm@centennialknights.com', for: 'Sponsorships, general program inquiries' },
  { role: 'President, TD Club', name: 'Name', email: 'president@centennialknights.com', for: 'General program inquiries, serving with the Touchdown Club' },
  { role: 'Treasurer, TD Club', name: 'Name', email: 'treasurer@centennialknights.com', for: 'Financial inquiries' },
  { role: 'Volunteer Coordinator', name: 'Name', email: 'volunteer@centennialknights.com', for: 'Point App questions, volunteer questions' },
]

export default function ParentsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Hero */}
      <div className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-black-500 text-lg tracking-[0.4em]">CENTENNIAL KNIGHTS</p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest leading-none">PARENT<br />PLAYBOOK</h1>
        </div>
      </div>

      {/* Welcome */}
      <section className="bg-royal-600 py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-silver-400 text-lg tracking-[0.4em] mb-6">WELCOME</p>
          <p className="font-display text-white text-[clamp(1.5rem,4vw,2.5rem)] leading-tight tracking-wide max-w-3xl mx-auto">
            WELCOME TO CENTENNIAL KNIGHTS FOOTBALL. OUR MISSION IS TO DEVELOP YOUNG MEN
            WHO PURSUE EXCELLENCE IN EVERYTHING THEY DO. THANK YOU FOR TRUSTING US TO
            CHALLENGE YOUR SON AND FOR PARTNERING WITH US TO BUILD SOMETHING SPECIAL.
          </p>
        </div>
      </section>

      {/* UKNIGHTED Values */}
      <section className="bg-silver-400 py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-black-500 text-lg tracking-[0.4em] mb-2">OUR</p>
          <h2 className="font-display text-black-500 text-5xl tracking-widest mb-12">VALUES</h2>
          <div className="flex flex-col gap-px bg-white/5">
            {values.map((v) => (
              <div key={v.word} className="bg-black-500 hover:bg-silver-700 transition-colors px-6 py-6 flex items-center gap-8">
                <span className="font-display text-royal-600 text-6xl w-16 shrink-0 text-center">{v.letter}</span>
                <div>
                  <p className="font-display text-white text-2xl tracking-widest">{v.word}</p>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Actions of UKNIGHTED Parents */}
      <section className="bg-white py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-royal-600 text-lg tracking-[0.4em] mb-2">PARENTING FOR</p>
          <h2 className="font-display text-royal-900 text-5xl tracking-widest mb-12">SUCCESS</h2>
          <div className="flex flex-col gap-4">
            {eliteParentActions.map((action, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="font-display text-royal-600 text-4xl w-10 shrink-0">{i + 1}</span>
                <p className="text-royal-900/70 text-base leading-relaxed pt-2">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Athlete */}
      <section className="bg-royal-600 py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-silver-400 text-lg tracking-[0.4em] mb-2">SUCCEEDING AS A</p>
          <h2 className="font-display text-white text-5xl tracking-widest mb-10">STUDENT-ATHLETE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-white/60 leading-relaxed">
              Our program is committed to developing young men who pursue excellence in the classroom
              with the same effort and discipline they bring to the field. Academic success is not just
              a requirement for participation — it is a foundational part of who we are.
            </p>
            <p className="text-white/60 leading-relaxed">
              We expect every player to prioritize the "student" role by managing time wisely,
              completing assignments, and communicating with teachers. Student-athletes must meet
              GHSA academic eligibility requirements and remain on track for graduation. Coaches
              actively monitor academic progress and work alongside parents and teachers to support
              every student.
            </p>
          </div>
        </div>
      </section>

      {/* Communication */}
      <section className="bg-silver-400 py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-black-500 text-lg tracking-[0.4em] mb-2">STAY</p>
          <h2 className="font-display text-black-500 text-5xl tracking-widest mb-12">CONNECTED</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                title: 'Weekly Email',
                description: 'Our primary source of program-wide communication. Sent weekly to all families with essential information, reminders, and updates. Parents are expected to read it carefully each week.',
              },
              {
                title: 'Text & TeamSnap App',
                description: 'Text messages are reserved for urgent communication such as schedule changes or weather updates. TeamSnap serves as a platform for team-specific coordination.',
              },
              {
                title: 'Website & Social',
                description: 'CentennialKnightsFootball.com is the central hub for all program information including schedules, registration, and sponsorship. Follow us on Instagram and X for highlights and announcements.',
              },
            ].map((channel) => (
              <div key={channel.title} className="bg-black-500 p-8">
                <h3 className="font-display text-royal-500 text-2xl tracking-widest mb-4">{channel.title.toUpperCase()}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{channel.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-royal-600 text-lg tracking-[0.4em] mb-2">FREQUENTLY ASKED</p>
          <h2 className="font-display text-black-500 text-5xl tracking-widest mb-12">QUESTIONS</h2>
          <div className="flex flex-col gap-px bg-royal-900/10">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white hover:bg-royal-50 transition-colors px-6 py-6 border-b border-royal-900/10 last:border-0">
                <p className="font-display text-royal-900 text-xl tracking-wider mb-2">{faq.q.toUpperCase()}</p>
                <p className="text-royal-900/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="bg-black-500 py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-silver-400 text-lg tracking-[0.4em] mb-2">PROGRAM</p>
          <h2 className="font-display text-white text-5xl tracking-widest mb-12">CONTACTS</h2>
          <div className="flex flex-col gap-px bg-white/5">
            {contacts.map((c) => (
              <div key={c.role} className="bg-silver-300 hover:bg-silver-400 transition-colors px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-display text-blue-600 text-lg tracking-widest">{c.role.toUpperCase()}</p>
                  <p className="text-black-500 font-semibold">{c.name}</p>
                  <p className="text-black-500 text-xs mt-1">{c.for}</p>
                </div>
                <a
                  href={`mailto:${c.email}`}
                  className="text-royal-500 hover:text-white text-sm tracking-wider transition-colors shrink-0"
                >
                  {c.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment CTA */}
      <section className="bg-royal-600 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-white/90 text-lg tracking-[0.4em] mb-4">COMMIT TO CHAMPIONSHIP EXPECTATIONS</p>
          <h2 className="font-display text-white text-6xl tracking-widest mb-6">WE ARE UKNIGHTED</h2>
          <p className="text-white/90 max-w-xl mx-auto mb-10 leading-relaxed">
            Now that you have reviewed the Parent Playbook, complete the Parent & Player Commitment.
            This agreement is required for every family and reflects our shared responsibility to uphold
            the standards that define Centennial Knights Football.
          </p>

          <a
            href="/agreement"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-royal-600 font-bold text-sm tracking-widest uppercase px-10 py-4 hover:bg-silver-300 transition-colors"
          >
            Complete the Agreement
          </a>
        </div>
      </section>
    </div>
  )
}
