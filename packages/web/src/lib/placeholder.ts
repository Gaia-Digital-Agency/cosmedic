/**
 * Brand-painted SVG fallback for images that 404 — ported verbatim from
 * `design/shared.jsx`. The site never shows a broken-image icon; on `onError`
 * the `<Img>` primitive swaps its src for this generated SVG.
 */

// 25.19 palette enforcement: gradient pairs use ONLY the 5 sanctioned
// brand hexes — #1F1B16 (ink), #533E27 (dark-brown), #A67C52 (bronze),
// #E6DCC8 (cream), #F4EFE6 (paper). Six pair combos give variety without
// introducing any non-conforming shade.
const HUES: [string, string][] = [
  ['#E6DCC8', '#A67C52'], // cream → bronze
  ['#F4EFE6', '#533E27'], // paper → dark-brown
  ['#E6DCC8', '#533E27'], // cream → dark-brown
  ['#F4EFE6', '#A67C52'], // paper → bronze
  ['#E6DCC8', '#1F1B16'], // cream → ink
  ['#F4EFE6', '#1F1B16'], // paper → ink
]

export function placeholder(label = 'BIMC', hueShift = 0, w = 1200, h = 1500): string {
  const [a, b] = HUES[hueShift % HUES.length]
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="r" cx="0.3" cy="0.25" r="0.7">
      <stop offset="0%" stop-color="${a}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${b}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#r)"/>
  <g opacity="0.18" stroke="${b}" stroke-width="1" fill="none">
    <circle cx="${w * 0.32}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.28}"/>
    <circle cx="${w * 0.32}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.2}"/>
    <circle cx="${w * 0.32}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.36}"/>
  </g>
  <text x="${w - 32}" y="${h - 32}" text-anchor="end"
        font-family="JetBrains Mono, monospace" font-size="16"
        letter-spacing="3" fill="${b}" opacity="0.55">${label}</text>
</svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}
