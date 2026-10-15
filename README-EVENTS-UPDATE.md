# Olivia calendar event integration

Upload all files to your existing EchoCalendar GitHub repository, preserving folders. No new SQL is needed.

- Events assigned to Olivia (family member named `Olivia`, case insensitive) or Everyone appear on My Day and My Week. Other family members’ private events are excluded.
- Repeating events follow the same recurrence rules as the existing family calendar.
- The selected original images are in `public/images/olivia/events/`.
- Titles containing soccer, swim, or gymnastics automatically use the matching image. Other events use their saved emoji.
- School/daycare, specials, and lunches are unchanged.
- Refreshing My Day reloads the latest family events from Supabase.
- No SQL or environment-variable changes are needed.

**Test:** Add `Soccer Game`, assign it to Olivia, and select a date. In My Day and My Week it should appear. Add an Everyone event and an event for another family member to verify filtering.
