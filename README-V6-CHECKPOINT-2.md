# Echo Calendar V6 — Development checkpoint 2 (not production-ready)

## Changes in this checkpoint
- Preserves `src/Olivia.tsx`, `src/olivia.css`, and Olivia image assets byte-for-byte from the supplied V6 development checkpoint.
- Reorganizes the existing Manage screen into dedicated mobile-friendly categories (Events, Family, School, Pictures, Chores, Routines, Meals, Shopping, Settings), retaining the same forms, data operations, and database schema.
- Adds clearly labeled Calendar Connections and Display sections. Connections are placeholders pending secure server-side implementation; display preferences currently live in the Parent Calendar.
- Fixes the Parent Dashboard month grid to always cover six complete weeks; keeps the always-on clock current.

## Not yet implemented
- Server-side iCloud CalDAV credential handling, syncing, and ICS subscription ingestion.
- Full recurrence exceptions / individual occurrence editing.
- Persistent offline cache with privacy-safe storage and revocation.
- Full production build / device regression testing.

## Deployment policy
**Do not deploy this checkpoint to Netlify.** No production deploys were performed. Continue development and test locally; preserve the existing live application. Keep the two-deployment maximum.
