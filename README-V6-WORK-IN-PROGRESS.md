# Echo Calendar V6.0 — OFFLINE DEVELOPMENT BUILD (NOT FOR DEPLOYMENT)

This package is a **development checkpoint**, not the promised completed V6.0 release. No Netlify deployments have been triggered.

## Implemented in this checkpoint
- A separate, professional Parent Dashboard component and isolated stylesheet, leaving `src/Olivia.tsx` and `src/olivia.css` unchanged.
- Week, 2-week and month grids, Today, navigation, family colors, event search, event detail, and local event creation/edit entry points.
- Parent display mode with idle transition, event privacy, device-local uploaded wallpaper, and return to calendar.
- Device-local view preferences and online/offline indication.

## Not yet implemented or verified
- Private iCloud CalDAV connection, server-side credential storage, and automated sync.
- ICS/webcal subscriptions and import, source calendars, sync diagnostics, and server-side deduplication.
- Redesigned management workflows and calendar-level permissions.
- Full recurring event exceptions and imported recurrence rules.
- Persisted offline event cache (currently the app shows events already loaded in the current session only).
- Full TypeScript/Vite production build and real iPad/Echo regression testing. Dependencies could not be downloaded in this environment.

## Security and release precautions
- DO NOT enter Apple credentials into this build; no Apple connection UI is implemented.
- DO NOT deploy this checkpoint to production. It is intentionally incomplete.
- Existing Supabase schema and Olivia screens were not modified.
- Use a separate development branch or local folder. Do not push to Netlify-connected branches.
- To validate locally: `npm install && npm run build && npm run dev` in a network-enabled development environment.
- Existing event editing remains routed through the original modal; new parent UI uses existing event data.

## Deployment budget
0/2 planned Netlify deployments used. Deploy only after integrations, management redesign, local build and regression testing are complete.
