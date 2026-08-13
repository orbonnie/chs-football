export const POSITION_ABBREVIATIONS: Record<string, string> = {
  'quarterback': 'QB',
  'running back': 'RB',
  'wide receiver': 'WR',
  'tight end': 'TE',
  'offensive line': 'OL',
  'defensive line': 'DL',
  'defensive end': 'DE',
  'linebacker': 'LB',
  'defensive back': 'DB',
  'ath': 'ATH',
  'kicker': 'K',
  'punter': 'P',
}

export function formatPosition(pos: string) {
  if (!pos) return ''
  return pos
    .split('|')
    .map(pos => POSITION_ABBREVIATIONS[pos.trim().toLowerCase()] ?? pos.trim())
    .join('/')
}