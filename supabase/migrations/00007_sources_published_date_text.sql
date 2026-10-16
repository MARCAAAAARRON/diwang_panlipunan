-- =============================================================================
-- Migration: 00007_sources_published_date_text.sql
-- Description: Allow published_date to store arbitrary text (e.g. "n.d.", "walang petsa", "2024", or full ISO dates)
-- Author: Diwang Panlipunan Engineering
-- =============================================================================

alter table public.sources 
  alter column published_date type text using published_date::text;

comment on column public.sources.published_date is 'Publication date, year, or "n.d." (no date) for academic citations.';
