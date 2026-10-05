# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Azura: a React + TypeScript + Vite PWA for browsing/watching anime, movies and TV, plus a social layer (posts, comments, collections, followers, notifications). Stack: TanStack Router (file-based), TanStack Query, Zustand, Tailwind + shadcn/ui (Radix), react-hook-form + zod, Vidstack/hls.js for video.

## Commands

Package manager is Bun (`bun.lockb`).

- `bun install`
- `bun run dev` — Vite dev server
- `bun run build` — `tsc -b && vite build` (this is the type check; `noUnusedLocals`/`noUnusedParameters` are on, so unused vars fail the build)
- `bun run lint` — ESLint with `--max-warnings 0`
- `bun run preview`

There is no test suite.

Env vars come from `.env` (see `.env.example`): backend URLs, TMDB key, Anilist/Anizip mirrors, and third-party embed player URLs. `VITE_IS_PROD` is a numeric flag (`"1"`/`"0"`) read via `Number(...)`; it selects `VITE_BACKEND_BASE_URL_1` vs `VITE_BACKEND_BASE_URL` and hides React Query devtools.

## Architecture

### Routing (`src/routes/`)
- File-based TanStack Router; the Vite plugin generates `src/routes/routeTree.gen.ts` — never edit it by hand. `@/` aliases `src/`.
- `__root.tsx` mounts app-wide singletons: `MediaPortal`, `GlobalDialog`, `GlobalDialogSecondary`, `GlobalSheet`, `GlobalDrawer`, `Toaster`, and the social FAB on `/social/*`.
- `_auth/` (login, signup, forgot-password, detached-mode) redirects away if a user exists. `_protected/route.tsx` gates everything else on `useCurrentUser()`, wraps in `PulseCheckAuth`, and picks the top/bottom nav bar from `sessionStorage.lastMediaRouteVisited` (`ANIME` | `MOVIE` | `TV`, default `MOVIE`). `localStorage.isLastRouteSocial` sends returning users back to `/social`.
- Media sections (`anime/`, `movie/`, `tv/`) each have index, `catalog/` (zod-validated search params via `validateSearch` + `useHandleSearchParamsValidationFailure`), `$id/` info page and `$id/watch/`. Social uses `$userHandle/` vs `$userHandle_/` (underscore suffix = non-nested route escaping the parent layout).
- `App.tsx` extends the router's `HistoryState` (e.g. `postInfoState`) for typed navigation state.

### Data layer
- `src/services/{auth,media,social}/` hold React Query hooks (`queries.ts` / `mutations.ts`). Media is split per type (`media/anime`, `media/movie`, `media/tv`).
- Axios instances in `src/utils/variables/axiosInstances/`:
  - `backendAxiosInstance.ts` (`api`): cookie auth (`withCredentials`). On 401 it aborts all in-flight requests, clears the current user and the whole query cache, closes popups, and `history.replaceState`s to `/login`. Network errors go to `/no-internet`.
  - `tmdbAxiosInstance.ts` (`tmdbApi`) for TMDB (movies/TV).
  - Anime data comes from Anilist/Anizip mirrors chosen at load via `drawRandomURL`, plus the backend.
- `src/utils/variables/queryClient.ts`: the default is **never refetch** (`staleTime`/`gcTime: Infinity`, no retry, no refetch on mount/focus). Opt into freshness per query by spreading `frequentlyChanging` or `rarelyChanging`.
- Social mutations update the cache by hand rather than invalidating: see `src/services/social/functions/cacheMutations.tsx` (query-key helpers and `setQueryData` over infinite/paginated data). When adding social features, update the cache there.
- Video embed URLs per provider are built in `src/utils/functions/media/sharedFunctions.ts`.

### UI state
- Zustand stores in `src/utils/stores/`. `useGlobalStore` drives the global dialog/sheet/drawer: open one with `toggleOpenDialog(<Content />)` and close it with `toggleOpenDialog(null)` (content is cleared after a delay so the closing animation plays). Use this instead of mounting local modals.
- Components: `src/components/ui/` = shadcn primitives (`components.json`, `cn` in `@/lib/utils`); `components/core/` = feature components grouped by domain (`media/{anime,movie,tv,shared}`, `social`, `auth`, `settings`, `navBar`, `loadingSkeletons`); `components/global/` = the root-mounted singletons.
- Types live in `src/utils/types/{auth,media,social}`, zod form schemas in `src/utils/variables/formSchemas.ts`, reusable hooks in `src/utils/hooks/`.

### Gotchas
- `React.StrictMode` is intentionally disabled (`main.tsx`): `useDebounceOnClick` relies on skipping the first effect run, which StrictMode's double-invoke breaks.
- Theme/brand colors and custom breakpoints (e.g. `mobile-l`, `1440`, `1600`) are defined in `tailwind.config.js`; check there before adding arbitrary values.
