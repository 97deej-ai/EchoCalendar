-- Run in Supabase SQL Editor BEFORE deploying V5.
-- Chore definitions live in the adult Manage screen; child mode only toggles completion.
create table if not exists public.olivia_chores (
 id uuid primary key default gen_random_uuid(),
 title text not null check (char_length(title) between 1 and 70),
 icon text not null default '⭐',
 days_of_week integer[] not null default '{0,1,2,3,4,5,6}',
 sort_order numeric not null default 0,
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table if not exists public.olivia_chore_completions (
 chore_id uuid not null references public.olivia_chores(id) on delete cascade,
 day date not null,
 completed_at timestamptz not null default now(),
 primary key (chore_id,day)
);
alter table public.olivia_chores enable row level security;
alter table public.olivia_chore_completions enable row level security;
drop policy if exists olivia_chore_family_access on public.olivia_chores;
create policy olivia_chore_family_access on public.olivia_chores for all to authenticated using (true) with check (true);
drop policy if exists olivia_chore_completion_family_access on public.olivia_chore_completions;
create policy olivia_chore_completion_family_access on public.olivia_chore_completions for all to authenticated using (true) with check (true);
-- All authenticated family users share the calendar; this matches the existing app access model.
notify pgrst, 'reload schema';
