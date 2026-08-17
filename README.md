# News Network

**The World. In Focus.**

A responsive, original-design prototype news website — breaking news, world
affairs, geopolitics, business, technology, sports and Pakistan news — built
with React, TypeScript, Vite and Tailwind CSS.

This project is the deployable version of the News Network prototype. The
design, layout, and functionality are unchanged from the original artifact:
breaking ticker, hero + trending + latest feed, category sections, article
pages with related stories and share buttons, search, bookmarks, and a
dark/light mode toggle.

> **Note:** All headlines and article content in this project are clearly
> labeled placeholder data for demonstration purposes — see `src/data.ts`.
> No real news events are represented.

---

## 1. Project structure

```
news-network/
├── index.html              # HTML entry point + SEO/OG/Twitter meta tags
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── .env.example             # documents optional future env vars (no secrets)
├── .gitignore
├── public/
│   ├── favicon.svg          # original brand mark
│   └── og-image.svg         # original social share image
└── src/
    ├── main.tsx              # React entry point
    ├── App.tsx                # root component, app state, layout shell
    ├── index.css              # Tailwind layers + custom animations
    ├── types.ts                # Article / Category / View / Theme types
    ├── theme.ts                 # design tokens: colors, fonts, category map
    ├── utils.ts                  # date, reading-time, placeholder-image helpers
    ├── data.ts                    # mock article data + fetchArticles()
    ├── context.tsx                 # shared app context (theme, nav, bookmarks)
    ├── components.tsx               # shared UI building blocks + Header/Footer
    └── views.tsx                     # Home / Category / Search / Bookmarks / Article
```

## 2. Connecting real news data later

`src/data.ts` exports a single function, `fetchArticles()`, that currently
resolves a local mock array. When you have a real news API key or an RSS
feed, replace the body of that function with a real `fetch()` call that
returns data in the same `Article` shape (defined in `src/types.ts`) — no
other file needs to change. Store any API key as an environment variable
prefixed with `VITE_` (see `.env.example`) and set the real value in
Vercel's dashboard, never in the code itself.

## 3. Run it locally (optional, but recommended before deploying)

You'll need [Node.js](https://nodejs.org) version 18 or later installed.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) in your browser.

To confirm the production build works before deploying:

```bash
npm run build
npm run preview
```

`npm run build` outputs static files to a `dist/` folder — that folder is
what Vercel will build and serve automatically for you, so you don't need
to build it yourself for deployment.

---

## 4. Deploy for free — step-by-step (GitHub + Vercel)

You do not need to know how to code to follow these steps.

### Step A — Create a GitHub account (skip if you have one)

1. Go to **https://github.com** and click **Sign up**.
2. Follow the prompts to create a free account and verify your email.

### Step B — Create a new, empty GitHub repository

1. Once logged in, click the **+** icon (top-right) → **New repository**.
2. Repository name: `news-network` (or any name you like).
3. Set visibility to **Public** or **Private** — either works with Vercel's
   free plan.
4. **Do not** check "Add a README" or any other initialize option — leave
   it completely empty.
5. Click **Create repository**. Keep this page open; GitHub will show you
   a page with setup commands you won't need, because we'll upload via the
   browser in the next step.

### Step C — Upload the project files to GitHub (no command line needed)

1. On your new repository's page, click **uploading an existing file**
   (a blue link on the empty-repo page).
2. Unzip the project folder you downloaded from this conversation on your
   computer first, if it isn't already.
3. Drag the **entire contents** of the unzipped `news-network` folder
   (not the folder itself — its contents: `src`, `public`, `package.json`,
   `index.html`, etc.) into the GitHub upload box.
4. Scroll down, add a commit message like `Initial commit`, and click
   **Commit changes**.

   *(If you're comfortable with git and the command line instead, you can
   run `git init`, `git add .`, `git commit -m "Initial commit"`, then
   follow GitHub's "push an existing repository" instructions.)*

### Step D — Create a free Vercel account and connect GitHub

1. Go to **https://vercel.com** and click **Sign Up**.
2. Choose **Continue with GitHub** and authorize Vercel to access your
   GitHub account (you can restrict it to only the `news-network` repo if
   asked).

### Step E — Import and deploy the project

1. On your Vercel dashboard, click **Add New...** → **Project**.
2. Find and select your `news-network` repository, then click **Import**.
3. Vercel auto-detects this as a **Vite** project — the build settings it
   fills in automatically are correct:
   - **Build Command:** `npm run build` (or `vite build`)
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. You don't need to add any environment variables for this prototype —
   leave that section empty.
5. Click **Deploy**.
6. Wait 1–2 minutes while Vercel installs dependencies and builds the
   site. When it finishes, you'll see a **Congratulations** screen with a
   screenshot of your live site.

### Step F — Get your public HTTPS URL

1. On the congratulations screen (or from your project's dashboard),
   click **Continue to Dashboard**, then look for the URL under
   **Domains** — it will look like `https://news-network-yourname.vercel.app`.
2. Click it (or the **Visit** button) to open your live site — it's
   already served over HTTPS automatically.
3. Every time you push new changes to the GitHub repository, Vercel will
   automatically rebuild and redeploy this same URL.

---

## 5. What to click next, in order

1. Download and unzip the project.
2. **github.com** → create account (if needed) → **New repository** named
   `news-network` → **Create repository**.
3. On the empty repo page → **uploading an existing file** → drag in the
   unzipped folder's contents → **Commit changes**.
4. **vercel.com** → **Sign Up** → **Continue with GitHub**.
5. Vercel dashboard → **Add New...** → **Project** → select `news-network`
   → **Import** → **Deploy**.
6. Open the `https://….vercel.app` link Vercel gives you — that's your
   live, public website.

---

## License / attribution

Original visual identity ("News Network", wordmark, favicon, share image,
color palette and typography pairing) created for this project. Placeholder
photography is procedurally generated SVG art, not sourced from any third
party.
