import MarqueeBanner from './MarqueeBanner'
import fortress from '../../assets/imgs/fortress.jpg'


export default function Intro() {
  return (
    <section className="relative min-h-screen flex flex-col">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fortress.src})`}}
      >
        {/* Deep royal blue overlay */}
        <div className="absolute inset-0 bg-white/40" />
        {/* Bottom gradient fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-royal-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <p className="font-display text-black-500 text-2xl tracking-[0.5em] mb-4 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          WELCOME TO
        </p>
        <h1 className="font-display text-black-500 text-[clamp(5rem,18vw,16rem)] leading-none tracking-wider animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          THE
        </h1>
        <h1 className="font-display text-black-500 text-[clamp(5rem,18vw,16rem)] leading-none tracking-wider animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          FORTRESS
        </h1>
        <p className="font-display text-royal-600/90 text-2xl tracking-[0.4em] mt-4 animate-fade-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          CENTENNIAL HIGH SCHOOL · ROSWELL, GA
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <a
            href="#register"
            className="bg-royal-600 text-white font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-royal-500 transition-colors"
          >
            Register Your Player
          </a>
          <a
            href="/schedule"
            className="bg-royal-600 text-white font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-royal-500 transition-colors"
          >
            View Schedule
          </a>
        </div>
      </div>

      <div className="relative z-10">
        <MarqueeBanner />
      </div>
    </section>
  )
}
