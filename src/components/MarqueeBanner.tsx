'use client'

import Marquee from 'react-fast-marquee'

const items = [
  'CENTENNIAL KNIGHTS',
  'GHSA CLASS 5A',
  'REGION 6-AAAAA',
  '#UKNIGHTED',
  'ROSWELL GEORGIA',
  'HONOR · COURAGE · COMMITMENT',
]

export default function MarqueeBanner() {
  return (
    <div className="bg-royal-600 py-3 overflow-hidden">
      <Marquee speed={60} gradient={false}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className='font-display text-white text-xl tracking-widest mx-8'>{item}</span>
            <span className="text-white mx-8 opacity-40">⚔</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
