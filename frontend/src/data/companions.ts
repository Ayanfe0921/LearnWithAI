export const companions = [
  { id: 'nova', name: 'Nova', title: 'The curious one', note: 'Bright ideas and big questions.', emoji: '\u{1F989}', color: 'violet' },
  { id: 'atlas', name: 'Atlas', title: 'The steady guide', note: 'A calm companion for big goals.', emoji: '\u{1F43B}', color: 'blue' },
  { id: 'milo', name: 'Milo', title: 'The cheerful coach', note: 'Here to make every step count.', emoji: '\u{1F98A}', color: 'peach' },
  { id: 'byte', name: 'Byte', title: 'The quick thinker', note: 'Short lessons, sharp insights.', emoji: '\u{1F916}', color: 'mint' },
] as const

export type CompanionId = (typeof companions)[number]['id']
