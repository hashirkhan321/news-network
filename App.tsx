import { useCallback, useEffect, useRef, useState } from "react";
import type { Article, View } from "./types";
import { DARK, LIGHT } from "./theme";
import { fetchArticles, MOCK_ARTICLES } from "./data";
import { AppContext, type AppContextValue } from "./context";
import { Footer, Header, Toast } from "./components";
import { ArticleView, BookmarksView, CategoryView, HomeView, SearchView } from "./views";

export default function App() {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState<View>({ type: "home" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<number>>(() => new Set());
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  useEffect(() => {
    if (view.type === "home") document.title = "News Network — The World. In Focus.";
    else if (view.type === "category") document.title = `${view.category} News · News Network`;
    else if (view.type === "search") document.title = "Search · News Network";
    else if (view.type === "bookmarks") document.title = "Saved Articles · News Network";
  }, [view]);

  const navigate = useCallback((next: View) => {
    setView(next);
    setMobileMenuOpen(false);
    window.scrollTo?.({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  }, []);

  const toggleBookmark = useCallback(
    (id: number) => {
      setBookmarks((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          showToast("Removed from saved articles");
        } else {
          next.add(id);
          showToast("Saved article");
        }
        return next;
      });
    },
    [showToast]
  );

  const toggleDark = useCallback(() => setIsDark((v) => !v), []);

  const theme = isDark ? DARK : LIGHT;

  const ctx: AppContextValue = {
    theme,
    isDark,
    toggleDark,
    view,
    navigate,
    mobileMenuOpen,
    setMobileMenuOpen,
    bookmarks,
    toggleBookmark,
    showToast,
  };

  return (
    <AppContext.Provider value={ctx}>
      <div className="min-h-screen transition-colors" style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-black focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to main content
        </a>

        <div
          className="flex items-center justify-center gap-2 px-4 py-1.5 text-center"
          style={{
            backgroundColor: theme.bgAlt,
            color: theme.textMuted,
            fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
            borderBottom: `1px solid ${theme.border}`,
            fontSize: "11px",
          }}
        >
          Prototype build — headlines below are placeholder content for demonstration, not real reporting.
        </div>

        <Header />

        <main id="main-content">
          {view.type === "home" && <HomeView articles={articles} />}
          {view.type === "category" && <CategoryView articles={articles} category={view.category} />}
          {view.type === "search" && <SearchView articles={articles} query={view.query} />}
          {view.type === "bookmarks" && <BookmarksView articles={articles} />}
          {view.type === "article" && <ArticleView articles={articles} id={view.id} />}
        </main>

        <Footer />
        <Toast message={toast} />
      </div>
    </AppContext.Provider>
  );
}
