import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-black-500 border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="text-center md:text-left">
          <p className="font-display text-2xl tracking-widest text-white">KNIGHTS NATION</p>
          <p className="text-white/50 text-xs tracking-widest mt-1">CENTENNIAL HIGH SCHOOL · ROSWELL, GA</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {[
            ['Schedule', '/schedule'],
            ['Coaches', '/coaches'],
            ['Recruiting', '/recruiting'],
            ['Sponsorships', '/sponsorships'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-white/90 hover:text-silver-400 text-xs tracking-widest uppercase transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-white/50 text-xs tracking-wider">
          © {new Date().getFullYear()} Centennial Knights Football
        </p>
      </div>
    </footer>
  )
}
