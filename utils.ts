import { CATEGORY_META } from "./theme";
import type { Category } from "./types";

// Fixed reference "now" so the prototype's relative timestamps
// ("2h ago") are stable and reproducible. Replace with `new Date()`
// once real, live article data is wired up.
export const NOW = new Date("2026-08-17T14:00:00Z");

export function hoursAgo(h: number): string {
  return new Date(NOW.getTime() - h * 3600 * 1000).toISOString();
}

export function timeAgo(iso: string): string {
  const diffMs = NOW.getTime() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

export function readingTime(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100));
  let g =
    ((num >> 8) & 0x00ff) +
    Math.round((255 - ((num >> 8) & 0x00ff)) * (percent / 100));
  let b =
    (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * (percent / 100));
  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Original, self-contained placeholder art: a gradient tile + monogram,
// encoded as an SVG data URI so it behaves like a real <img> (supports
// loading="lazy") without any external network request or asset file.
export function placeholderImage(category: Category, seed = 0): string {
  const meta = CATEGORY_META[category] || CATEGORY_META.World;
  const c1 = meta.color;
  const c2 = shade(c1, 18 + (seed % 3) * 6);
  const letter = category.charAt(0);
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
      <defs>
        <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='${c1}'/>
          <stop offset='100%' stop-color='${c2}'/>
        </linearGradient>
      </defs>
      <rect width='800' height='450' fill='url(#g)'/>
      <circle cx='${640 + (seed % 5) * 10}' cy='${90 + (seed % 4) * 12}' r='140' fill='#ffffff' opacity='0.05'/>
      <circle cx='120' cy='380' r='190' fill='#000000' opacity='0.08'/>
      <text x='40' y='340' font-family='Georgia, serif' font-size='150' fill='#ffffff' opacity='0.18'>${letter}</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
