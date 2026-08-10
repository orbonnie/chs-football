import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Coaches | Centennial Knights Football',
}

const headCoach = {
  name: 'Adam Miller',
  title: 'Head Football Coach',
  bio: "Coach Adam Miller enters his 10th year of coaching \
        and his fourth season leading the Centennial football \
        program as Head Coach. Throughout his career, Coach Miller \
        has been driven by a passion for developing young men, \
        believing that the lessons learned through football extend far \
        beyond the field. What he enjoys most about coaching is watching \
        student-athletes grow in character, leadership, and confidence as \
        they progress through the program. \n\nThis season, Coach Miller is especially \
        excited about the unity, brotherhood, and commitment that this team has built. \
        He believes that strong relationships and a shared purpose are the foundation \
        for success and is eager to see that culture on display throughout the season. \
        His goal is simple: to get better every day and maximize every opportunity to improve as a team, both on and off the field.\n\n\
        When he is away from football, Coach Miller enjoys spending quality time with his family. \
        He would like to recognize and thank his wite Joanna and three beautitul daughters \
        for their unwavering love, support, and sacrifices. Their encouragement allows him \
        to do what he loves and continues to inspire his commitment to the Centennial football family.",
  email: 'millera7@fultonschools.org',
  photo: '/miller.png',
}

const staff = [
  { name: 'Scott Connors', title: 'Defensive Coordinator/Linebackers', photo: '' },
  { name: 'Andrew Wilson', title: 'Defensive Coordinator/Defensive Backs', photo: '' },
  { name: 'Matt DeSchong', title: 'Defensive Backs', photo: '' },
  { name: 'Reginald Nixon', title: 'Offensive Line', photo: '' },
  { name: "Rick O'Buck", title: 'Offensive Line', photo: '' },
  { name: 'Avery Poteet', title: 'Wide Receivers', photo: '' },
  { name: 'Kyle Roberts', title: 'Tight Ends', photo: '' },
  { name: 'Robert Baker', title: 'Defensive Line', photo: '' },
  { name: 'Praiss Barron', title: 'Wide Receivers', photo: '' },
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
        <div className="bg-white rounded-xl overflow-hidden mb-10 flex flex-col md:flex-row">

          {/* Photo */}
          <div className="relative w-full md:w-80 shrink-0 aspect-[4/3] md:aspect-auto bg-silver-500">
            {headCoach.photo ? (
              <Image
                src={headCoach.photo}
                alt={headCoach.name}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
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
            <p className="font-display text-royal-600 text-2xl tracking-[0.3em] mb-1">
              {headCoach.title.toUpperCase()}
            </p>
            <h2 className="font-display text-black-500 text-5xl tracking-wider leading-none mb-6">
              {headCoach.name.toUpperCase()}
            </h2>
            <p className="text-black-500/90 text-sm leading-relaxed max-w-xl mb-8 whitespace-pre-line">
              {headCoach.bio}
            </p>
            <a
              href={`mailto:${headCoach.email}`}
              className="inline-block self-start bg-royal-600 hover:bg-black-500 text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-md transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Staff grid */}
        <div className="mb-6">
          <p className="font-display text-black-500 text-xl tracking-[0.3em]">VARSITY STAFF</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
          {staff.map((coach, i) => (
            <div key={i} className="bg-black-500 hover:bg-black-500/95 transition-colors group rounded-xl overflow-hidden">

              {/* Photo */}
              <div className="relative aspect-[3/4] bg-royal-600">
                {coach.photo ? (
                  <Image
                    src={coach.photo}
                    alt={coach.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-royal-600">
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
