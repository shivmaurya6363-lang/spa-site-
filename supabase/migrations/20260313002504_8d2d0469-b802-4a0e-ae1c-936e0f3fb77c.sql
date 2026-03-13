
-- Spas table (vendor registered spas)
CREATE TABLE public.spas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  owner_name text NOT NULL,
  email text,
  phone text,
  address text,
  area text,
  city text DEFAULT 'Delhi',
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  referral_code text UNIQUE DEFAULT ('SPA-' || substr(md5(random()::text), 1, 6)),
  referred_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Spa services
CREATE TABLE public.spa_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  spa_id uuid NOT NULL REFERENCES public.spas(id) ON DELETE CASCADE,
  name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  duration_minutes integer NOT NULL DEFAULT 60,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Bookings
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  spa_id uuid NOT NULL REFERENCES public.spas(id) ON DELETE CASCADE,
  service_id uuid REFERENCES public.spa_services(id),
  service_name text NOT NULL,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Referrals tracking
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_spa_id uuid NOT NULL REFERENCES public.spas(id) ON DELETE CASCADE,
  commission_amount numeric NOT NULL DEFAULT 1000,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','eligible','paid')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.spas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spa_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Spas policies
CREATE POLICY "Anyone can view approved spas" ON public.spas FOR SELECT USING (status = 'approved' OR auth.uid() = vendor_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Vendors can insert their spa" ON public.spas FOR INSERT WITH CHECK (auth.uid() = vendor_id);
CREATE POLICY "Vendors can update their spa" ON public.spas FOR UPDATE USING (auth.uid() = vendor_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete spas" ON public.spas FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Spa services policies
CREATE POLICY "Anyone can view active services" ON public.spa_services FOR SELECT USING (true);
CREATE POLICY "Vendors can manage services" ON public.spa_services FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.spas WHERE id = spa_id AND vendor_id = auth.uid())
);
CREATE POLICY "Vendors can update services" ON public.spa_services FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.spas WHERE id = spa_id AND vendor_id = auth.uid())
);
CREATE POLICY "Vendors can delete services" ON public.spa_services FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.spas WHERE id = spa_id AND vendor_id = auth.uid())
);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (
  auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR
  EXISTS (SELECT 1 FROM public.spas WHERE id = spa_id AND vendor_id = auth.uid())
);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update bookings" ON public.bookings FOR UPDATE USING (
  auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR
  EXISTS (SELECT 1 FROM public.spas WHERE id = spa_id AND vendor_id = auth.uid())
);

-- Referrals policies
CREATE POLICY "View own referrals" ON public.referrals FOR SELECT USING (
  auth.uid() = referrer_id OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "System can insert referrals" ON public.referrals FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated at triggers
CREATE TRIGGER update_spas_updated_at BEFORE UPDATE ON public.spas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
