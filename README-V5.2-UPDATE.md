# Echo Calendar V5.2 — deployment notes

Based on V5.1. Replace your GitHub project files with this ZIP's `EchoCalendar-main` contents (do not upload the ZIP as a single file into the repo). Netlify should deploy automatically from GitHub.

## New features
- Olivia's My Chores: larger illustrations, no circular checkboxes, tap the whole card to toggle; thick green border indicates completion.
- My Day: labels below kindergarten, daycare and event pictures, including events with custom illustrations.
- Manage → Olivia's Pictures: upload replacement pictures for ten built-in categories; restore original pictures any time. Uses existing public `event-images` storage bucket and existing `app_settings` table; no new SQL required for pictures.
- Manage → Olivia's School Schedule: set a one-day daycare/kindergarten/home/none exception, edit, or restore regular schedule. Uses existing `olivia_school_days` table (from `supabase/olivia_v1.sql`). A daycare override hides kindergarten-specific specials and lunch in My Day.
- Live synchronization: listens for Supabase database changes while connected, and polls every two minutes as a fallback. Also refreshes on focus and reconnect. This updates calendar content without reloading the kiosk. To use Supabase Realtime push, ensure the relevant tables are in the `supabase_realtime` publication. The two-minute fallback works even without Realtime publication.

## Important: October 16, 2026 school cancellation
In Manage → Olivia's School Schedule, set date **2026-10-16**, activity **Daycare**, reason **School canceled**, then save. The exception is NOT pre-populated in the ZIP; it must be saved to the live Supabase database once. Alternatively, execute the optional `supabase/v52_oct16_override.sql` in Supabase SQL Editor. Do not do both unless you want to overwrite the note.

## Testing
1. From your phone, upload a new Art picture in Manage → Olivia's Pictures; verify the image updates on the Echo (allow up to two minutes if Realtime is not enabled).
2. Add the October 16 override, then view that date in My Week and My Day. It should show Daycare, not Kindergarten.
3. Complete a chore and confirm the green border appears. Tap it again to undo.
4. Check that titles are below activity illustrations and no longer need to be baked into the image.

## Known limitation
Android/Fully Kiosk text-to-speech is not repaired in this release. Lunch speech still requires a working Android TTS engine. This update does not add a hosted audio-generation service.

## Build verification
TypeScript TSX syntax was parsed successfully. A complete `npm run build` could not be run in the packaging environment because dependency installation did not complete; Netlify build will provide the full dependency/type check. Keep your prior V5.1 ZIP as rollback.
