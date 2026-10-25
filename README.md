# Screenshot Match

Implement exactly the screenshot and nothing else

Flight Price Notifier: a Vite + React single-page app with Supabase auth, hosted on Vercel.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploying to Vercel

This is a static single-page app: `npm run build` (or `bun run build`) writes plain HTML, JS and CSS to `dist/`. Import the repo into Vercel and it is detected as a Vite project; `vercel.json` rewrites every path to `index.html`, so deep links like `/app` or `/sign-in` load the app and React Router takes over in the browser.

## Supabase

The app talks to its own Supabase project (`pwzczzcmeuqqbkgipriv`). The URL and publishable key are read at build time from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` — see `.env.example`. Locally they come from `.env`; on Vercel, add both under Project → Settings → Environment Variables.

The publishable key (`sb_publishable_…`) replaces the old anon key: it is safe to ship to the browser, and data access is controlled by Row Level Security.
