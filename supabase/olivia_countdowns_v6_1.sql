-- Echo Calendar V6.1 — Olivia Countdowns
-- Run once in Supabase SQL Editor before deploying the frontend.
ALTER TABLE public.calendar_events ADD COLUMN IF NOT EXISTS show_countdown BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.calendar_events ADD COLUMN IF NOT EXISTS end_date DATE;
