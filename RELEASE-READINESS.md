# Echo Calendar V6.0 — production readiness report (October 19, 2026)

**Status: NOT CERTIFIED FOR PRODUCTION. Do not deploy to the live Echo Calendar yet.**

## Verified in this workspace
- Existing `src/Olivia.tsx` and `src/olivia.css` are byte-identical to Checkpoint 10.
- The Netlify public ICS feed endpoint now checks Supabase bearer authentication and the `echo_is_parent_adult()` authorization RPC before fetching external URLs. Requires Netlify environment variables `SUPABASE_URL` and `SUPABASE_ANON_KEY` (or the corresponding VITE_ values) and the V6 SQL migration.
- `node --check netlify/functions/ics-feed.mjs` passed.
- TypeScript `transpileModule` syntax checks passed for `main.tsx`, `Olivia.tsx`, `ParentDashboard.tsx`, `calendarUtils.ts`, and `icsImport.ts`.
- No live deployment or migration was performed.

## Release blockers
1. `npm install` timed out because the package registry was unreachable. `npm run build` and full TypeScript type-checking have NOT been verified. A package lockfile is absent.
2. Private Apple/iCloud CalDAV authentication and automatic synchronization are NOT implemented.
3. Public ICS subscriptions are device-local and refresh while the dashboard is open, not unattended background sync or cross-device sync.
4. Parent-only calendar migration and adult RLS policies are not tested against the live Supabase project; adult IDs must be provisioned by an administrator.
5. Offline cache, recurring-event edits/exceptions, iPad display behavior, and all existing Olivia screens still need end-to-end device testing.
6. Feed proxy must receive additional network/security review, including DNS rebinding and rate limiting, before being exposed to production traffic.
7. Browser-local imported calendar data and display preferences are not scoped per adult account; test shared-device privacy before release.

## Required release procedure (does not require Netlify deploy until final step)
1. Clone/unzip in a development computer with registry access; run `npm install --package-lock-only`, then `npm ci`, then `npm run build`.
2. Create a separate Supabase test project or database snapshot; apply `supabase/v6_parent_calendar_events.sql`; add approved adult UUIDs with privileged SQL; test authorized/unauthorized access.
3. Finish secure private iCloud CalDAV integration, with credentials stored server-side and encrypted; do not paste Apple app-specific passwords into this build.
4. Validate the public ICS feed function under Netlify's runtime with adult/nonadult sessions and blocked network targets.
5. Perform regression tests on the original Echo Show 5 and new iPad/phone experiences.
6. Confirm automatic Netlify deployments are disabled for development branches. Only after acceptance testing, deploy once as release candidate and reserve the second deployment for fixes.

**The source ZIP is a working engineering handoff, not a deployment-ready production build.**
