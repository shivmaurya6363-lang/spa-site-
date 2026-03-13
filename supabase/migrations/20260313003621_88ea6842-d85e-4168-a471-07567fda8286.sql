
-- Function to add vendor role (called after spa registration)
CREATE OR REPLACE FUNCTION public.add_vendor_role(_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'vendor')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Also allow referrals to be inserted by authenticated users (for auto-creation on registration)
DROP POLICY IF EXISTS "System can insert referrals" ON public.referrals;
CREATE POLICY "Authenticated can insert referrals" ON public.referrals FOR INSERT TO authenticated WITH CHECK (true);
