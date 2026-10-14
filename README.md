# Echo Calendar — GitHub / Netlify / Supabase V1

A functional starter application with a family calendar (week/month), recurring events, member colors, child display, daily routines, meals, shopping list, weather (optional), and authenticated management. React + TypeScript + Vite; Supabase Auth/Postgres; Netlify hosting.

## Setup

1. Create a **new Supabase project** (do not reuse the Cooper database).
2. In Supabase SQL Editor, run `supabase/schema.sql` once.
3. Under Authentication > Providers > Email, disable public signups if available. Under Authentication > Users, create a family user manually (use a strong password). Confirm email if required.
4. In Netlify, create a site from a **new GitHub repository** containing this project's root files. Build command `npm run build`, publish directory `dist`.
5. In Netlify environment variables set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the Supabase project URL and publishable/anon key (NOT service_role). Trigger a deploy.
6. Open the Netlify URL on your iPhone and Echo browser and sign in. The Manage tab adds and edits events and other data. On the Echo, use the browser's full-screen/kiosk mode when supported by the installed Android image.

## Local development

Node 20+ recommended. `cp .env.example .env`, fill in your project values, `npm install`, `npm run dev`. `npm run build` verifies TypeScript and generates the deployable `dist` directory.

## Important limitations

- This is **not** a finished Apple Calendar integration. iCloud CalDAV needs a server-side sync service (e.g. Supabase Edge Function or future FastAPI server); never store Apple app-specific passwords in browser code.
- Recurring events support simple daily/weekly/monthly/yearly patterns, not exceptions or complex RRULE schedules.
- Weather uses Open-Meteo with optional latitude/longitude settings; online connectivity required.
- No push reminder notifications, rewards points, offline editing, auto kiosk startup, or photo import yet.
- All authenticated users in this dedicated Supabase project can read/write all family data. Create accounts **only for trusted household members**. For future multi-household support, add household_id and membership-based RLS before adding users.
- This Netlify/Supabase release is cloud-hosted, not offline-first. The future self-hosted migration requires a backend adapter and a database export, not simply copying the SQLite file.
- Do not put secrets in `VITE_` variables; they are bundled into the browser. Only the public Supabase key belongs there.

## Future home server migration

The data model is represented in `supabase/schema.sql` and frontend calls are centralized through `db` and `mutate`/`load`. For migration, export tables as CSV/JSON, implement a FastAPI adapter with equivalent resources, import to SQLite, and switch the client data adapter. Keep IDs as UUID strings. Netlify routing is isolated in `netlify.toml`.
