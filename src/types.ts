export type Category =
  | "World"
  | "Pakistan"
  | "Politics"
  | "Business"
  | "Technology"
  | "Sports"
  | "Science"
  | "Entertainment"
  | "Geopolitics";

export interface Article {
  id: number;
  slug: string;
  category: Category;
  tags: Category[];
  headline: string;
  subheadline: string;
  summary: string;
  body: string[];
  author: string;
  authorTitle: string;
  publishedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  breaking: boolean;
  trendingRank: number | null;
}

export type View =
  | { type: "home" }
  | { type: "category"; category: Category }
  | { type: "search"; query: string }
  | { type: "bookmarks" }
  | { type: "article"; id: number };

export interface Theme {
  bg: string;
  bgAlt: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  headerBg: string;
  inputBg: string;
}
