const sponsors = [
  { name: 'Your Sponsor Here', href: '#' },
  { name: 'Your Sponsor Here', href: '#' },
  { name: 'Your Sponsor Here', href: '#' },
  { name: 'Your Sponsor Here', href: '#' },
  { name: 'Your Sponsor Here', href: '#' },
  { name: 'Your Sponsor Here', href: '#' },
  { name: 'Your Sponsor Here', href: '#' },
  { name: 'Your Sponsor Here', href: '#' },
]

export default function Sponsors() {
  return (
    <section className="bg-silver-300 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <p className="font-display text-royal-600 text-lg tracking-[0.4em] mb-2">OUR</p>
          <h2 className="font-display text-royal-600 text-6xl tracking-widest">SPONSORS</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-white/5">
          {sponsors.map((sponsor, i) => (
            <a
              key={i}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-royal-900 flex items-center justify-center p-8 text-center group hover:bg-royal-800 transition-colors"
            >
              <span className="text-white/30 group-hover:text-silver-400 transition-colors text-sm tracking-wider font-medium">
                {sponsor.name}
              </span>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/sponsorships"
            className="border border-white/20 text-white/50 text-sm tracking-widest uppercase px-8 py-3 hover:border-silver-400 hover:text-silver-400 transition-colors inline-block"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  )
}
