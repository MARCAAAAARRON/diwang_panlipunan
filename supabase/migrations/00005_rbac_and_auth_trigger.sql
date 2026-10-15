-- =============================================================================
-- Migration: 00005_rbac_and_auth_trigger.sql
-- Description: Expand RBAC roles ('admin', 'editor', 'viewer') and auto-create profile on registration
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

-- 1. Update profiles role check constraint
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check 
  check (role in ('admin', 'editor', 'viewer', 'user'));

-- 2. Trigger function to automatically create profile on Supabase auth.users signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'viewer')
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name),
    updated_at = now();
  return new;
end;
$$;

-- 3. Bind trigger to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

comment on function public.handle_new_user is 'Trigger function to auto-create viewer profile on user registration.';
