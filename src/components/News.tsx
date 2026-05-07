"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { news } from "@/data/news"

export default function News() {
  const slides = [...news, news[0]]
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const next = () => {
    setIndex((prev) => (prev + 1))
  }

  const prev = () => {
    if (index === 0) {
      setTransitionEnabled(false)
      setIndex(news.length - 1)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true)
        })
      })

      return
    }

    setIndex((prev) => prev - 1)
  }

  // Auto advance
  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      next()
    }, 3000)

    return () => clearInterval(interval)
  }, [paused])

    // seamless reset after cloned first slide
    useEffect(() => {
      if (index === news.length) {
        const timeout = setTimeout(() => {
          setTransitionEnabled(false)
          setIndex(0)

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTransitionEnabled(true)
            })
          })
        }, 700)

        return () => clearTimeout(timeout)
      }
    }, [index, news.length])

  return (
    <section className="bg-silver-300 pt-20 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="font-display text-royal-600 text-lg tracking-[0.4em] mb-2">
            LATEST
          </p>

          <h2 className="font-display text-royal-600 text-6xl tracking-widest">
            NEWS
          </h2>
        </div>

        {/* CAROUSEL */}
        <div
          className="relative overflow-hidden rounded-3xl bg-white border border-black/5 shadow-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* TRACK */}
          <div
            className={`flex w-full ${
              transitionEnabled
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {slides.map((item, i) => (
              <Link
                key={`${item.title}-${i}`}
                href={item.href}
                className="min-w-full w-full flex-shrink-0"
              >

                {/* IMAGE */}
                <div className="pt-8 flex justify-center">
                  <div className="relative w-3/4 aspect-[16/7] overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    priority={i === 0}
                  />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-10 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-royal-600 mb-4">
                    {item.date}
                  </p>

                  <h3 className="font-display text-4xl text-black-500 leading-none tracking-wide">
                    {item.title}
                  </h3>

                  <p className="mt-6 text-black-500/70 text-base leading-relaxed max-w-3xl mx-auto">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="absolute left-16 top-1/2 -translate-y-1/2 z-30
                       w-32 h-32
                       text-black-500/60 transition"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="absolute right-12 top-1/2 -translate-y-1/2 translate-x-1/2 z-30
                       w-32 h-32
                       text-black-500/60 transition"
            aria-label="Next story"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-6">
          {news.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to story ${i + 1}`}
              className={`rounded-full transition-all ${
                i === index
                  ? "bg-royal-600 w-3.5 h-3.5 scale-110"
                  : "bg-black-500/40 w-2.5 h-2.5 hover:bg-black-500/60"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
