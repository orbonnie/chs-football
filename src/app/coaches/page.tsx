import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Coaches | Centennial Knights Football',
}

const headCoach = {
  name: 'Adam Miller',
  title: 'Head Football Coach',
  bio: 'Add your head coach bio here. Include years of experience, record, championships, and any other highlights that speak to their leadership and impact on the program.',
  email: 'coach@centennialknights.com',
  photo: '/coaches/head-coach.jpg',
}

const staff = [
  { name: 'Reginald Nixon', title: 'Associate Head Coach / Offensive Line', photo: '' },
  { name: 'Scotty Connors', title: 'Defensive Coordinator', photo: '' },
  { name: 'Robert Baker', title: 'Defensive Line', photo: '' },
  { name: "Rick O'Buck", title: 'Offensive Line', photo: '' },
  { name: 'Avery Potite', title: 'Running Backs', photo: '' },
  { name: 'Matt DeSchong', title: 'Wide Receivers', photo: '' },
  { name: 'Kelly', title: 'Tight Ends', photo: '' },
  { name: 'Wilson', title: 'Defensive Backs', photo: '' },
  { name: 'Jim Showfety', title: 'Special Teams', photo: '' },
]

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2)
}

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <p className="font-display text-black-500 text-3xl tracking-[0.4em]">MEET THE</p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest">COACHES</h1>
        </div>

        {/* Head Coach — featured */}
        <div className="bg-white rounded-2xl overflow-hidden mb-10 flex flex-col md:flex-row">

          {/* Photo */}
          <div className="relative w-full md:w-80 shrink-0 aspect-[4/3] md:aspect-auto bg-royal-600">
            {headCoach.photo ? (
              <Image
                src={headCoach.photo}
                alt={headCoach.name}
                fill
                className="object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-royal-600">
                <span className="font-display text-white/20 text-8xl tracking-widest">
                  {initials(headCoach.name)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center px-8 py-10">
            <p className="font-display text-royal-600 text-base tracking-[0.3em] mb-1">
              {headCoach.title.toUpperCase()}
            </p>
            <h2 className="font-display text-black-500 text-5xl tracking-wider leading-none mb-6">
              {headCoach.name.toUpperCase()}
            </h2>
            <p className="text-royal-900/60 text-sm leading-relaxed max-w-xl mb-8">
              {headCoach.bio}
            </p>
            <a
              href={`mailto:${headCoach.email}`}
              className="inline-block self-start bg-royal-600 hover:bg-royal-500 text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-xl transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Staff grid */}
        <div className="mb-6">
          <p className="font-display text-silver-400 text-base tracking-[0.3em]">VARSITY STAFF</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
          {staff.map((coach, i) => (
            <div key={i} className="bg-black-500 hover:bg-royal-800 transition-colors group">

              {/* Photo */}
              <div className="relative aspect-[3/4] bg-royal-800">
                {coach.photo ? (
                  <Image
                    src={coach.photo}
                    alt={coach.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-royal-700">
                    <span className="font-display text-white/20 text-5xl tracking-widest">
                      {initials(coach.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="px-4 py-4">
                <h3 className="font-display text-white text-xl tracking-wider leading-tight">
                  {coach.name.toUpperCase()}
                </h3>
                <p className="text-silver-500 text-xs tracking-wider mt-1">{coach.title}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
