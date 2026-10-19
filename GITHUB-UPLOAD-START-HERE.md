# Echo Calendar V6 — GitHub upload handoff

## Important: source package, not a certified production release
This package is ready to put into a **non-production GitHub branch** for build validation. It has NOT passed a full npm build in the current environment because npmjs.org DNS resolution failed. It is NOT yet approved to merge into the live Netlify-connected production branch.

## Before uploading anything
1. Keep the live V5.4.2 branch and Netlify deployment intact. Save a backup of the GitHub repo and Supabase data.
2. In Netlify, verify that branch deploys / deploy previews and automatic builds are disabled or excluded for the new `v6-release-test` branch. Merely pushing to GitHub can trigger Netlify builds on some configurations.
3. Create a **new branch named `v6-release-test`** from the current production branch. Replace the project source on that branch with the contents of this package; do not upload the outer ZIP as a single repository file.
4. In GitHub Actions, manually run **Validate Echo V6 (no deployment)**. The workflow installs dependencies and runs `npm run build`. Download the generated `package-lock.json` artifact and commit it to the branch. Rerun `npm ci && npm run build` in a normal Node 22 environment.
5. If the build fails, STOP. Fix the errors before using a Netlify deployment.

## Before the first production deploy
- Review and apply `supabase/v6_parent_calendar_events.sql` in a backed-up Supabase environment; insert actual approved adult auth UUIDs into `parent_calendar_adults` using SQL editor. Confirm child/unapproved accounts cannot access parent events.
- Ensure Netlify environment has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or the corresponding SUPABASE_URL / SUPABASE_ANON_KEY) for the server function. Do not commit secret service-role keys.
- Test the authenticated `/api/ics-feed` endpoint with a non-sensitive public test feed, including redirects, malformed feeds, unauthorized users, and refresh.
- Test parent-only event creation, recurrence, edit, delete, iPad mode, offline behavior, sign-out, mobile manager, and the Echo.
- Compare Olivia files to V5.4.2 before merge. Both matched byte-for-byte when this package was assembled.
- Only merge after all gates pass. Budget at most 2 Netlify production deploys.

## Known V6 limitations
- iCloud uses read-only public ICS links, not private CalDAV. Public calendar links can expose event details to anyone holding the URL; never publish a sensitive calendar.
- ICS subscriptions are stored per-device in browser storage, not shared across devices, and refresh only when the parent dashboard is open.
- Parent event offline cache is session-based, not a full offline application.
- Recurring parent events can skip one occurrence, but independently moving one occurrence is not finished.
- Existing management functions are reorganized but still require full manual regression testing.
- No end-to-end Supabase or device test was performed in this environment.

## Netlify deployment counter
No Netlify deployment was performed by this packaging step.
