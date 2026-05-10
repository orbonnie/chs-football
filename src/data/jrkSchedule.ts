export type JrkGame = {
  date: string
  isoDate: string
  opponent: string
  time: string
  note: string
  location: 'vs' | '@' | 'BYE' |'TBD'
  result: string
  grade: '6th' | '7th' | '8th'
}

export const games: JrkGame[] = [
    // 6TH GRADE
  { grade: '6th', date: 'May 16',  isoDate: '2026-05-16', opponent: 'Jamboree', time: '9:00 AM', note: '@ Kell HS', location: 'TBD', result: '' },
  { grade: '6th', date: 'Aug 22',  isoDate: '2026-08-22', opponent: 'TBD', time: 'TBD', note: '', location: 'TBD', result: '' },

    // 7TH GRADE
  { grade: '7th', date: 'May 16',  isoDate: '2026-05-16', opponent: 'Jamboree', time: '11:30 AM', note: '@ Kell HS', location: 'TBD', result: '' },
  { grade: '7th', date: 'Aug 22',  isoDate: '2026-08-22', opponent: 'TBD', time: 'TBD', note: '', location: 'TBD', result: '' },

  // 8TH GRADE
  { grade: '8th', date: 'May 16',  isoDate: '2026-05-16', opponent: 'Jamboree', time: '2:00 PM', note: '@ Kell HS', location: 'TBD', result: '' },
  { grade: '8th', date: 'Aug 22',  isoDate: '2026-08-22', opponent: 'TBD', time: 'TBD', note: '', location: 'TBD', result: '' },
]

export const eighthGrade = games.filter(g => g.grade === '8th')
export const seventhGrade = games.filter(g => g.grade === '7th')
export const sixthGrade = games.filter(g => g.grade === '6th')