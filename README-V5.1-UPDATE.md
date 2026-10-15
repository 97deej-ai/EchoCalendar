# Echo Calendar V5.1 — Lunch artwork + chore photos

1. In Supabase SQL Editor run `supabase/olivia_chores_v51.sql` once. This preserves existing chores and completions.
2. Upload the CONTENTS of `EchoCalendar-main/` to your existing GitHub repository (replace matching files), then wait for Netlify deployment.
3. Reload Fully Kiosk on the Echo.
4. Adult Calendar > Manage > Olivia's Chores: edit or add a chore, upload a PNG/JPG/WEBP/GIF (max 5 MB), wait for preview, then Save. Remove picture to fall back to the emoji.
5. Olivia's World > My Chores: the uploaded picture appears on the card.
6. Kindergarten detail: the provided lunch artwork appears as the square button; tapping still reads the menu aloud.

The existing public Supabase `event-images` bucket is reused. Its current upload policy must allow paths inside `<authenticated-user-id>/chores/`. Existing event image uploads and other features are unchanged. Uploaded pictures are public to anyone with the URL, just like event images.
