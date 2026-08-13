export function capWords(s: string) {
  const words = s.split(' ');

  return words.map((word: string) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join(' ');

}

const player = capWords("fred")

console.log(player)
