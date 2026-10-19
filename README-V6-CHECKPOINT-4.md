# Echo Calendar V6 — checkpoint 4 (development only)

Added a **parent-only, device-local `.ics` file import**. Calendar imports are not written to Supabase `calendar_events`, do not alter Olivia's World, and are read-only. Imported files can be replaced by importing another file with the same name or removed in the Parent Dashboard. The importer handles unfolded iCalendar lines, basic VEVENT DTSTART/SUMMARY/UID/DESCRIPTION, and limits input to 3 MB/3000 events.

**Limitations:** This is not subscribed calendar synchronization. RRULE expansion, timezone conversion, detached occurrences, and live `webcal` updates are not yet supported for imported ICS files. Apple CalDAV credential handling is not implemented. Do not enter credentials. Imported events are stored in this device's local browser storage and are not synchronized between devices.

No live deployment. Do not deploy this development checkpoint to production.
