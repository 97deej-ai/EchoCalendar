# Echo Calendar V5.2.1 — activity label spacing

This is a CSS-only patch on top of V5.2. It fixes event time overlapping the activity title on Olivia's My Day cards, particularly on the 800×480 Echo Show display.

- Activity title and event time now flow in separate rows beneath the image.
- Event time is no longer absolutely positioned.
- Images shrink within the fixed square card to leave room for both lines.
- No Supabase migrations, artwork changes, or feature changes are required.

Upload the project files to GitHub and allow Netlify to deploy.
