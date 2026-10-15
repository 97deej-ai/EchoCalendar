# Echo Calendar — Olivia V3 update

## Included
- My Day: unified horizontal row, swipe for more activities; no redundant activity headings or duplicate image labels.
- My Week: only Kindergarten/Daycare and calendar events; empty days stay empty. No specials or lunch icons in week overview.
- Specials detail: exact four supplied artwork screenshots (Music, PE, Art, Library), with no duplicate titles.
- Weather: forecast-based backgrounds for selected day (sunny, cloudy, rainy, snowy), gentle evening theme for today; falls back to original pleasant gradient when unavailable.
- Calendar events: Olivia and Everyone, with selected Soccer, Swimming and Gymnastics artwork.
- Existing school, lunch and override records are untouched.

## Install
Replace existing repository contents with this ZIP's files, preserving folders. Commit to main. Netlify will build. No SQL migration required.

## Weather setup
In the main calendar > Manage > Settings, fill in Weather latitude and Weather longitude (your general area is sufficient). Weather forecast comes from Open-Meteo for up to 16 days. Dates beyond the forecast range use the default background.

## Important
The parent-access gesture remains as previously implemented; it is not a secure PIN gate. The weather background uses CSS illustrations, not new generated scenery image files.
