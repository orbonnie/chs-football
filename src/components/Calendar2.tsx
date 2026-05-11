export default function Calendar() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">TEAM</p>
          <h2 className="font-display text-black-500 text-6xl tracking-widest">CALENDAR</h2>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&src=ODc0ODVjMzdkODY3ZTM3MmU2YTBjZWY4YTNjM2ZiMWEwZDViOWNlZWRhZGM4NjA1NDExYWI2ZTY4Zjc3OTg0M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MDk4NjU1YzQ3MzQ2ZWM0ZmY0M2RlN2FjMTEyYTkxYWMxNTYzMDI0ZDhhOTg4NGJkMzNhZTNjY2YxMjNhYTNmYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MGRjNmY1YjQ2YjQ0ZjBmYjE4ZDg0MWM0MWQwMDdjOTY5NjA4NDJjMjliOTAxZTk4Zjg4OTM1YjVkOTc4YWY5Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YjA0Mzk1NDkxZDAzM2E0NDRhYjY5OTc5NjBhNGI5MzMwZTk3ZWZlMzRmNjJkZDc3ZTUwMzgzNDQ2NTVmNjhlY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y2Q4NzkzY2JmYjBjMWIxM2Q5NDZiNmY2YzM3M2RmYzJhNTFlYmVlNGEyNmZmYTgwYmFmM2YwYjZmYzliMWY2ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZjUzNWJlMDBlMDY1NGEyY2IxOGM0NjM0NjNjZDI1ZTEwZDRkYjhkMDdkMmRhZDUwZWRkODExMmFhYTJjZWY2ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23e67c73&color=%238bcfec&color=%23014e9f&color=%23131313&color=%23a8b4c4&color=%23039be5&ctz=America%2FNew_York&mode=AGENDA&showTitle=0&showNav=0&showPrint=0&showTabs=0&showCalendars=1"
            className="w-full border-0"
            height="600"
            style={{ minWidth: '100%' }}
          />
          {/* Block the Send Feedback button */}
          {/* <div className="absolute top-0 right-12 w-12 h-12 bg-silver-300" /> */}
        </div>
      </div>
    </section>
  )
}
