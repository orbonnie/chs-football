export function capWords(s: string) {
  const words = s.split(' ');

  return words.map((word: string) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join(' ');

}


export function isHudlUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "hudl.com" ||
        url.hostname.endsWith(".hudl.com"))
    );
  } catch {
    return false;
  }
}
