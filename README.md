# Screenshot Match

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/843363c0-c547-4387-bc52-4ed1735c7094).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

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

The Supabase URL and publishable key are read from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` at build time (from `.env`, or from the Vercel project's environment variables).
