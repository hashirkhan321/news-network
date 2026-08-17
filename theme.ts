import {
  Globe2,
  Landmark,
  Briefcase,
  Cpu,
  Trophy,
  FlaskConical,
  Clapperboard,
  Swords,
  type LucideIcon,
} from "lucide-react";
import type { Category, Theme } from "./types";

export const FONTS = {
  display: "'Newsreader', Georgia, serif",
  body: "'IBM Plex Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, monospace",
};

export const BRAND = {
  breaking: "#C81E1E",
  wire: "#A9762F", // signature "wire gold" — trending numerals, dividers
};

export const LIGHT: Theme = {
  bg: "#FFFFFF",
  bgAlt: "#F6F7F9",
  surface: "#FFFFFF",
  text: "#0B1220",
  textMuted: "#5B6472",
  border: "#E4E7EC",
  headerBg: "#FFFFFFF2",
  inputBg: "#FFFFFF",
};

export const DARK: Theme = {
  bg: "#0B1220",
  bgAlt: "#0F1729",
  surface: "#121B2E",
  text: "#EDF0F5",
  textMuted: "#9AA4B2",
  border: "#22304A",
  headerBg: "#0B1220F2",
  inputBg: "#121B2E",
};

export const CATEGORY_META: Record<Category, { color: string; icon: LucideIcon }> = {
  World: { color: "#14324F", icon: Globe2 },
  Pakistan: { color: "#145C3D", icon: Landmark },
  Politics: { color: "#3B3358", icon: Landmark },
  Business: { color: "#7A5B12", icon: Briefcase },
  Technology: { color: "#0E6E75", icon: Cpu },
  Sports: { color: "#1D5A8A", icon: Trophy },
  Science: { color: "#4A5D23", icon: FlaskConical },
  Entertainment: { color: "#8A3B5C", icon: Clapperboard },
  Geopolitics: { color: "#5C2E2E", icon: Swords },
};

export const NAV_CATEGORIES: Category[] = [
  "World",
  "Pakistan",
  "Politics",
  "Business",
  "Technology",
  "Sports",
  "Science",
  "Entertainment",
];

export const SECTION_CATEGORIES: Category[] = [
  "World",
  "Pakistan",
  "Geopolitics",
  "Technology",
  "Business",
  "Sports",
];
