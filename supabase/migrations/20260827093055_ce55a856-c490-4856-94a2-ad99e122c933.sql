ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS vehicle_size text,
  ADD COLUMN IF NOT EXISTS estimate_text text,
  ADD COLUMN IF NOT EXISTS notified_at timestamptz,
  ADD COLUMN IF NOT EXISTS notify_error text;