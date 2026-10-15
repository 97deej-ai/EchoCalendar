# Echo Calendar V5 — Olivia chores, midnight rollover, speaking lunch

## Install
1. In your EXISTING Supabase project, run `supabase/olivia_chores_v5.sql` once in SQL Editor.
2. Upload the contents of this repository ZIP to your existing GitHub EchoCalendar repository, replacing existing files. Keep your existing Netlify environment variables.
3. Wait for Netlify to deploy. Reload Fully Kiosk Browser on the Echo to receive the new build.

## New features
- Adult calendar → Manage → Olivia's Chores: create, edit, schedule by weekday, reorder, hide, reset today's completion, or delete chores.
- Olivia's World → My Chores: child-friendly tappable emoji cards and daily completion counter. Completion history stored by date.
- Olivia's World: midnight rollover and foreground refresh for calendar date; chore/event refresh on date change.
- Kindergarten detail: lunch square alongside school specials, with written menu and tap-to-speak via Web Speech API.

## Notes
- Speech depends on the Android WebView / Fully Kiosk speech synthesis engine. If no voice plays, check Android text-to-speech engine/voice data; the written menu still works.
- Chore icons are emoji, editable from adult Manage. Custom chore image uploads are not part of V5.
- Adult controls are not shown in Olivia's My Chores. The existing parent-access screen for school/lunch editing remains unchanged.
- The existing Routines feature is separate and unchanged.
- Family members who share the authenticated calendar can access the adult Manage screen; this release does not introduce separate adult PIN authorization.
