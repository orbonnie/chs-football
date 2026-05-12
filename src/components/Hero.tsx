"use client";

import Image from "next/image";
import { Ticket, Play } from "lucide-react";
import MarqueeBanner from "./MarqueeBanner";
import { useHoverReset } from "@/hooks/useHoverReset";

export default function Intro() {
  const ticketsHover = useHoverReset()
  const videoHover = useHoverReset()

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/fortress.jpg"
          alt="The Fortress"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/50" />
        {/* Bottom gradient fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-royal-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <p
          className="font-display text-black-500 text-2xl tracking-[0.5em] mb-4 animate-fade-up opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          WELCOME TO
        </p>
        <h2
          className="font-display text-black-500 text-[clamp(5rem,18vw,14rem)] leading-none tracking-wider animate-fade-up opacity-0"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          THE
        </h2>
        <h2
          className="font-display text-black-500 text-[clamp(5rem,18vw,14rem)] leading-none tracking-wider animate-fade-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          FORTRESS
        </h2>
        <p
          className="font-display font-semibold text-royal-600 text-2xl tracking-[0.3em] mt-4 animate-fade-up opacity-0"
          style={{
            animationDelay: "400ms",
            animationFillMode: "forwards",
          }}
        >
          CENTENNIAL HIGH SCHOOL · ROSWELL, GA
        </p>

        <div
          className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          <a
            href="https://gofan.co/app/school/GA4885"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={ticketsHover.onMouseEnter}
            onMouseLeave={ticketsHover.onMouseLeave}
            className={`font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 ${
              ticketsHover.hovered ? 'bg-royal-500 text-white' : 'bg-royal-600 text-white'
            }`}
          >
            <Ticket className="w-7 h-7" />
            Buy Tickets
          </a>

          <a
            href="https://www.nfhsnetwork.com/schools/f53e94de87"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={videoHover.onMouseEnter}
            onMouseLeave={videoHover.onMouseLeave}
            className={`border border-white/20 font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 ${
              videoHover.hovered ? 'bg-black-500 text-white' : 'bg-black-500/80 text-white'
            }`}
          >
            <Play className="w-7 h-7 fill-current" />
            Watch Live
          </a>
        </div>
      </div>

      <div className="relative z-10">
        <MarqueeBanner />
      </div>
    </section>
  );
}
