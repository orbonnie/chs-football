export type Game = {
  date: string
  isoDate: string
  opponent: string
  time: string
  note: string
  location: 'vs' | '@' | 'BYE' | 'scrimmage'
  result: string
  recording: string
  team: 'varsity' | 'jv' | 'freshman'
}

export const games: Game[] = [
  // VARSITY
  { team: 'varsity', date: 'May 8',  isoDate: '2026-05-08', opponent: 'Black and Blue', time: '6:00 PM', note: '', location: 'scrimmage', result: "", recording: "" },
  { team: 'varsity', date: 'May 15', isoDate: '2026-05-15', opponent: 'Chamblee', time: '7:30 PM', note: '', location: 'scrimmage', result: "", recording: "" },
  { team: 'varsity', date: 'Aug 20', isoDate: '2026-08-20', opponent: 'Dunwoody', time: '7:30 PM', note: 'Corky Kell\n@Blessed Trinity', location: '@', result: "", recording: "" },
  { team: 'varsity', date: 'Aug 28', isoDate: '2026-08-28', opponent: 'Johns Creek', time: '7:30 PM', note: 'Veteran Memorial Bowl', location: 'vs', result: "", recording: "" },
  { team: 'varsity', date: 'Sep 4',  isoDate: '2026-09-04', opponent: 'Alpharetta', time: '7:30 PM', note: 'Senior Night', location: 'vs', result: "", recording: "" },
  { team: 'varsity', date: 'Sep 11', isoDate: '2026-09-11', opponent: 'South Forsyth', time: '7:30 PM', note: '', location: '@', result: "", recording: "" },
  { team: 'varsity', date: 'Sep 18', isoDate: '2026-09-18', opponent: 'Cambridge', time: '7:30 PM', note: 'Jr. Knight Night', location: 'vs', result: "", recording: "" },
  { team: 'varsity', date: 'Sep 25', isoDate: '2026-09-25', opponent: '', time: '', note: '', location: 'BYE', result: "", recording: "" },
  { team: 'varsity', date: 'Oct 2',  isoDate: '2026-10-02', opponent: 'Blessed Trinity', time: '7:30 PM', note: '', location: '@', result: "", recording: "" },
  { team: 'varsity', date: 'Oct 9',  isoDate: '2026-10-09', opponent: 'St. Pius', time: '7:30 PM', note: '', location: '@', result: "", recording: "" },
  { team: 'varsity', date: 'Oct 16', isoDate: '2026-10-16', opponent: '', time: '', note: '', location: 'BYE', result: "", recording: "" },
  { team: 'varsity', date: 'Oct 23', isoDate: '2026-10-23', opponent: 'Sprayberry', time: '7:30 PM', note: 'Homecoming', location: 'vs', result: "", recording: "" },
  { team: 'varsity', date: 'Oct 30', isoDate: '2026-10-30', opponent: 'Marist', time: '7:30 PM', note: '', location: '@', result: "", recording: "" },
  { team: 'varsity', date: 'Nov 6',  isoDate: '2026-11-06', opponent: 'Chattahoochee', time: '7:30 PM', note: '', location: 'vs', result: "", recording: "" },

  // JV
  { team: 'jv', date: 'Sep 3',  isoDate: '2026-09-03', opponent: 'Alpharetta', time: '6:00 PM', note: '', location: '@', result: "", recording: "" },
  { team: 'jv', date: 'Sep 10', isoDate: '2026-09-10', opponent: 'Northview', time: '6:00 PM', note: '', location: 'vs', result: "", recording: "" },
  { team: 'jv', date: 'Sep 17', isoDate: '2026-09-17', opponent: 'South Forsyth', time: '6:00 PM', note: '', location: '@', result: "", recording: "" },
  { team: 'jv', date: 'Sep 24', isoDate: '2026-09-24', opponent: '', time: '', note: '', location: 'BYE', result: "", recording: "" },
  { team: 'jv', date: 'Oct 1',  isoDate: '2026-10-01', opponent: 'North Springs', time: '6:00 PM', note: '', location: 'vs', result: "", recording: "" },
  { team: 'jv', date: 'Oct 8',  isoDate: '2026-10-08', opponent: 'Johns Creek', time: '6:00 PM', note: '', location: '@', result: "", recording: "" },
  { team: 'jv', date: 'Oct 15', isoDate: '2026-10-15', opponent: 'Riverwood', time: '6:00 PM', note: '', location: 'vs', result: "", recording: "" },
  { team: 'jv', date: 'Oct 28', isoDate: '2026-10-28', opponent: 'Chattahoochee', time: '6:00 PM', note: '', location: '@', result: "", recording: "" },

  // FRESHMAN
  { team: 'freshman', date: 'Aug 26',  isoDate: '2026-08-26', opponent: 'Chattahoochee', time: '6:00 PM', note: '', location: 'vs', result: "", recording: "" },
  { team: 'freshman', date: 'Sep 17', isoDate: '2026-09-17', opponent: 'South Forsyth', time: '6:00 PM', note: '', location: 'vs', result: "", recording: "" },
  { team: 'freshman', date: 'Oct 19', isoDate: '2026-10-19', opponent: 'Fellowship Christian', time: '6:00 PM', note: '', location: '@', result: "", recording: "" },
]

// Helper to get just one team's games
export const varsity = games.filter(g => g.team === 'varsity')
export const jv = games.filter(g => g.team === 'jv')
export const freshman = games.filter(g => g.team === 'freshman')

// Helper for NextGame component
export function getNextGame(): Game | null {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return (
    games.find(g => {
      if(g.location === 'BYE') return false

      const [year, month, day] = g.isoDate.split('-').map(Number)
      const gameDate = new Date(year, month - 1, day) // Format to 0-indexed months
      return gameDate >= today
    }) ?? null
  )
}