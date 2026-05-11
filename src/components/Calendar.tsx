"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const CALENDARS = [
  {
    id: '0dc6f5b46b44f0fb18d841c41d007c96960842c29b901e98f88935b5d978af9c@group.calendar.google.com',
    name: 'Varsity Game',
    color: '#08129C'
  },
  {
    id: 'f535be00e0654a2cb18c463463cd25e10d4db8d07d2dad50edd8112aaa2cef6d@group.calendar.google.com',
    name: 'JV Game',
    color: '#2442E8'
  },
  {
    id: 'cd8793cbfb0c1b13d946b6f6c373dfc2a51ebee4a26ffa80baf3f0b6fc9b1f6e@group.calendar.google.com',
    name: 'Freshman Game',
    color: '#7A8EA0'
  },
  {
    id: '098655c47346ec4ff43de7ac112a91ac1563024d8a9884bd33ae3ccf123aa3fa@group.calendar.google.com',
    name: 'Jr Knights',
    color: '#0EA5f9'
  },
  {
    id: 'b04395491d033a444ab6997960a4b9330e97efe34f62dd77e5038344655f68ec@group.calendar.google.com',
    name: 'CHS',
    color: '#172554'
  },
  {
    id: '87485c37d867e372e6a0cef8a3c3fb1a0d5b9ceedadc8605411ab6e68f779843@group.calendar.google.com',
    name: 'General',
    color: '#EAB308'
  },
]

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY

type View = 'month' | 'agenda'

type CalendarEvent = {
  id: string
  summary: string
  start: { date?: string; dateTime?: string }
  end: { date?: string; dateTime?: string }
  location?: string
  description?: string
  calendarId: string
  calendarName: string
  calendarColor: string
}

function formatTime(dateTime: string) {
  return new Date(dateTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function eventDateKey(event: CalendarEvent) {
  return event.start.date || event.start.dateTime?.split('T')[0] || ''
}

function getHeaderLabel(view: View, currentDate: Date) {
  if (view === 'month') {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
  return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function EventDetail({ event }: { event: CalendarEvent }) {
  return (
    <div className="flex gap-3 items-start py-3 border-b border-gray-100 last:border-0">
      <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: event.calendarColor }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-black-500 tracking-wider text-sm">{event.summary}</p>
          <span className="text-xs px-2 py-0.5 rounded-full text-white font-display tracking-widest shrink-0" style={{ backgroundColor: event.calendarColor }}>
            {event.calendarName}
          </span>
        </div>
        {event.start.dateTime && (
          <p className="text-gray-500 text-xs mt-0.5">
            {formatTime(event.start.dateTime)}
            {event.end.dateTime && ` — ${formatTime(event.end.dateTime)}`}
          </p>
        )}
        {event.location && <p className="text-gray-400 text-xs mt-0.5">{event.location}</p>}
      </div>
    </div>
  )
}

function AgendaView({ currentDate, eventsByDate, todayKey }: {
  currentDate: Date
  eventsByDate: Record<string, CalendarEvent[]>
  todayKey: string
}) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)

  // Build list of days that have events, plus today
  const days = Array.from({ length: daysInMonth }).map((_, i) => {
    const day = i + 1
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return { day, dateKey, events: eventsByDate[dateKey] || [] }
  }).filter(d => d.events.length > 0 || d.dateKey === todayKey)

  if (days.length === 0) {
    return (
      <div className="px-6 py-12 text-center h-[500px]">
        <p className="text-gray-400 text-sm">No events this month</p>
      </div>
    )
  }

  return (
    <div className="overflow-y-auto h-[500px]">
      {days.map(({ day, dateKey, events }) => {
        const isToday = dateKey === todayKey
        const date = new Date(year, month, day)

        return (
          <div key={dateKey} className="flex border-b border-gray-100 last:border-0">
            {/* Date column */}
            <div className={`w-20 shrink-0 px-4 py-4 flex flex-col items-center justify-start border-r border-gray-100 ${isToday ? 'bg-royal-600/5' : ''}`}>
              <p className="font-display text-xs tracking-widest uppercase text-gray-400">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-display text-sm mt-0.5 ${isToday ? 'bg-royal-600 text-white' : 'text-gray-700'}`}>
                {day}
              </div>
            </div>

            {/* Events column */}
            <div className="flex-1 px-4 py-2">
              {events.length === 0 ? (
                <div className="py-3 text-gray-300 text-xs italic">No events</div>
              ) : (
                events.map(event => <EventDetail key={event.id} event={event} />)
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [activeCalendars, setActiveCalendars] = useState<Set<string>>(
    new Set(CALENDARS.map(c => c.id))
  )
  const [view, setView] = useState<View>('agenda')
  const [viewOpen, setViewOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [direction, setDirection] = useState(0)

  const viewRef = useRef<HTMLDivElement>(null)
  const calendarFilterRef = useRef<HTMLDivElement>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (viewRef.current && !viewRef.current.contains(target)) setViewOpen(false)
      if (calendarFilterRef.current && !calendarFilterRef.current.contains(target)) setCalendarOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        const timeMin = new Date(year, month, 1).toISOString()
        const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString()

        const results = await Promise.all(
          CALENDARS.map(cal =>
            fetch(
              `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cal.id)}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
            )
              .then(res => res.json())
              .then(data => (data.items || []).map((item: any) => ({
                ...item,
                calendarId: cal.id,
                calendarName: cal.name,
                calendarColor: cal.color,
              })))
          )
        )

        setEvents(results.flat())
      } catch (err) {
        setError('Could not load calendar events.')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [year, month])

  const toggleCalendar = (id: string) => {
    setActiveCalendars(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        if (next.size === 1) return prev
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const filteredEvents = events.filter(e => activeCalendars.has(e.calendarId))

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const eventsByDate: Record<string, CalendarEvent[]> = {}
  filteredEvents.forEach(event => {
    const key = eventDateKey(event)
    if (!eventsByDate[key]) eventsByDate[key] = []
    eventsByDate[key].push(event)
  })

  const selectedEvents = selectedDate ? (eventsByDate[selectedDate] || []) : []

  const prev = () => {
    setDirection(1)
    setCurrentDate(new Date(year, month - 1, 1))
  }
  const next = () => {
    setDirection(-1)
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const today = new Date()
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  return (
    <section className="bg-silver-300 py-16 px-6 border-b border-silver-600/20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">TEAM</p>
          <h2 className="font-display text-black-500 text-6xl tracking-widest">CALENDAR</h2>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="bg-black-500 px-4 py-2 flex items-center gap-3">
            <button onClick={prev} className="text-white/70 hover:text-white transition-colors shrink-0">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <p className="font-display text-white text-base sm:text-xl tracking-widest uppercase flex-1 text-center">
              {getHeaderLabel(view, currentDate)}
            </p>

            <div className="flex items-center gap-2 shrink-0">
              {/* Calendar filter dropdown */}
              <div ref={calendarFilterRef} className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setCalendarOpen(!calendarOpen) }}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-display tracking-widest uppercase px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span className="hidden sm:inline">Calendars</span>
                  <svg className={`w-3 h-3 transition-transform ${calendarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {calendarOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-xl rounded-xl overflow-hidden z-50">
                    {CALENDARS.map(cal => {
                      const isActive = activeCalendars.has(cal.id)
                      return (
                        <button
                          key={cal.id}
                          onClick={() => toggleCalendar(cal.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                          <div
                            className="w-3 h-3 rounded-full shrink-0 border-2 transition-colors"
                            style={{ backgroundColor: isActive ? cal.color : 'transparent', borderColor: cal.color }}
                          />
                          <span className="font-display text-xs tracking-widest uppercase text-black-500 text-left flex-1">
                            {cal.name}
                          </span>
                          {/* {isActive && (
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                            </svg>
                          )} */}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* View dropdown */}
              <div ref={viewRef} className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setViewOpen(!viewOpen) }}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-display tracking-widest uppercase px-3 py-1.5 rounded-lg transition-colors"
                >
                  {view}
                  <svg className={`w-3 h-3 transition-transform ${viewOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {viewOpen && (
                  <div className="absolute right-0 top-full mt-2 w-36 bg-white shadow-xl rounded-xl overflow-hidden z-50">
                    {(['month', 'agenda'] as View[]).map((v) => (
                      <button
                        key={v}
                        onClick={() => { setView(v); setViewOpen(false) }}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 font-display text-xs tracking-widest uppercase ${view === v ? 'text-royal-600' : 'text-black-500'}`}
                      >
                        {v === 'agenda' ? 'Agenda' : v}
                        {view === v && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button onClick={next} className="text-white/70 hover:text-white transition-colors shrink-0">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Day labels — month only */}
          {view === 'month' && (
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-2 text-center font-display text-xs tracking-widest uppercase text-gray-400">
                  {day}
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="h-[500px] flex items-center justify-center">
              {/* <p className="font-display text-silver-500 tracking-widest">LOADING...</p> */}
            </div>
          ) : error ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          ) : view === 'month' ? (
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${year}-${month}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -80) next()
                    else if (info.offset.x > 80) prev()
                  }}
                  className="grid grid-cols-7 auto-rows-80 sm:auto-rows-[100px] bg-white">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="border-b border-r border-gray-100 bg-gray-50/50 h-full p-1 flex flex-col" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    const dayEvents = eventsByDate[dateKey] || []
                    const isToday = dateKey === todayKey
                    const isSelected = dateKey === selectedDate

                    return (
                      <div
                        key={day}
                        onClick={() => setSelectedDate(isSelected ? null : dateKey)}
                        className={`border-b border-r border-gray-100 min-h-[4rem] p-1.5 cursor-pointer transition-colors ${isSelected ? 'bg-royal-600/10' : 'hover:bg-gray-50'}`}
                      >
                        <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-display mb-1 ${isToday ? 'bg-royal-600 text-white' : 'text-gray-700'}`}>
                          {day}
                        </div>
                        <div className="space-y-0.5 overflow-hidden flex-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div key={event.id} className="text-xs text-white px-0.5 py-0.5 rounded truncate" style={{ backgroundColor: event.calendarColor }}>
                              {event.summary}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 font-bold">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <AgendaView currentDate={currentDate} eventsByDate={eventsByDate} todayKey={todayKey} />
          )}

          {/* Selected day events — month view only */}
          {selectedDate && view === 'month' && (
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <p className="font-display text-black-500 text-sm tracking-widest uppercase mb-3">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              {selectedEvents.length === 0 ? (
                <p className="text-gray-400 text-sm">No events</p>
              ) : (
                <div className="space-y-0 overflow-hidden flex-1">
                  {selectedEvents.map(event => <EventDetail key={event.id} event={event} />)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
