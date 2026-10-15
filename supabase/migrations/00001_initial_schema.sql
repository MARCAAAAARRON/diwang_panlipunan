-- =============================================================================
-- Migration: 00001_initial_schema.sql
-- Description: Core tables, foreign keys, constraints, indexes, and full-text search
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

-- Enable pgcrypto extension for gen_random_uuid() if not enabled
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. Profiles (linked to Supabase auth.users)
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('admin', 'user')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'User profile metadata extending Supabase auth.users with RBAC role.';

-- -----------------------------------------------------------------------------
-- 2. Topics (7 core societal themes)
-- -----------------------------------------------------------------------------
create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_fil text not null,
  name_en text not null,
  description_fil text not null,
  description_en text,
  icon_name text not null,
  color_token text not null,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.topics is 'Core societal themes (Edukasyon, Kalusugan, Ekonomiya, atbp.).';

-- -----------------------------------------------------------------------------
-- 3. Subtopics (Articles / In-depth analyses)
-- -----------------------------------------------------------------------------
create table if not exists public.subtopics (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  slug text not null unique,
  title text not null,
  summary text not null,
  content_markdown text not null,
  read_time_minutes integer not null default 5,
  cover_image_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector
);

-- Idempotent column check in case table already exists
alter table public.subtopics add column if not exists cover_image_url text;

comment on table public.subtopics is 'Long-form editorial articles under each topic.';

-- -----------------------------------------------------------------------------
-- 4. Sources (Citations and external academic references)
-- -----------------------------------------------------------------------------
create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  subtopic_id uuid not null references public.subtopics(id) on delete cascade,
  title text not null,
  author text,
  publication text not null,
  url text not null,
  published_date date,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.sources is 'Verified bibliographic citations attached to subtopic articles.';

-- -----------------------------------------------------------------------------
-- 5. Feedback (Binary reader feedback with optional comments)
-- -----------------------------------------------------------------------------
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  subtopic_id uuid not null references public.subtopics(id) on delete cascade,
  is_helpful boolean not null,
  comment text,
  client_ip_hash text,
  created_at timestamptz not null default now()
);

comment on table public.feedback is 'Reader feedback ("Nakatulong ba ito? Oo / Hindi") on subtopics.';

-- -----------------------------------------------------------------------------
-- 6. Suggestions (Public topic suggestions for editorial consideration)
-- -----------------------------------------------------------------------------
create table if not exists public.suggestions (
  id uuid primary key default gen_random_uuid(),
  topic_title text not null,
  description text not null,
  rationale text,
  contact_email text,
  status text not null default 'pending' check (status in ('pending', 'in_review', 'implemented', 'dismissed')),
  client_ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.suggestions is 'Public submissions proposing new societal issues to cover.';

-- -----------------------------------------------------------------------------
-- Indexes for Performance
-- -----------------------------------------------------------------------------
create index if not exists idx_subtopics_topic_id on public.subtopics(topic_id);
create index if not exists idx_subtopics_is_published on public.subtopics(is_published);
create index if not exists idx_sources_subtopic_id on public.sources(subtopic_id);
create index if not exists idx_feedback_subtopic_id on public.feedback(subtopic_id);
create index if not exists idx_suggestions_status on public.suggestions(status);

-- -----------------------------------------------------------------------------
-- Full-Text Search Configuration (PostgreSQL tsvector with simple dictionary)
-- -----------------------------------------------------------------------------
create or replace function public.subtopics_search_vector_trigger()
returns trigger language plpgsql as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.summary, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(new.content_markdown, '')), 'C');
  return new;
end;
$$;

drop trigger if exists trg_subtopics_search_vector on public.subtopics;
create trigger trg_subtopics_search_vector
before insert or update on public.subtopics
for each row execute function public.subtopics_search_vector_trigger();

create index if not exists idx_subtopics_search_vector on public.subtopics using gin(search_vector);
