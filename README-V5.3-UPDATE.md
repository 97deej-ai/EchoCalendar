# Echo Calendar V5.3 — Olivia's World redesign

Built from the V5.2.1 project ZIP. Replace repository files with this project and deploy through the existing Netlify/GitHub workflow. No new database schema, paid services, or hosting changes.

## Changes
- Shared top pill navigation and bottom date/current-weather/4-day forecast footer for Olivia's Day, Week, Chores, and Kindergarten detail.
- Current weather temperature/code and daily forecast from the existing Open-Meteo endpoint.
- Adaptive activity cards: one large, two/three across, four in a 2×2 grid, five compact; overflow uses a More activities / First activities toggle.
- Week view retains Sunday–Saturday navigation, school overrides, events, and tap-to-open-day.
- Chores use large pictures, completion borders, and compact progress bar.
- Overnight chore reset: stable 15-second day rollover listener mounted once, local-day-based completion checks and writes, wake/focus/online checks. Prior-day database history is preserved.
- Kindergarten detail uses the shared shell and larger specials and lunch cards; existing lunch audio code remains unchanged.
- Parent Manager, image uploads, Supabase tables, and synchronization remain unchanged.

## Test on the physical 800 × 480 Echo
1. Confirm top nav/footer fit on all four screens, including busy week.
2. Verify 1, 2, 3, 4, 5 and 6+ activities (More activities toggle).
3. Tap kindergarten; confirm specials, lunch menu, back, and shared footer.
4. Complete chores, then test crossing local midnight with kiosk running and after waking/reopening. Chores should read 0 completed next day while prior-day rows remain stored.
5. Confirm phone Manager edits, uploaded pictures, one-day school overrides and automatic refresh still work.

## Known limitation
The lunch speech API remains unsupported by the current kiosk browser. This version does not install or configure a TTS engine.

## Build validation
JSX/TypeScript syntax was checked with TypeScript transpilation. A full `npm run build` requires dependency installation and was not available in the packaging environment. Netlify's build should be checked before treating the release as deployed.
