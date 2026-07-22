/** Unique SVG favicons per site */

export function faviconSvg(kind) {
  const common = `xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"`;
  switch (kind) {
    case "bolt":
      return `<svg ${common}><rect width="64" height="64" rx="12" fill="#0B1220"/><path d="M36 8 L18 34 h14 L26 56 L48 28 H34 L42 8 Z" fill="#FFF200" stroke="#1B1464" stroke-width="2"/></svg>`;
    case "tile":
      return `<svg ${common}><rect width="64" height="64" rx="14" fill="#071512"/><rect x="12" y="12" width="18" height="18" rx="4" fill="#2EE6C5"/><rect x="34" y="12" width="18" height="18" rx="4" fill="#5AD7FF"/><rect x="12" y="34" width="18" height="18" rx="4" fill="#5AD7FF"/><rect x="34" y="34" width="18" height="18" rx="4" fill="#2EE6C5"/></svg>`;
    case "olympus":
      return `<svg ${common}><rect width="64" height="64" rx="10" fill="#12060a"/><circle cx="32" cy="32" r="18" fill="none" stroke="#ED1C24" stroke-width="4"/><path d="M32 16 l4 12 h12 l-10 8 4 12 -10-7 -10 7 4-12 -10-8 h12z" fill="#FFF200"/></svg>`;
    case "flame":
      return `<svg ${common}><rect width="64" height="64" rx="12" fill="#140d06"/><path d="M32 8c8 10 14 16 14 28a14 14 0 0 1-28 0c0-8 4-14 8-20 2 6 6 8 8 8 0-6-2-12-2-16z" fill="#FF9F1C"/><path d="M32 28c4 4 6 8 6 14a6 6 0 0 1-12 0c0-4 2-7 4-10 1 3 2 4 3 4 0-3-1-6-1-8z" fill="#FF4D00"/></svg>`;
    case "gem":
      return `<svg ${common}><rect width="64" height="64" rx="8" fill="#081210"/><path d="M32 10 L50 26 L32 54 L14 26 Z" fill="#3DDC97"/><path d="M32 10 L40 26 H24 Z" fill="#D4AF37"/><path d="M14 26 H50 L32 54 Z" fill="#2aa87a"/></svg>`;
    case "xmark":
      return `<svg ${common}><rect width="64" height="64" fill="#0a0508"/><path d="M16 16 L48 48 M48 16 L16 48" stroke="#FF2E63" stroke-width="8" stroke-linecap="square"/><path d="M20 32 H44" stroke="#08F7FE" stroke-width="3"/></svg>`;
    case "chip":
      return `<svg ${common}><rect width="64" height="64" rx="16" fill="#14080d"/><circle cx="32" cy="32" r="22" fill="#E63946"/><circle cx="32" cy="32" r="14" fill="#241018"/><circle cx="32" cy="32" r="8" fill="#F4A261"/><path d="M32 10 v8 M32 46 v8 M10 32 h8 M46 32 h8" stroke="#fff" stroke-width="3"/></svg>`;
    case "curve":
      return `<svg ${common}><rect width="64" height="64" rx="10" fill="#050805"/><path d="M8 48 C20 44, 24 20, 36 16 S52 8, 56 8" fill="none" stroke="#B6FF3B" stroke-width="5" stroke-linecap="round"/><circle cx="52" cy="10" r="4" fill="#FF2E63"/></svg>`;
    case "whistle":
      return `<svg ${common}><rect width="64" height="64" rx="12" fill="#07140f"/><circle cx="32" cy="32" r="20" fill="none" stroke="#2ECC71" stroke-width="5"/><path d="M32 16 v16 l10 8" stroke="#3498DB" stroke-width="4" stroke-linecap="round" fill="none"/></svg>`;
    case "shield":
      return `<svg ${common}><rect width="64" height="64" rx="14" fill="#0b1220"/><path d="M32 10c-10 6-16 12-16 22 0 10 8 18 16 20 8-2 16-10 16-20 0-10-6-16-16-22z" fill="#152238" stroke="#7EB6FF" stroke-width="3"/><path d="M24 32 l6 6 12-14" fill="none" stroke="#C9E0FF" stroke-width="4" stroke-linecap="round"/></svg>`;
    default:
      return `<svg ${common}><rect width="64" height="64" rx="12" fill="#111"/><text x="32" y="40" text-anchor="middle" fill="#FFF200" font-size="28" font-family="Arial Black,sans-serif">S</text></svg>`;
  }
}
