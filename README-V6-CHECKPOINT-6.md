# V6 Checkpoint 6 — Parent-only events isolation

Adds `public.parent_calendar_events` and a dedicated Parent Dashboard event editor. The parent Add Event button and calendar date taps write ONLY to the new table; existing `calendar_events` entries are shown read-only in Parent Dashboard. The original Manager Events screen remains the only editor for Olivia-visible events. No changes to Olivia.tsx or olivia.css.

## Before testing
1. Back up Supabase.
2. Run `supabase/v6_parent_calendar_events.sql` in SQL Editor on a TEST database first.
3. Test create/edit/delete and recurring parent events.
4. Confirm no new rows appear in `calendar_events` and no parent events appear in Olivia's World.
5. Existing authenticated family accounts have access under the project's current RLS model; role-specific private event permissions are NOT implemented.

No Netlify deployment was made. Full build and browser/device tests remain required. Apple sync and automated subscriptions are still not implemented.
