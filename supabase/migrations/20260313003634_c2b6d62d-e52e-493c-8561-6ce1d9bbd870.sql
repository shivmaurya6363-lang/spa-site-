
DROP POLICY IF EXISTS "Authenticated can insert referrals" ON public.referrals;
CREATE POLICY "Referrer or admin can insert referrals" ON public.referrals FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = referrer_id OR public.has_role(auth.uid(), 'admin')
);
