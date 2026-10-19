# Echo Calendar V6.0 — Development Checkpoint 8

## Changes in this checkpoint
- Parent-only event RLS now uses an explicit adult allowlist and defaults to denying access. Replaces the permissive authenticated policy from Checkpoint 6/7.
- The migration **does not change Olivia tables or UI files**.
- Parent event snapshot is saved in session storage for temporary offline reading; private snapshots clear on sign-out.
- The new access table can only be populated by a trusted SQL administrator/service role.

## Required database setup (not executed)
1. Back up your Supabase project.
2. Run `supabase/v6_parent_calendar_events.sql` using the Supabase SQL editor.
3. Find the adult account's UUID under Authentication > Users. Insert the UUID into `parent_calendar_adults` using the example SQL at the bottom of the migration.
4. Test an authorized adult can read/write parent events; test a different signed-in account cannot read/write them.
5. Verify existing Olivia events and chores still behave as before.

## Outstanding release blockers
- Automatic iCloud CalDAV integration and remote ICS subscriptions are **not implemented**.
- Full production build and real-device regression tests are **not complete**.
- Parent event editing of a single recurring instance and durable offline sync are incomplete.
- Calendar source separation needs integration tests against actual Supabase roles.

**Do not deploy this checkpoint to the live Netlify site.** No Netlify deployment was performed here.
