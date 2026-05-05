'use client'

import { useState, useRef, useEffect, type MouseEvent as ReactMouseEvent } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Coaches', href: '/coaches' },
  { label: 'Recruiting', href: '/recruiting' },
  { label: 'Sponsorships', href: '/sponsorships' },
  { label: 'Parents', href: '/parents' },
]

const registerLinks = [
  { label: 'Team Registration', href: 'https://registration.teamsnap.com/form/48104' },
  { label: 'Submit Forms', href: 'https://fultoncountyschools.rankone.com/New/NewInstructionsPage.aspx' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  // const dropdownRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   function handleClickOutside(e: MouseEvent) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
  //       setRegisterOpen(false)
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside)

  //   return () => document.removeEventListener("mousedown", handleClickOutside)
  // }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black-500/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-start gap-8">
        {/* <Link href="/" className="font-display text-2xl tracking-widest text-white hover:text-silver-400 transition-colors">
          KNIGHTS
        </Link> */}

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-white/70 hover:text-silver-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Registration Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setRegisterOpen(!registerOpen)
              }}
              className="bg-royal-600 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 hover:bg-royal-500 transition-colors flex items-center gap-2"
            >
              Register
              <svg
                className={`w-3 h-3 transition-transform ${registerOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {registerOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl flex flex-col z-[100]">
                {registerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setRegisterOpen(false)}
                    className="text-royal-900 text-xs font-bold tracking-widest uppercase px-5 py-4 hover:bg-royal-600 hover:text-white transition-colors border-b border-royal-900/10 last:border-0"
                  >
                    {link.label}
                  </a>
                ))}

              </div>
            )}
          </div>
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black-500 border-t border-white/10 px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl tracking-widest text-white hover:text-silver-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile register options */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <button
              onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                setRegisterOpen(!registerOpen)
              }}
              className="bg-royal-600 text-white text-sm font-bold tracking-widest uppercase px-4 py-3 text-center hover:bg-royal-500 transition-colors"
            >
              Register
              <svg
                className={`w-3 h-3 transition-transform ${registerOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
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
                    onClick={() => {setRegisterOpen(!registerOpen)}}
                    className="bg-white text-royal-600 text-sm font-bold tracking-widest uppercase px-4 py-3 text-center hover:bg-silver-500 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
