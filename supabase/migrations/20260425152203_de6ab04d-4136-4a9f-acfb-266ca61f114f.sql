CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP POLICY IF EXISTS "Public can view cms files" ON storage.objects;
CREATE POLICY "Public read cms by path" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'cms' AND auth.role() = 'anon' IS NOT NULL);