import Image from "next/image";

type Sponsor = {
  name: string;
  href: string;
  logo?: string;
};

const sponsors: Sponsor[] = [
  {
    name: "Zama Mexican Cuisine",
    href: "https://www.zamamex.com/",
    logo: "zama",
  },
  {
    name: "Play It Again Sports",
    href: "https://playitagainsports.com/locations/roswell-ga/",
    logo: "pia-sports"
  },
  {
    name: "The Salt Center",
    href: "https://www.thesaltcenter.com/",
    logo: "salt-2.jpg"
  },
  {
    name: "McAllister's Deli",
    href: "https://www.mcalistersdeli.com/",
    logo: "McAlisters"
  },
  {
    name: "Community Cleaners",
    href: "https://ourcommunitycleaners.com/",
    logo: "community"
  },
  {
    name: "TE Certified",
    href: "https://www.tecertifiedelectricians.com/",
    logo: "te-cert"
  },
  {
    name: "Mibab Orthodontics",
    href: "https://www.mibabortho.com/",
    logo: "mibab-ortho-3"
  },
  {
    name: "New South Residential",
    href: "https://www.newsouthatl.com/",
    logo: "nsr-3"
  },
];

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Cloudinary helper
const cloudinaryUrl = (path: string) =>
  `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;

export default function Sponsors() {
  return (
    <section className="bg-silver-300 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="font-display text-royal-600 text-lg tracking-[0.4em] mb-2">
            THANK YOU TO OUR
          </p>
          <h2 className="font-display text-black-500 text-6xl tracking-widest">
            SPONSORS
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-white/5">
          {sponsors.map((sponsor, i) => (
            <a
              key={i}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-royal-600 relative flex items-center justify-center group hover:bg-royal-500 transition-colors overflow-hidden aspect-[3/2]"
            >
              {sponsor.logo ? (
                <Image
                  src={cloudinaryUrl(sponsor.logo)}
                  alt={sponsor.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain opacity-90 group-hover:opacity-100 transition"
                />
              ) : (
                <span className="text-white/30 text-sm tracking-wider">
                  {sponsor.name}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/sponsorships"
            className="bg-silver-400 border border-black-500 text-black-500 font-bold text-sm tracking-widest uppercase px-8 py-3 hover:border-royal-600 hover:text-royal-600 transition-colors inline-block rounded-md"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
