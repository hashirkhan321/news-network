import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Menu,
  X,
  Moon,
  Sun,
  Bookmark,
  BookmarkCheck,
  Clock,
  TrendingUp,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Mail,
  Radio,
} from "lucide-react";
import type { Article, Category } from "./types";
import { BRAND, CATEGORY_META, FONTS, NAV_CATEGORIES } from "./theme";
import { cx, placeholderImage, readingTime, timeAgo } from "./utils";
import { useApp } from "./context";

/* ------------------------------ Basics ------------------------------ */

export function Logo({ compact = false }: { compact?: boolean }) {
  const { theme } = useApp();
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-sm text-sm font-bold text-white"
        style={{ backgroundColor: theme.text, fontFamily: FONTS.display }}
        aria-hidden="true"
      >
        N
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cx("font-bold tracking-tight", compact ? "text-base" : "text-lg")}
          style={{ color: theme.text, fontFamily: FONTS.display }}
        >
          News Network
        </span>
        {!compact && (
          <span
            className="font-medium uppercase tracking-widest"
            style={{ color: BRAND.wire, fontFamily: FONTS.mono, fontSize: "10px" }}
          >
            The World. In Focus.
          </span>
        )}
      </span>
    </div>
  );
}

export function CategoryEyebrow({
  category,
  size = "xs",
}: {
  category: Category;
  size?: "xs" | "base";
}) {
  const meta = CATEGORY_META[category] || CATEGORY_META.World;
  const Icon = meta.icon;
  return (
    <span
      className="inline-flex items-center gap-1 font-semibold uppercase tracking-widest"
      style={{
        color: meta.color,
        fontFamily: FONTS.mono,
        letterSpacing: "0.08em",
        fontSize: size === "xs" ? "11px" : "12px",
      }}
    >
      <Icon size={size === "xs" ? 11 : 13} strokeWidth={2.25} />
      {category}
    </span>
  );
}

export function BreakingBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 font-bold uppercase tracking-wider text-white"
      style={{ backgroundColor: BRAND.breaking, fontFamily: FONTS.mono, fontSize: "11px" }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      Breaking
    </span>
  );
}

export function Dateline({
  author,
  publishedAt,
  readTime,
}: {
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime?: number;
}) {
  const { theme } = useApp();
  return (
    <div
      className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"
      style={{ color: theme.textMuted, fontFamily: FONTS.mono }}
    >
      <span>By {author}</span>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock size={12} /> {timeAgo(publishedAt)}
      </span>
      {readTime && (
        <>
          <span aria-hidden="true">·</span>
          <span>{readTime} min read</span>
        </>
      )}
    </div>
  );
}

export function BookmarkButton({ id, size = 18 }: { id: number; size?: number }) {
  const { bookmarks, toggleBookmark, theme } = useApp();
  const active = bookmarks.has(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleBookmark(id);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove bookmark" : "Save article"}
      className="inline-flex items-center justify-center rounded-full p-2 transition-colors focus-visible:outline focus-visible:outline-2"
      style={{ color: active ? BRAND.wire : theme.textMuted, outlineColor: BRAND.wire }}
    >
      {active ? <BookmarkCheck size={size} /> : <Bookmark size={size} />}
    </button>
  );
}

export function ShareRow({ headline }: { headline: string }) {
  const { theme, showToast } = useApp();
  const doShare = (kind: string) => {
    if (kind === "copy") {
      try {
        navigator.clipboard?.writeText(window.location.href);
      } catch (e) {
        /* clipboard unavailable — ignore */
      }
      showToast("Link copied to clipboard");
    } else {
      showToast(`Opens ${kind} share in a real deployment`);
    }
  };
  const items = [
    { key: "facebook", icon: Facebook, label: "Share on Facebook" },
    { key: "twitter", icon: Twitter, label: "Share on X" },
    { key: "linkedin", icon: Linkedin, label: "Share on LinkedIn" },
    { key: "copy", icon: LinkIcon, label: "Copy link" },
  ];
  return (
    <div className="flex items-center gap-2" role="group" aria-label={`Share "${headline}"`}>
      {items.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => doShare(key)}
          aria-label={label}
          title={label}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2"
          style={{ border: `1px solid ${theme.border}`, color: theme.textMuted, outlineColor: BRAND.wire }}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}

export function ArticleImage({
  article,
  ratio = "16 / 9",
  priority = false,
}: {
  article: Article;
  ratio?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: ratio }}>
      <img
        src={placeholderImage(article.category, article.id)}
        alt={`Editorial illustration for: ${article.headline}`}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover"
      />
      <span
        className="absolute bottom-1.5 right-1.5 rounded px-1.5 py-0.5 font-medium text-white/80"
        style={{ backgroundColor: "rgba(0,0,0,0.35)", fontFamily: FONTS.mono, fontSize: "9px" }}
      >
        placeholder image
      </span>
    </div>
  );
}

/* ------------------------------ Cards ------------------------------ */

export function HeroCard({ article, size = "large" }: { article: Article; size?: "large" | "compact" }) {
  const { theme, navigate } = useApp();
  const large = size === "large";
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-md"
      style={{ border: `1px solid ${theme.border}`, backgroundColor: theme.surface }}
    >
      <button
        type="button"
        onClick={() => navigate({ type: "article", id: article.id })}
        className="text-left focus-visible:outline focus-visible:outline-2"
        style={{ outlineColor: BRAND.wire }}
      >
        <ArticleImage article={article} priority={large} />
      </button>
      <div className={cx("flex flex-1 flex-col gap-2", large ? "p-5" : "p-4")}>
        <div className="flex items-center justify-between gap-2">
          <CategoryEyebrow category={article.category} />
          {article.breaking && <BreakingBadge />}
        </div>
        <button
          type="button"
          onClick={() => navigate({ type: "article", id: article.id })}
          className="text-left focus-visible:outline focus-visible:outline-2"
          style={{ outlineColor: BRAND.wire }}
        >
          <h2
            className={cx(
              "font-semibold leading-snug transition-colors group-hover:opacity-80",
              large ? "text-2xl md:text-3xl" : "text-lg"
            )}
            style={{ color: theme.text, fontFamily: FONTS.display }}
          >
            {article.headline}
          </h2>
        </button>
        {large && (
          <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
            {article.subheadline}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <Dateline author={article.author} publishedAt={article.publishedAt} readTime={readingTime(article.body)} />
          <BookmarkButton id={article.id} size={16} />
        </div>
      </div>
    </article>
  );
}

export function ListRow({ article }: { article: Article }) {
  const { theme, navigate } = useApp();
  return (
    <article className="flex gap-4 py-4" style={{ borderBottom: `1px solid ${theme.border}` }}>
      <button
        type="button"
        onClick={() => navigate({ type: "article", id: article.id })}
        className="w-28 flex-shrink-0 sm:w-36 focus-visible:outline focus-visible:outline-2"
        style={{ outlineColor: BRAND.wire }}
        aria-label={article.headline}
      >
        <ArticleImage article={article} ratio="4 / 3" />
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <CategoryEyebrow category={article.category} />
          {article.breaking && <BreakingBadge />}
        </div>
        <button
          type="button"
          onClick={() => navigate({ type: "article", id: article.id })}
          className="text-left focus-visible:outline focus-visible:outline-2"
          style={{ outlineColor: BRAND.wire }}
        >
          <h3 className="text-base font-semibold leading-snug sm:text-lg" style={{ color: theme.text, fontFamily: FONTS.display }}>
            {article.headline}
          </h3>
        </button>
        <p className="hidden text-sm leading-relaxed sm:line-clamp-2 sm:block" style={{ color: theme.textMuted }}>
          {article.summary}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <Dateline author={article.author} publishedAt={article.publishedAt} readTime={readingTime(article.body)} />
          <BookmarkButton id={article.id} size={15} />
        </div>
      </div>
    </article>
  );
}

export function TrendingList({ articles }: { articles: Article[] }) {
  const { theme, navigate } = useApp();
  const ranked = articles
    .filter((a) => a.trendingRank)
    .sort((a, b) => (a.trendingRank as number) - (b.trendingRank as number));
  return (
    <aside
      aria-labelledby="trending-heading"
      className="rounded-md p-5"
      style={{ border: `1px solid ${theme.border}`, backgroundColor: theme.surface }}
    >
      <h2
        id="trending-heading"
        className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
        style={{ color: theme.text, fontFamily: FONTS.mono }}
      >
        <TrendingUp size={15} style={{ color: BRAND.wire }} />
        Trending Now
      </h2>
      <ol className="flex flex-col gap-4">
        {ranked.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => navigate({ type: "article", id: a.id })}
              className="flex w-full items-start gap-3 text-left focus-visible:outline focus-visible:outline-2"
              style={{ outlineColor: BRAND.wire }}
            >
              <span className="text-2xl font-bold leading-none" style={{ color: BRAND.wire, fontFamily: FONTS.display }}>
                {a.trendingRank}
              </span>
              <span className="flex flex-col gap-1">
                <CategoryEyebrow category={a.category} />
                <span className="text-sm font-semibold leading-snug" style={{ color: theme.text, fontFamily: FONTS.display }}>
                  {a.headline}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}

export function BreakingTicker({ articles }: { articles: Article[] }) {
  const { theme, navigate } = useApp();
  const breaking = articles.filter((a) => a.breaking);
  if (breaking.length === 0) return null;
  const loop = [...breaking, ...breaking];
  return (
    <div
      className="flex items-stretch overflow-hidden"
      style={{ backgroundColor: theme.bgAlt, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}
      role="region"
      aria-label="Breaking news ticker"
    >
      <div
        className="flex flex-shrink-0 items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white"
        style={{ backgroundColor: BRAND.breaking, fontFamily: FONTS.mono }}
      >
        <Radio size={13} />
        Breaking
      </div>
      <div className="ticker-mask relative flex flex-1 items-center overflow-hidden">
        <div className="ticker-track flex flex-shrink-0 items-center gap-10 whitespace-nowrap py-2 pl-6">
          {loop.map((a, i) => (
            <button
              key={`${a.id}-${i}`}
              type="button"
              onClick={() => navigate({ type: "article", id: a.id })}
              className="text-sm font-medium hover:underline focus-visible:outline focus-visible:outline-2"
              style={{ color: theme.text, fontFamily: FONTS.body, outlineColor: BRAND.wire }}
            >
              {a.headline}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CategorySection({ title, articles }: { title: Category; articles: Article[] }) {
  const { theme, navigate } = useApp();
  if (articles.length === 0) return null;
  return (
    <section aria-labelledby={`section-${title}`} className="py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 id={`section-${title}`} className="flex items-center gap-2 text-xl font-bold" style={{ color: theme.text, fontFamily: FONTS.display }}>
          <span
            className="inline-block h-4 w-1"
            style={{ backgroundColor: (CATEGORY_META[title] || {}).color || BRAND.wire }}
            aria-hidden="true"
          />
          {title}
        </h2>
        <button
          type="button"
          onClick={() => navigate({ type: "category", category: title })}
          className="inline-flex items-center gap-0.5 text-xs font-semibold uppercase tracking-wide hover:underline focus-visible:outline focus-visible:outline-2"
          style={{ color: theme.textMuted, fontFamily: FONTS.mono, outlineColor: BRAND.wire }}
        >
          View all <ChevronRight size={13} />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((a) => (
          <HeroCard key={a.id} article={a} size="compact" />
        ))}
      </div>
    </section>
  );
}

export function Newsletter() {
  const { theme, showToast } = useApp();
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      showToast("Enter a valid email address");
      return;
    }
    showToast("Subscribed — thanks for joining News Network");
    setEmail("");
  };
  return (
    <section className="my-10 rounded-md px-6 py-10 text-center sm:px-10" style={{ backgroundColor: theme.text }}>
      <Mail size={22} className="mx-auto mb-3" style={{ color: "#fff" }} />
      <h2 className="text-2xl font-bold" style={{ color: "#fff", fontFamily: FONTS.display }}>
        Get the latest news delivered to your inbox
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "#C7CCD6" }}>
        One concise briefing a day. No spam, unsubscribe any time.
      </p>
      <form onSubmit={submit} className="mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-sm px-4 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2"
          style={{ backgroundColor: "#fff", color: "#0B1220", outlineColor: BRAND.wire }}
        />
        <button
          type="submit"
          className="rounded-sm px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2"
          style={{ backgroundColor: BRAND.wire, color: "#fff", fontFamily: FONTS.mono, outlineColor: "#fff" }}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}

export function Footer() {
  const { theme, showToast } = useApp();
  const cols = [
    { title: "Company", links: ["About", "Contact", "Careers"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Disclaimer"] },
  ];
  return (
    <footer style={{ borderTop: `1px solid ${theme.border}`, backgroundColor: theme.bgAlt }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: theme.textMuted }}>
              Independent coverage of world affairs, business, technology and sport — reported with context.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: theme.text, fontFamily: FONTS.mono }}>
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <button
                      type="button"
                      onClick={() => showToast(`${l} — placeholder page in this prototype`)}
                      className="text-sm hover:underline focus-visible:outline focus-visible:outline-2"
                      style={{ color: theme.textMuted, outlineColor: BRAND.wire }}
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: theme.text, fontFamily: FONTS.mono }}>
              Follow
            </h3>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => showToast("Social link — placeholder in this prototype")}
                  aria-label="Social media link"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2"
                  style={{ border: `1px solid ${theme.border}`, color: theme.textMuted, outlineColor: BRAND.wire }}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className="mt-10 flex flex-col items-center justify-between gap-3 pt-6 text-xs sm:flex-row"
          style={{ borderTop: `1px solid ${theme.border}`, color: theme.textMuted, fontFamily: FONTS.mono }}
        >
          <p>© 2026 News Network. All rights reserved.</p>
          <p>Prototype build — headlines are placeholder content.</p>
        </div>
      </div>
    </footer>
  );
}

export function EmptyState({ message }: { message: string }) {
  const { theme } = useApp();
  return (
    <div className="rounded-md px-6 py-14 text-center" style={{ border: `1px dashed ${theme.border}`, color: theme.textMuted }}>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function RelatedStories({ current, articles }: { current: Article; articles: Article[] }) {
  const { theme } = useApp();
  const related = articles.filter((a) => a.id !== current.id && a.category === current.category).slice(0, 3);
  const fallback = articles.filter((a) => a.id !== current.id).slice(0, 3);
  const list = related.length > 0 ? related : fallback;
  return (
    <section aria-labelledby="related-heading" className="mt-12">
      <h2 id="related-heading" className="mb-4 text-lg font-bold" style={{ color: theme.text, fontFamily: FONTS.display }}>
        Related Stories
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {list.map((a) => (
          <HeroCard key={a.id} article={a} size="compact" />
        ))}
      </div>
    </section>
  );
}

export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg"
      style={{ backgroundColor: "#0B1220" }}
    >
      {message}
    </div>
  );
}

/* ------------------------------ Header ------------------------------ */

export function Header() {
  const { theme, isDark, toggleDark, navigate, view, mobileMenuOpen, setMobileMenuOpen } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({ type: "search", query: query.trim() });
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const isActive = (cat: Category) => view.type === "category" && view.category === cat;

  return (
    <header className="sticky top-0 z-40 backdrop-blur" style={{ backgroundColor: theme.headerBg, borderBottom: `1px solid ${theme.border}` }}>
      <div
        className="hidden items-center justify-between px-4 py-1.5 sm:flex sm:px-6 lg:px-8"
        style={{ color: theme.textMuted, fontFamily: FONTS.mono, borderBottom: `1px solid ${theme.border}`, fontSize: "11px" }}
      >
        <span>
          {new Date("2026-08-17T14:00:00Z").toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span>GLOBAL EDITION</span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center lg:hidden focus-visible:outline focus-visible:outline-2"
          style={{ color: theme.text, outlineColor: BRAND.wire }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <button type="button" onClick={() => navigate({ type: "home" })} className="focus-visible:outline focus-visible:outline-2" style={{ outlineColor: BRAND.wire }}>
          <Logo />
        </button>

        <nav className="ml-4 hidden flex-1 items-center gap-5 lg:flex" aria-label="Primary">
          <button
            type="button"
            onClick={() => navigate({ type: "home" })}
            className="text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2"
            style={{ color: view.type === "home" ? BRAND.wire : theme.text, fontFamily: FONTS.mono, outlineColor: BRAND.wire }}
          >
            Home
          </button>
          {NAV_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => navigate({ type: "category", category: cat })}
              className="text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2"
              style={{ color: isActive(cat) ? BRAND.wire : theme.text, fontFamily: FONTS.mono, outlineColor: BRAND.wire }}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <div className="relative hidden sm:block">
            {searchOpen ? (
              <form onSubmit={submitSearch} role="search" className="flex items-center">
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onBlur={() => !query && setSearchOpen(false)}
                  placeholder="Search articles…"
                  aria-label="Search articles"
                  className="w-48 rounded-sm px-3 py-1.5 text-sm outline-none focus-visible:outline focus-visible:outline-2"
                  style={{ backgroundColor: theme.bgAlt, color: theme.text, border: `1px solid ${theme.border}`, outlineColor: BRAND.wire }}
                />
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="inline-flex h-9 w-9 items-center justify-center focus-visible:outline focus-visible:outline-2"
                style={{ color: theme.text, outlineColor: BRAND.wire }}
              >
                <Search size={18} />
              </button>
            )}
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center sm:hidden focus-visible:outline focus-visible:outline-2"
            style={{ color: theme.text, outlineColor: BRAND.wire }}
            aria-label="Search articles"
            onClick={() => navigate({ type: "search", query: "" })}
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            onClick={() => navigate({ type: "bookmarks" })}
            aria-label="Saved articles"
            className="inline-flex h-9 w-9 items-center justify-center focus-visible:outline focus-visible:outline-2"
            style={{ color: theme.text, outlineColor: BRAND.wire }}
          >
            <Bookmark size={18} />
          </button>
          <button
            type="button"
            onClick={toggleDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            className="inline-flex h-9 w-9 items-center justify-center focus-visible:outline focus-visible:outline-2"
            style={{ color: theme.text, outlineColor: BRAND.wire }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="flex flex-col gap-1 border-t px-4 py-3 lg:hidden" style={{ borderColor: theme.border, backgroundColor: theme.bg }} aria-label="Mobile">
          <form onSubmit={submitSearch} role="search" className="mb-2 flex items-center gap-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="flex-1 rounded-sm px-3 py-2 text-sm outline-none focus-visible:outline focus-visible:outline-2"
              style={{ backgroundColor: theme.bgAlt, color: theme.text, border: `1px solid ${theme.border}`, outlineColor: BRAND.wire }}
            />
          </form>
          <button
            type="button"
            onClick={() => {
              navigate({ type: "home" });
              setMobileMenuOpen(false);
            }}
            className="rounded-sm px-2 py-2.5 text-left text-sm font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2"
            style={{ color: theme.text, fontFamily: FONTS.mono, outlineColor: BRAND.wire }}
          >
            Home
          </button>
          {NAV_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                navigate({ type: "category", category: cat });
                setMobileMenuOpen(false);
              }}
              className="rounded-sm px-2 py-2.5 text-left text-sm font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2"
              style={{ color: isActive(cat) ? BRAND.wire : theme.text, fontFamily: FONTS.mono, outlineColor: BRAND.wire }}
            >
              {cat}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
