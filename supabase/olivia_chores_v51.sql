-- V5.1: add optional photo to each chore. Safe to run on existing V5 data.
ALTER TABLE public.olivia_chores ADD COLUMN IF NOT EXISTS image_url TEXT;
NOTIFY pgrst, 'reload schema';
-- Reuses the existing public event-images bucket and authenticated upload policy.
-- No new bucket is required.
