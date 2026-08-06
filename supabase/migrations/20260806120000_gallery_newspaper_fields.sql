-- Extra fields for newspaper clipping gallery items
ALTER TABLE public.gallery_items
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS newspaper_name TEXT,
  ADD COLUMN IF NOT EXISTS published_date DATE;
