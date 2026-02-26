
-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add email format validation trigger
CREATE OR REPLACE FUNCTION public.validate_appointment_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  IF trim(NEW.full_name) = '' THEN
    RAISE EXCEPTION 'Full name cannot be empty';
  END IF;
  IF trim(NEW.phone) = '' THEN
    RAISE EXCEPTION 'Phone cannot be empty';
  END IF;
  IF trim(NEW.service) = '' THEN
    RAISE EXCEPTION 'Service cannot be empty';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_appointment_before_insert
  BEFORE INSERT ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_appointment_email();

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public booking form, no auth required)
CREATE POLICY "Anyone can create appointments"
  ON public.appointments
  FOR INSERT
  WITH CHECK (true);

-- No select/update/delete for anonymous users (admin only later)
