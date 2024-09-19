export default function isValidOnionUrl(url: string): boolean {
  if (!URL.canParse(url)) throw new Error("Invalid URL");
  const u = new URL(url);
  return /^.*\.[a-z2-7]{56}\.onion$/.test(u.hostname);
}
