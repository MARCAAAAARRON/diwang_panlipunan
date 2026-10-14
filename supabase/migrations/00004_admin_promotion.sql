-- =============================================================================
-- Migration: 00004_admin_promotion.sql
-- Description: Idempotent helper script and stored function to promote an administrator
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

-- Stored function to promote a user to admin by email
create or replace function public.promote_user_to_admin(target_email text)
returns text language plpgsql security definer set search_path = public as $$
declare
  user_found boolean;
begin
  select exists (
    select 1 from public.profiles where email = target_email
  ) into user_found;

  if not user_found then
    return 'User with email ' || target_email || ' not found in public.profiles. Ensure the user has registered first.';
  end if;

  update public.profiles
  set role = 'admin', updated_at = now()
  where email = target_email;

  return 'Success: ' || target_email || ' promoted to admin role.';
end;
$$;

comment on function public.promote_user_to_admin is 'Idempotent security definer function to promote a registered user to admin.';

-- Example usage in Supabase SQL editor:
-- select public.promote_user_to_admin('admin@diwangpanlipunan.ph');
