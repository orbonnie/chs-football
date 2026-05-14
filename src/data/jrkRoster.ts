import type {Coach} from "@/components/CoachCard"
import type {JrkPlayer} from "@/components/JrkPlayerCard"

export const players: JrkPlayer[] = [
    // 6TH GRADE

  // 7TH GRADE
  { grade: '7th', number: 6, name: 'Arlo Owens', position: 'QB' },
  { grade: '7th', number: 1, name: 'Camp Taylor', position: 'FLEX' },
  { grade: '7th', number: 1, name: 'Charlie Payment', position: 'CENTER' },
  { grade: '7th', number: 1, name: 'Chase Frazer', position: 'OL/DL' },
  { grade: '7th', number: 1, name: 'Derryll Jordan', position: 'OL/DL' },
  { grade: '7th', number: 1, name: 'Dunamis Max-Onakpoya', position: 'TE' },
  { grade: '7th', number: 1, name: 'Elijah Frederick', position: 'FLEX' },
  { grade: '7th', number: 1, name: 'Gabriel Robertson', position: 'FLEX' },
  { grade: '7th', number: 1, name: 'Grant Thompson', position: 'OL/DL' },
  { grade: '7th', number: 1, name: 'Jack Snoby', position: 'FLEX' },
  { grade: '7th', number: 1, name: 'Jacob Tedder', position: 'DE' },
  { grade: '7th', number: 1, name: 'John Hollenbaugh', position: 'WR, QB, K' },
  { grade: '7th', number: 1, name: 'Kanav Patel', position: 'OL, WR' },
  { grade: '7th', number: 1, name: 'Kyser Black', position: 'FLEX' },
  { grade: '7th', number: 1, name: 'Landon Johns', position: 'FLEX' },
  { grade: '7th', number: 1, name: 'Loic-Hentz Joseph', position: 'FLEX' },
  { grade: '7th', number: 1, name: 'Mark Fleetwood', position: 'LB' },
  { grade: '7th', number: 1, name: 'Malachi Delisle', position: 'SAFETY' },
  { grade: '7th', number: 1, name: 'Mason Delisle', position: 'OL/DL' },
  { grade: '7th', number: 1, name: 'Michael Lapresi', position: 'WR/RB' },
  { grade: '7th', number: 1, name: 'Parker Wright', position: 'OL' },
  { grade: '7th', number: 1, name: 'Rocco Rice-Muse', position: 'WR, LB' },
  { grade: '7th', number: 1, name: 'Sam Walker', position: 'TE, SAFETY' },
  { grade: '7th', number: 1, name: 'Stephen Jackson', position: 'RB' },
  { grade: '7th', number: 1, name: 'Stewart Przyjemski', position: 'RB' },
  { grade: '7th', number: 1, name: 'Timothy Richie', position: 'K' },
  { grade: '7th', number: 1, name: 'Tristin Sanders Jr.', position: 'OL, WR' },
  { grade: '7th', number: 1, name: 'Tyler Williams', position: 'WR' },
  { grade: '7th', number: 1, name: 'Tynique Swinton', position: 'OL/DL' },

  // 8TH GRADE
]

export const coaches: Coach[] = [
  { grade: "6th", name: "Will Bass", role: "Head Coach", photo: "" },
  { grade: "6th", name: "Sean Dent", role: "Assistant Coach", photo: "" },
  { grade: "7th", name: "Alpha Owens", role: "Head Coach", photo: "" },
  { grade: "7th", name: "Malik Patel", role: "Offensive Coordinator", photo: "" },
  { grade: "7th", name: "Andy Payment", role: "Special Teams", photo: "" },
  { grade: "7th", name: "Sam Walker", role: "Defensive Coordinator", photo: "" },
  { grade: "7th", name: "Krystian Pryzemski", role: "Defensive Backs", photo: "" },
  { grade: "7th", name: "Dustin Lepresi", role: "Linebackers", photo: "" },
  { grade: "7th", name: "Doug Tedder", role: "Stats", photo: "" },
  { grade: "8th", name: "Daniel Howard", role: "Head Coach", photo: "" },
  { grade: "8th", name: "Gary Robinson", role: "Assistant Coach", photo: "" },
  { grade: "8th", name: "Terrell Laster", role: "Assistant Coach", photo: "" },
]

export const eighthCoaches = coaches.filter(p => p.grade === '8th')
export const seventhCoaches = coaches.filter(p => p.grade === '7th')
export const sixthCoaches = coaches.filter(p => p.grade === '6th')

export const eighthRoster = players.filter(p => p.grade === '8th')
export const seventhRoster = players.filter(p => p.grade === '7th')
export const sixthRoster = players.filter(p => p.grade === '6th')
