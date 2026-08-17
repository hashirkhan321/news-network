import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import type { Article, Category } from "./types";
import { BRAND, CATEGORY_META, FONTS, SECTION_CATEGORIES } from "./theme";
import { formatDateTime, readingTime } from "./utils";
import { useApp } from "./context";
import {
  BookmarkButton,
  BreakingBadge,
  BreakingTicker,
  CategoryEyebrow,
  CategorySection,
  ArticleImage,
  EmptyState,
  HeroCard,
  ListRow,
  Newsletter,
  RelatedStories,
  ShareRow,
  TrendingList,
} from "./components";

/* ------------------------------ Home ------------------------------ */

export function HomeView({ articles }: { articles: Article[] }) {
  const { theme } = useApp();
  const hero = articles[0];
  const secondary = articles.slice(1, 3);
  const latest = articles.slice(3, 9);

  if (!hero) return null;

  return (
    <>
      <BreakingTicker articles={articles} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section aria-label="Featured stories" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <HeroCard article={hero} size="large" />
          </div>
          <div className="flex flex-col gap-5">
            {secondary.map((a) => (
              <HeroCard key={a.id} article={a} size="compact" />
            ))}
          </div>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <section aria-labelledby="latest-heading" className="lg:col-span-2">
            <h2 id="latest-heading" className="mb-2 text-xl font-bold" style={{ color: theme.text, fontFamily: FONTS.display }}>
              Latest News
            </h2>
            <div>
              {latest.map((a) => (
                <ListRow key={a.id} article={a} />
              ))}
            </div>
          </section>
          <div>
            <TrendingList articles={articles} />
          </div>
        </div>

        {SECTION_CATEGORIES.map((cat) => (
          <CategorySection
            key={cat}
            title={cat}
            articles={articles.filter((a) => a.category === cat || a.tags?.includes(cat))}
          />
        ))}

        <Newsletter />
      </div>
    </>
  );
}

/* ------------------------------ Category ------------------------------ */

export function CategoryView({ articles, category }: { articles: Article[]; category: Category }) {
  const { theme } = useApp();
  const filtered = articles.filter((a) => a.category === category || a.tags?.includes(category));
  const meta = CATEGORY_META[category] || CATEGORY_META.World;
  const Icon = meta.icon;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md text-white" style={{ backgroundColor: meta.color }}>
          <Icon size={18} />
        </span>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme.text, fontFamily: FONTS.display }}>
            {category}
          </h1>
          <p className="text-sm" style={{ color: theme.textMuted }}>
            {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          </p>
        </div>
      </div>
      {filtered.length === 0 ? (
        <EmptyState message={`No ${category} stories yet. Check back soon.`} />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <HeroCard key={a.id} article={a} size="compact" />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Search ------------------------------ */

export function SearchView({ articles, query }: { articles: Article[]; query: string }) {
  const { theme } = useApp();
  const [term, setTerm] = useState(query || "");
  const results = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return articles.filter(
      (a) =>
        a.headline.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [term, articles]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-2xl font-bold" style={{ color: theme.text, fontFamily: FONTS.display }}>
        Search
      </h1>
      <div className="relative mb-6">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.textMuted }} />
        <input
          autoFocus
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search headlines, summaries, categories…"
          aria-label="Search articles"
          className="w-full rounded-sm py-2.5 pl-9 pr-3 text-sm outline-none focus-visible:outline focus-visible:outline-2"
          style={{ backgroundColor: theme.bgAlt, color: theme.text, border: `1px solid ${theme.border}`, outlineColor: BRAND.wire }}
        />
      </div>
      {term.trim() === "" ? (
        <p className="text-sm" style={{ color: theme.textMuted }}>
          Start typing to search across every section.
        </p>
      ) : results.length === 0 ? (
        <EmptyState message={`No results for "${term}"`} />
      ) : (
        <div>
          <p className="mb-2 text-xs" style={{ color: theme.textMuted, fontFamily: FONTS.mono }}>
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
          {results.map((a) => (
            <ListRow key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Bookmarks ------------------------------ */

export function BookmarksView({ articles }: { articles: Article[] }) {
  const { bookmarks, theme } = useApp();
  const saved = articles.filter((a) => bookmarks.has(a.id));
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 text-2xl font-bold" style={{ color: theme.text, fontFamily: FONTS.display }}>
        Saved Articles
      </h1>
      <p className="mb-6 text-sm" style={{ color: theme.textMuted }}>
        Stored for this session only.
      </p>
      {saved.length === 0 ? (
        <EmptyState message="Nothing saved yet. Tap the bookmark icon on any story to add it here." />
      ) : (
        <div>
          {saved.map((a) => (
            <ListRow key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Article ------------------------------ */

export function ArticleView({ articles, id }: { articles: Article[]; id: number }) {
  const { theme, navigate } = useApp();
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    if (article) document.title = `${article.headline} · News Network`;
    window.scrollTo?.({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [article]);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p style={{ color: theme.textMuted }}>Article not found.</p>
        <button type="button" onClick={() => navigate({ type: "home" })} className="mt-4 text-sm font-semibold underline" style={{ color: BRAND.wire }}>
          Return home
        </button>
      </div>
    );
  }

  const rt = readingTime(article.body);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: [{ "@type": "Person", name: article.author }],
    publisher: { "@type": "Organization", name: "News Network" },
    articleSection: article.category,
    mainEntityOfPage: `https://example.com/${article.category.toLowerCase()}/${article.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <button
        type="button"
        onClick={() => navigate({ type: "category", category: article.category })}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide hover:underline focus-visible:outline focus-visible:outline-2"
        style={{ color: theme.textMuted, fontFamily: FONTS.mono, outlineColor: BRAND.wire }}
      >
        <ArrowLeft size={13} /> Back to {article.category}
      </button>

      <div className="mb-3 flex items-center gap-2">
        <CategoryEyebrow category={article.category} size="base" />
        {article.breaking && <BreakingBadge />}
      </div>

      <h1 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ color: theme.text, fontFamily: FONTS.display }}>
        {article.headline}
      </h1>
      <p className="mt-3 text-lg leading-relaxed" style={{ color: theme.textMuted, fontFamily: FONTS.display }}>
        {article.subheadline}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y py-3" style={{ borderColor: theme.border }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: theme.text }}>
            {article.author}
            <span className="font-normal" style={{ color: theme.textMuted }}>
              {" "}
              — {article.authorTitle}
            </span>
          </p>
          <p className="mt-0.5 text-xs" style={{ color: theme.textMuted, fontFamily: FONTS.mono }}>
            Published {formatDateTime(article.publishedAt)}
            {article.updatedAt !== article.publishedAt && <> · Updated {formatDateTime(article.updatedAt)}</>}
            {" · "}
            {rt} min read
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BookmarkButton id={article.id} />
          <ShareRow headline={article.headline} />
        </div>
      </div>

      <div className="my-6">
        <ArticleImage article={article} priority />
      </div>

      <div className="flex flex-col gap-4">
        {article.body.map((p, i) => (
          <p key={i} className="text-base leading-relaxed" style={{ color: theme.text }}>
            {p}
          </p>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-6" style={{ borderColor: theme.border }}>
        <ShareRow headline={article.headline} />
        <BookmarkButton id={article.id} />
      </div>

      <RelatedStories current={article} articles={articles} />
    </article>
  );
}
