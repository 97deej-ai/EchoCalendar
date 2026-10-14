-- Run in a new Supabase project SQL editor. Never expose service_role key in the frontend.
create table if not exists public.family_members (id uuid primary key default gen_random_uuid(), name text not null check(length(name) between 1 and 80), color text not null default '#8ab4f8', created_at timestamptz not null default now());
create table if not exists public.calendar_events (id uuid primary key default gen_random_uuid(), title text not null check(length(title) between 1 and 200), event_date date not null, event_time time, member_id uuid references public.family_members(id) on delete set null, icon text not null default '📅', notes text not null default '', repeat text not null default 'none' check(repeat in ('none','daily','weekly','monthly','yearly')), created_at timestamptz not null default now());
create index if not exists calendar_events_date_idx on public.calendar_events(event_date);
create table if not exists public.routines (id uuid primary key default gen_random_uuid(), title text not null, icon text not null default '⭐', completed_on date, created_at timestamptz not null default now());
create table if not exists public.meals (day date primary key, title text not null);
create table if not exists public.shopping_items (id uuid primary key default gen_random_uuid(), title text not null, done boolean not null default false, created_at timestamptz not null default now());
create table if not exists public.app_settings (key text primary key, value text not null);
insert into public.app_settings(key,value) values ('title','Our Family'),('child_name','Friend') on conflict (key) do nothing;
-- Private family data: only explicitly created Auth users can access it.
do $$ declare t text; begin foreach t in array array['family_members','calendar_events','routines','meals','shopping_items','app_settings'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('drop policy if exists family_authenticated on public.%I',t);
 execute format('create policy family_authenticated on public.%I for all to authenticated using (true) with check (true)',t);
 end loop; end $$;
-- Limit dashboard-created users to trusted family accounts; disable public signups in Auth settings.
