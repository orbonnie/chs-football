import Image from "next/image";

import { sponsors } from "@/data/sponsors"

export type Sponsor = {
  name: string;
  href: string;
  logo?: string;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Cloudinary helper
const cloudinaryUrl = (path: string) =>
  `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;

export default function Sponsors() {
  return (
    <section className="bg-white py-16 px-6">
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
              className="bg-royal-600 relative flex items-center justify-center group hover:bg-black-500 transition-colors overflow-hidden aspect-[3/2] rounded-md"
            >
              {sponsor.logo ? (
                <Image
                  src={cloudinaryUrl(sponsor.logo)}
                  alt={sponsor.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain opacity-90 group-hover:opacity-100 transition h-3/4"
                />
              ) : (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3/4 bg-white flex items-center justify-center px-4">
                  <span
                    className="font-display text-black-500 text-xl font-black tracking-widest text-center uppercase leading-none w-full group-hover:text-royal-600"
                    style={{ fontSize: 'clamp(0.75rem, 4vw, 1.5rem)' }}
                  >
                    {sponsor.name}
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/sponsorships"
            className="bg-royal-600 text-white font-bold text-sm tracking-widest uppercase px-8 py-3 hover:bg-black-500 transition-colors inline-block rounded-lg"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
