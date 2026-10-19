# Echo Calendar V6 development checkpoint 3 — NOT FOR DEPLOYMENT

Changes made without touching `src/Olivia.tsx` or `src/olivia.css`:

- Extracted date/recurrence logic into `src/calendarUtils.ts` to isolate parent calendar functionality.
- Fixed parent calendar weekday heading mismatch (calendar grid uses Sunday-first).
- Month view now calculates the necessary number of complete calendar weeks instead of always showing 42 days.
- Added a session-scoped event snapshot for temporary connectivity loss. This is a limited fallback, **not** full offline support; it is intentionally not persistent across browser restarts.
- Added support in the recurrence utility for skipping specified occurrence dates. Editing/recording recurrence exceptions is **not yet implemented**.

Remaining blockers: secure iCloud and ICS ingestion, durable but revocable offline storage, exception-edit UI and backend, actual dependency installation and full production build, and device testing.

**Deployment count: 0. Do not upload to live Netlify.**
