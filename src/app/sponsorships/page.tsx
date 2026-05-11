import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sponsorships | Centennial Knights Football',
}

const tiers = [
  {
    name: 'Platinum',
    price: '$5,000+',
    color: 'border-gold-400',
    labelColor: 'text-white',
    perks: [
      'Logo on all game day materials',
      'Banner on field / stadium',
      'Social media features (monthly)',
      'Logo on team website (featured)',
      'Complimentary season tickets (4)',
      'PA announcement at all home games',
    ],
  },
  {
    name: 'Gold',
    price: '$2,500',
    color: 'border-white/30',
    labelColor: 'text-silver-300/90',
    perks: [
      'Logo on select game day materials',
      'Social media feature (2x per season)',
      'Logo on team website',
      'Complimentary season tickets (2)',
      'PA announcement at home games',
    ],
  },
  {
    name: 'Silver',
    price: '$1,000',
    color: 'border-white/10',
    labelColor: 'text-silver-400',
    perks: [
      'Logo on team website',
      'Social media mention (1x per season)',
      'Complimentary game tickets (2)',
    ],
  },
  {
    name: 'Supporter',
    price: '$500',
    color: 'border-white/10',
    labelColor: 'text-silver-500',
    perks: [
      'Name listed on team website',
      'Social media thank-you post',
    ],
  },
]

export default function SponsorshipsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-4">
          <p className="font-display text-black-500 text-lg tracking-[0.4em]">PARTNER WITH</p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest">THE KNIGHTS</h1>
        </div>

        <p className="text-black-500/90 max-w-2xl mb-16 leading-relaxed">
          Align your brand with one of Georgia's premier high school football programs.
          Your sponsorship directly supports our student-athletes on and off the field.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {tiers.map((tier) => (
            <div key={tier.name} className={`bg-royal-600 p-8 border-t-2 ${tier.color} flex flex-col rounded-lg`}>
              <p className={`font-display text-3xl tracking-widest ${tier.labelColor} mb-1`}>{tier.name}</p>
              <p className="text-white font-display text-xl tracking-wider mb-6">{tier.price}</p>
              <ul className="flex flex-col gap-3 flex-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="text-white text-sm leading-relaxed flex gap-2">
                    <span className="text-gold-500 mt-0.5 shrink-0">✦</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:centennialfootballpartners@gmail.com"
                className="mt-8 border bg-black-500 border-silver-300/40 text-silver-200 text-xs tracking-widest uppercase px-4 py-3 text-center hover:bg-silver-300 hover:text-black-500 transition-colors rounded-md"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-white/10 p-10 text-center">
          <p className="font-display text-black-500 text-4xl tracking-widest mb-3">CUSTOM PARTNERSHIPS</p>
          <p className="text-black-500/80 max-w-xl mx-auto mb-6 text-sm leading-relaxed">
            Looking for something unique? We're happy to work with you on a custom sponsorship package
            tailored to your brand and goals.
          </p>
          <a
            href="mailto:centennialfootballpartners@gmail.com"
            className="bg-royal-600 text-white font-bold text-sm tracking-widest uppercase px-10 py-4 hover:bg-black-500 transition-colors inline-block rounded-md"
          >
            Contact Us
          </a>
        </div>

      </div>
    </div>
  )
}
