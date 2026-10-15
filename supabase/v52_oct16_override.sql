-- Optional: run in Supabase SQL Editor to add the requested school cancellation.
-- Existing olivia_school_days table from olivia_v1.sql must already exist.
insert into public.olivia_school_days (day,activity,note)
values ('2026-10-16','daycare','School canceled')
on conflict (day) do update set activity=excluded.activity,note=excluded.note,updated_at=now();
