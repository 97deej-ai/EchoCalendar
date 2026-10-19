# V6.0 Checkpoint 10 — public ICS subscriptions

Added an HTTPS-only Netlify server function at `/api/ics-feed` and a parent-only subscription interface. URLs and imported event snapshots are saved in the browser on that device; refresh on dashboard opening and approximately hourly while the dashboard is open. This is **not** unattended background sync, secure iCloud CalDAV, or multi-device sync. The proxy rejects non-HTTPS, credentials, IP literals, known private network IP ranges and follows redirects only after revalidation. DNS rebinding and cross-request DNS changes are possible; deploy behind additional egress protections if threat model requires it.

Olivia.tsx and olivia.css remain untouched. Do not deploy without npm build, serverless function testing, and Supabase migration testing. Do not enter Apple app-specific passwords in public ICS URL fields.
