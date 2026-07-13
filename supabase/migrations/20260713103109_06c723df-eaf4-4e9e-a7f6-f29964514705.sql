
-- Lock down has_role: revoke public execute, only allow authenticated (the trigger/policy path uses SECURITY DEFINER regardless)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

-- Storage RLS for lead-photos bucket
-- Allow anyone to upload (submit their photos with a lead)
CREATE POLICY "public can upload lead photos"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'lead-photos');

-- Only admins can read / list photos
CREATE POLICY "admins can read lead photos"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'lead-photos' AND public.has_role(auth.uid(), 'admin'));

-- Only admins can delete photos
CREATE POLICY "admins can delete lead photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'lead-photos' AND public.has_role(auth.uid(), 'admin'));
