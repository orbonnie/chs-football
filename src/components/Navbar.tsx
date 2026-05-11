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
    newTab: false
  },
  {
    label: "Submit Forms",
    href: "https://fultoncountyschools.rankone.com/New/NewInstructionsPage.aspx",
    newTab: true
  },
  {
    label: "Physical Form",
    href: "https://fultoncountyschools.rankone.com/Images/Logos/2023553.pdf",
    newTab: true
  },
];

const JrkLinks = [
  {
    label: "General",
    href: "/jrk",
  },
  {
    label: "Schedule",
    href: "/jrk/schedule",
  },
  {
    label: "Roster",
    href: "/jrk/roster",
  },
  {
    label: "Register",
    href: "/jrk/info",
  },
];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [sponsorsOpen, setSponsorsOpen] = useState(false);
  const [jrkOpen, setJrkOpen] = useState(false)

  const sponsorsRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const jrkRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches
      const target = event.target as Node;

      if (isDesktop) {
        if (sponsorsRef.current && !sponsorsRef.current.contains(target)) {
          setSponsorsOpen(false);
        }

        if (registerRef.current && !registerRef.current.contains(target)) {
          setRegisterOpen(false);
        }

        if (jrkRef.current && !jrkRef.current.contains(target)) {
          setJrkOpen(false)
        }
      }

      if (
        menuRef.current && !menuRef.current.contains(target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(target)) {
        setOpen(false)
        setSponsorsOpen(false)
        setRegisterOpen(false)
        setJrkOpen(false)
      }
    }

    const handleResize = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches

      if (isDesktop) {
        setSponsorsOpen(false);
        setRegisterOpen(false);
        setJrkOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside)
    window.addEventListener("resize", handleResize)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black-500/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-start gap-8 relative">

        {/* Mobile logo — centered, only on mobile */}
        {/* <Link href="/" className="lg:hidden absolute left-1/2 -translate-x-1/2">
          <img src="/logo.png" alt="Centennial Knights" className="h-16 w-auto" />
        </Link> */}

        {/* Mobile logo + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <Link href="/">
            <img src="/logo.png" alt="Centennial Knights" className="h-12 w-auto" />
          </Link>
          <button
            ref={hamburgerRef}
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Sponsors Dropdown */}
        <nav className="hidden lg:flex items-center gap-8 w-full pr-4">
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
                          className="bg-white text-black-500 tracking-widest text-xs font-bold uppercase px-5 py-4 hover:bg-silver-400/80 transition-colors border-b border-black-500/10 last:border-0"
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
              className="bg-royal-600 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 hover:text-royal-600 hover:bg-white transition-colors flex items-center gap-2 rounded-md"
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
                    target={link.newTab ? "_blank" : undefined}
                    rel={link.newTab ? "noopener noreferrer" : undefined}
                    onClick={() => setRegisterOpen(false)}
                    className="bg-white text-royal-600 text-xs font-bold tracking-widest uppercase px-5 py-4 rounded-md hover:bg-silver-400/80 transition-colors border-b border-black-500/10 last:border-0"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Junior Knights */}
          <div ref={jrkRef} className="ml-auto relative">
            <button
              onClick={(e) => { e.stopPropagation(); setJrkOpen(!jrkOpen) }}
              className="bg-white text-royal-600 text-sm font-bold tracking-widest uppercase px-4 py-2 hover:bg-royal-600 hover:text-white transition-colors rounded-md flex items-center gap-2"
            >
              JR Knights
              <svg className={`w-3 h-3 transition-transform ${jrkOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            {jrkOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl flex flex-col z-[100] rounded-md overflow-hidden">
                {JrkLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setJrkOpen(false)}
                    className="bg-white text-royal-600 tracking-widest text-xs font-bold uppercase px-5 py-4 hover:bg-silver-400/80 transition-colors border-b border-black-500/10"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div ref={menuRef} className="lg:hidden absolute top-16 left-0 w-full md:w-80 bg-black-500/95 backdrop-blur-sm border border-white/10 rounded-br-2xl px-6 py-6 flex flex-col gap-6 z-50 shadow-2xl overflow-y-auto max-h-[calc(100vh-4rem)]">
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
                          onClick={() => {setOpen(false); setSponsorsOpen(false)}}
                          className="text-white/70 text-lg tracking-wider hover:text-white transition-colors"
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
          <div className="flex flex-col gap-3">
            <button
              onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                setRegisterOpen(!registerOpen);
              }}
              className="font-display text-3xl tracking-widest text-silver-300 hover:text-white transition-colors flex items-center gap-3 bg-royal-600/80 px-6 py-1 w-full -mx-6"
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
              <div className="ml-4 flex flex-col gap-3">
                {registerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.newTab ? "_blank" : undefined}
                    rel={link.newTab ? "noopener noreferrer" : undefined}
                    onClick={() => { setOpen(false); setRegisterOpen(false) }}
                    className="text-white/70 text-lg tracking-wider hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            {/* Mobile Junior Knights */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setJrkOpen(!jrkOpen)}
                className="font-display text-3xl tracking-widest text-royal-600 hover:text-black-500 transition-colors flex items-center gap-3 bg-white/90 px-6 py-1 w-full -mx-6"
              >
                JR Knights
                <svg
                  className={`w-3 h-3 transition-transform ${jrkOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {jrkOpen && (
                <div className="ml-4 flex flex-col gap-3">
                  {JrkLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => { setOpen(false); setJrkOpen(false) }}
                    className="text-white/70 text-lg tracking-wider hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
