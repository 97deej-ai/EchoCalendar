# V6.0 Stage 1 — active development

Implemented in this iteration: parent-only recurring event exclusions stored in `excluded_dates` (date array), displayed by the Parent Dashboard, and a Skip this occurrence action in event details. The SQL migration is idempotent for existing V6 development databases. Olivia files unchanged.

Not complete: secure iCloud CalDAV, full ICS feed synchronization testing, recurring event move/override editing, management UX acceptance tests, offline security validation, and full production build.

No Supabase migration or Netlify deployment has been executed. Do not deploy this development package to production.

`npm run build` cannot complete because React/Supabase dependencies are not installed in this runtime.
