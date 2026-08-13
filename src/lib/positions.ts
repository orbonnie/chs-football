export const POSITION_ABBREVIATIONS: Record<string, string> = {
  'Quarterback': 'QB',
  'Running Back': 'RB',
  'Wide Receiver': 'WR',
  'Tight End': 'TE',
  'Offensive Line': 'OL',
  'Defensive Line': 'DL',
  'Defensive End': 'DE',
  'Linebacker': 'LB',
  'Defensive Back': 'DB',
  'ATH': 'ATH',
  'Kicker': 'K',
  'Punter': 'P',
}

export function formatPosition(pos: string) {
  if (!pos) return ''
  return pos
    .split('|')
    .map(pos => POSITION_ABBREVIATIONS[pos.trim()] ?? pos.trim())
    .join('/')
}