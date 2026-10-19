# Echo Calendar V6 — Development checkpoint 5 (not deployable)

## Added in this checkpoint
- Parent-only ICS parser supports basic daily/weekly/monthly/yearly RRULE, INTERVAL, COUNT, UNTIL, BYDAY, BYMONTH and BYMONTHDAY, plus EXDATE exclusions. Expanded to a bounded two-year window.
- Calendar file structure validation and up to 10,000 expanded read-only event occurrences.
- Imported event color distinguished from existing family events.
- Parent display idle transition is suppressed while the event editor or parent event details are open.
- Standalone ICS parser tests executed successfully with the global TypeScript compiler.

## Important limitations
- Complex RFC5545 rules, RECURRENCE-ID overrides, time-zone normalization, multiple-day events, and detached recurrence exceptions remain incomplete.
- Apple CalDAV and remote ICS subscriptions are not implemented. Do not enter Apple credentials into the application.
- The management redesign remains an interim navigation wrapper; the deeper UX overhaul is unfinished.
- Full production build could not be performed: package registry is unreachable (EAI_AGAIN), and required dependencies are not installed.
- Device regression tests have not been performed. This is NOT production-ready.
- New parent event creation currently uses the existing event editor and may appear in Olivia's World. A separate parent-only events data model is still required.
- Do not deploy this ZIP or apply unreviewed migrations to the live application.

## Protection
- src/Olivia.tsx and src/olivia.css are identical to the V5.4.2 baseline.
- No Netlify deploy was performed in this session.
