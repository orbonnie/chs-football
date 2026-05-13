export default function SchedulePage() {
  return (
    <div className="relative w-full h-screen">
      <iframe
        src="/sponsorships.pdf"
        className="w-full h-full scale-100 origin-top mt-16"
      />
      <a
        href="mailto:Centennialfootballpartners@gmail.com"
        className="fixed top-2 lg:top-[68px] left-1/2 lg:left-14 -translate-x-1/2 lg:-translate-x-0 w-36 md:w-52 bg-royal-600 hover:bg-black-500 text-white font-display tracking-widest text-md px-6 py-3 rounded-2xl shadow-lg transition-colors z-50 text-center"
      >
        CONTACT US
      </a>
    </div>
  )
}