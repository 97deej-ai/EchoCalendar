-- Run ONCE in your existing Supabase SQL Editor before uploading images.
-- Keep all existing calendar data and school tables unchanged.
alter table public.calendar_events add column if not exists icon_url text;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('event-images','event-images',true,5242880,array['image/png','image/jpeg','image/webp','image/gif'])
on conflict (id) do update set public=true,file_size_limit=5242880,allowed_mime_types=array['image/png','image/jpeg','image/webp','image/gif'];
-- Signed-in family members may upload into their own folder.
drop policy if exists "event_images_upload" on storage.objects;
create policy "event_images_upload" on storage.objects for insert to authenticated
with check (bucket_id='event-images' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "event_images_read" on storage.objects;
create policy "event_images_read" on storage.objects for select to public
using (bucket_id='event-images');
drop policy if exists "event_images_delete" on storage.objects;
create policy "event_images_delete" on storage.objects for delete to authenticated
using (bucket_id='event-images' and (storage.foldername(name))[1]=auth.uid()::text);
