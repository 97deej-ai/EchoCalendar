# Echo Calendar V4 — event artwork and square cards

## Installation order
1. In your existing Supabase project, open SQL Editor and run `supabase/event_images_v4.sql` once. This adds `calendar_events.icon_url` and a public-read, authenticated-upload Storage bucket called `event-images`. Existing records are retained.
2. Extract this ZIP and replace the files in your GitHub EchoCalendar repository (preserving folders); commit to main.
3. Confirm Netlify deployment. Existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` remain unchanged.
4. Open **Manage → Events → Add event** (or edit an existing event). Choose Soccer/Swimming/Gymnastics or upload a PNG/JPG/WEBP/GIF (max 5 MB). Save.
5. Assign the event to Olivia or Everyone. Confirm artwork appears in My Day and My Week. Other family members' private events remain filtered out.
6. Confirm that Kindergarten and an activity with a time render as identically sized square cards, centered in My Day.

Notes: Uploaded images are publicly readable by anyone with the image URL; don't upload sensitive photos. The image is attached to the individual event record. Removing an image from an event clears the reference, but does not automatically delete the file from Supabase Storage.
