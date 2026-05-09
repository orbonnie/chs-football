"use client";

import {
  useState,
  useRef,
  useEffect,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Link from "next/link";
import { div } from "framer-motion/client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Schedule", href: "/schedule" },
  { label: "Coaches", href: "/coaches" },
  { label: "Recruiting", href: "/recruiting" },
  {
    label: "Sponsors",
    children: [
      { label: "Our Sponsors", href: "/sponsors" },
      { label: "Become a Sponsor", href: "/sponsorships" },
      { label: "Banner Fundraising", href: "/banners" },
    ],
  },
  { label: "Parents", href: "/parents" },
];

const registerLinks = [
  {
    label: "Team Registration",
    href: "/registration",
  },
  {
    label: "Submit Forms",
    href: "https://fultoncountyschools.rankone.com/New/NewInstructionsPage.aspx",
  },
];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [sponsorsOpen, setSponsorsOpen] = useState(false);

  const sponsorsRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (sponsorsRef.current && !sponsorsRef.current.contains(target)) {
        setSponsorsOpen(false);
      }

      if (registerRef.current && !registerRef.current.contains(target)) {
        setRegisterOpen(false);
      }
    }

    const handleResize = () => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches

      if (isDesktop) {
        setSponsorsOpen(false);
        setRegisterOpen(false);
        document.addEventListener("click", handleClickOutside)
      } else {
        document.removeEventListener("click", handleClickOutside)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black-500/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-start gap-8">
        <nav className="hidden md:flex items-center gap-8 w-full pr-4">
          {navLinks.map((link) => {
            if ("children" in link) {
              return (
                <div
                  key={link.label}
                  ref={sponsorsRef}
                  className="relative"
                >
                  <button
                    onClick={() => setSponsorsOpen(!sponsorsOpen)}
                    className="text-sm tracking-widest uppercase text-white/70 hover:text-silver-400 transition-colors flex items-center gap-2"
                  >
                    {link.label}
                    <svg
                      className={`w-3 h-3 transition-transform ${sponsorsOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {sponsorsOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl flex flex-col z-[100] rounded-md overflow-hidden">
                      {link.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setSponsorsOpen(false)}
                          className="bg-white text-black-500 tracking-widest text-xs font-bold uppercase px-5 py-4 hover:bg-silver-500 transition-colors border-b border-royal-900/10 last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-white/70 hover:text-silver-400 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}

          {/* Registration Dropdown */}
          <div ref={registerRef} className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRegisterOpen(!registerOpen);
              }}
              className="bg-royal-600 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 hover:bg-royal-500 transition-colors flex items-center gap-2 rounded-md"
            >
              Register
              <svg
                className={`w-3 h-3 transition-transform ${registerOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {registerOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl flex flex-col z-[100] rounded-md">
                {registerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setRegisterOpen(false)}
                    className="bg-white text-royal-600 text-xs font-bold tracking-widest uppercase px-5 py-4 rounded-md hover:bg-silver-500 transition-colors border-b border-royal-900/10 last:border-0"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Junior Knights */}
          <a
            href="/jrk"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto bg-white text-black-500 text-xs font-bold tracking-widest uppercase px-4 py-2 hover:bg-silver-300 transition-colors rounded-md"
          >
            JR Knights
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black-500 border-t border-white/10 px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => {
            if ("children" in link) {
              return (
                <div key={link.label} className="flex flex-col gap-3">
                  <button
                    onClick={() => setSponsorsOpen(!sponsorsOpen)}
                    className="font-display text-3xl tracking-widest text-white hover:text-silver-400 transition-colors flex items-center gap-3"
                  >
                    {link.label}

                    <svg
                      className={`w-4 h-4 transition-transform ${sponsorsOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {sponsorsOpen && (
                    <div className="ml-4 flex flex-col gap-3">
                      {link.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="text-white/70 text-lg tracking-wider hover:text-silver-400 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl tracking-widest text-white hover:text-silver-400 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}

          {/* Mobile register options */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <button
              onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                setRegisterOpen(!registerOpen);
              }}
              className="bg-royal-600 text-white text-sm font-bold tracking-widest uppercase px-4 py-3 flex items-center justify-center gap-2 text-center hover:bg-royal-500 transition-colors rounded-md"
            >
              Register
              <svg
                className={`w-3 h-3 shrink-0 transition-transform ${registerOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {registerOpen && (
              <>
                {registerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setRegisterOpen(!registerOpen);
                    }}
                    className="bg-white text-royal-600 text-sm font-bold tracking-widest uppercase px-4 py-3 text-center hover:bg-silver-500 transition-colors rounded-md"
                  >
                    {link.label}
                  </a>
                ))}
              </>
            )}
            {/* Junior Knights */}
            <a href="/jrk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black-500 text-sm font-bold tracking-widest uppercase px-4 py-3 text-center hover:bg-silver-300 transition-colors rounded-md"
            >
              JR Knights
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
