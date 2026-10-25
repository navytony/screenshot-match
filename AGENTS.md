<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Stack: plain Vite + React SPA with React Router (`src/routes.tsx`), built to static files in `dist/` and hosted on Vercel (`vercel.json` rewrites every path to `index.html`). No SSR or server functions.
- Auth: Supabase email/password at `/sign-in` and `/sign-up`; signed-in pages are children of `<RequireAuth />` in `src/routes.tsx` (client-only gate) — keeps session checks in one place.
- Scroll fade-ins use the `reveal` utility + `useReveal()` hook — one lightweight animation mechanism.
