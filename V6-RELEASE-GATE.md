# Echo Calendar V6 — Release gate

## Confirmed product decision
- Public read-only HTTPS / webcal ICS subscriptions replace private iCloud CalDAV for V6.
- Olivia's World is frozen: src/Olivia.tsx and src/olivia.css must match V5.4.2 exactly.
- No more than two Netlify deployments. Automatic deploys from development branches must be disabled.

## Completed in this package
- Parent calendar views, event editor, parent-only data model, ICS import and subscription UI, iPad display mode, existing management navigation.
- Parent-only SQL migration with adult allowlist and excluded_dates support.
- Explicit Netlify function route for /api/ics-feed.
- Idle display now waits during parent event editing.
- Offline parent event snapshot loads before an online refresh.
- Distinct feed source names to prevent replacing an earlier feed on removal/addition.
- Verified Olivia component and CSS are byte-for-byte identical to V5.4.2.
- `tsc` utility checks, server function syntax check, and five calendar utility assertions passed.

## NOT production certified — release blockers
1. npm install fails with EAI_AGAIN reaching registry.npmjs.org. A full `npm run build` has NOT passed. No dependency lockfile is included.
2. Supabase V6 migration and adult account allowlist have NOT been applied or tested in the live database. Back up database first and test adult/child access denial.
3. Live ICS feed retrieval has NOT been end-to-end tested. Public Apple calendar URLs are capability URLs: treat them as sensitive. Subscriptions currently live in localStorage on each device; they do NOT sync across devices or refresh when the dashboard is closed.
4. Offline behavior is session-scoped, not a complete service-worker offline app. Verify expected behavior on the actual iPad.
5. Device-level regression checks of Echo Show 5 / Fully Kiosk, iPad Safari, and phone are still required.
6. Parent management is reorganized, but the underlying old forms remain. Check every existing function before retiring old management screens.
7. Individual occurrence *skip* is implemented for parent repeating events; moving/editing an individual parent occurrence separately is NOT fully implemented.

## Required release procedure
1. In an environment with npm access: `npm install`, commit generated package-lock.json, then `npm ci && npm run build`.
2. Back up Supabase. Review and apply `supabase/v6_parent_calendar_events.sql` and add the approved adult auth UUIDs using Supabase SQL editor. Verify unauthorized accounts cannot read or mutate parent events.
3. Test the ICS Netlify function with a real public test calendar. Verify redirects, errors, refresh, and duplicate prevention.
4. Test calendar date navigation, recurrence exceptions, import, offline display, privacy, sign-out, wallpaper and management.
5. Verify no changes to Olivia's World on the Echo. Preserve a rollback copy of the working live build.
6. Only then use Netlify deployment #1; collect device feedback for one consolidated correction release #2.

**Do not upload this ZIP directly to the live Netlify production branch until all release blockers pass.**
