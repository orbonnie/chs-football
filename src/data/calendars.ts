export const ALL_CALENDARS = [
  {
    id: '0dc6f5b46b44f0fb18d841c41d007c96960842c29b901e98f88935b5d978af9c@group.calendar.google.com',
    name: 'Varsity Games',
    color: '#08129C',
    group: 'High School',
  },
  {
    id: 'f535be00e0654a2cb18c463463cd25e10d4db8d07d2dad50edd8112aaa2cef6d@group.calendar.google.com',
    name: 'JV Games',
    color: '#2442E8',
    group: 'High School',
  },
  {
    id: 'cd8793cbfb0c1b13d946b6f6c373dfc2a51ebee4a26ffa80baf3f0b6fc9b1f6e@group.calendar.google.com',
    name: 'Freshman Games',
    color: '#7A8EA0',
    group: 'High School',
  },
  {
    id: '098655c47346ec4ff43de7ac112a91ac1563024d8a9884bd33ae3ccf123aa3fa@group.calendar.google.com',
    name: 'Jr Knights',
    color: '#0EA5f9',
    group: 'Jr Knights',
  },
  {
    id: 'b04395491d033a444ab6997960a4b9330e97efe34f62dd77e5038344655f68ec@group.calendar.google.com',
    name: 'CHS',
    color: '#172554',
    group: 'High School',
  },
  {
    id: '87485c37d867e372e6a0cef8a3c3fb1a0d5b9ceedadc8605411ab6e68f779843@group.calendar.google.com',
    name: 'General',
    color: '#EAB308',
    group: 'General',
  },
  {
    id: 'a32fd7f19d77220c4334f4ce345c0fac71861834ac5ab432027a0f162e9ffeaa@group.calendar.google.com',
    name: '6th Grade Games',
    color: '#6AAF82',
    group: 'Jr Knights',
  },
  {
    id: '32d88e3e963712737323f9ca31bd9b1c0a96d0028388e6f6428fb943e8cac342@group.calendar.google.com',
    name: '7th Grade Games',
    color: '#3A8F5C',
    group: 'Jr Knights',
  },
  {
    id: 'ed34d296ede9a459ab53f193c07e9b3323602195c4cf0cf66741155c14ee9ee9@group.calendar.google.com',
    name: '8th Grade Games',
    color: '#1A4731',
    group: 'Jr Knights',
  },
]

export const JRK_GAMES =[

]

export const varsityGames = ALL_CALENDARS.filter((c) => c.name === "Varsity Games")[0]
export const jvGames = ALL_CALENDARS.filter((c) => c.name === "JV Games")[0]
export const freshmanGames = ALL_CALENDARS.filter((c) => c.name === "Freshman Games")[0]

export const sixthGames = ALL_CALENDARS.filter((c) => c.name === "6th Grade Games")[0]
export const seventhGames = ALL_CALENDARS.filter((c) => c.name === "7th Grade Games")[0]
export const eighthGames = ALL_CALENDARS.filter((c) => c.name === "8th Grade Games")[0]
