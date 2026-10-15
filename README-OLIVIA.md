# Olivia My Day V1 add-on

This package retains the original Echo Calendar app and adds a dedicated Olivia mode.

1. Back up your current GitHub repository. Compare this package against the deployed code before replacing files.
2. Run `supabase/olivia_v1.sql` in the SAME Supabase project SQL Editor once.
3. Upload the changed files (src/main.tsx, src/Olivia.tsx, src/specials.ts, src/olivia.css, src/vite-env.d.ts, and public/images/olivia/*) into the repo.
4. Netlify builds automatically. Keep existing environment variables unchanged.
5. Sign in and tap My Day. Tap the sun in the upper-right for parent management. This first build uses existing Supabase authentication; the sun is NOT a secure PIN gate. Do not deploy as an unlocked public kiosk until a proper parent gate and kiosk session model are implemented.

## Data limits
- Specials are transcribed from the two 2026–2027 K Unified Arts photos. Verify the dates before relying on them.
- Wednesday attendance is inferred from Wednesday entries on that schedule; district attendance/closures still require review.
- Lunch is intentionally NOT auto-filled because the four-week menu color-to-date mapping has not been fully verified. Enter lunches in parent management for now.
- Holidays and school closures require parent exceptions; Tuesdays and Fridays otherwise default to kindergarten in the school-year dates. The automatic kindergarten rule is bounded to August 21, 2026 through May 26, 2027, but closures and holiday exceptions still need to be entered.
- This package has not been validated against the live GitHub head because repository access returned 404.
