# V5.4.1 — My Day layout and weather pictures

- Removes tall arrow rails; retains accessible floating blue previous/next chevrons and Today control.
- Three cards use one row on the 800×480 Echo Show; four or five cards use compact rows.
- Parent Manage > Olivia's Pictures includes optional weather picture slots for both Kindergarten and Daycare.
- Weather variants: sunny, cloudy, rainy, snowy, stormy, windy, foggy, cold, hot.
- Priority: storm > snow > rain > fog > wind > cold/hot > sunny/cloudy. Cold means daily high <=40°F; hot >=85°F; windy means maximum daily wind >=25 km/h (Open-Meteo default).
- Weather matching uses the forecast for the *viewed date* (not the actual date). Dates outside the weather forecast and failed weather fetches fall back to the normal image.
- Pictures upload to existing event-images bucket, URLs are saved as existing app_settings entries. No SQL migration required.
- No change to actual calendar dates, chore completion records, or the footer's real-date weather.

Deployment: replace repository files and allow Netlify to build. Verify on the Echo, particularly three/four/five cards and picture uploads. Production build was not completed in this environment.
