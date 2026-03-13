import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Create admin user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: "shiv.maurya01@gmail.com",
    password: "spazxasqw123!@#ZX",
    email_confirm: true,
    user_metadata: { full_name: "Shiv Maurya" },
  });

  if (authError && !authError.message.includes("already been registered")) {
    return new Response(JSON.stringify({ error: authError.message }), { status: 400 });
  }

  // Get user id
  let userId = authData?.user?.id;
  if (!userId) {
    const { data: users } = await supabase.auth.admin.listUsers();
    const adminUser = users?.users?.find((u: any) => u.email === "shiv.maurya01@gmail.com");
    userId = adminUser?.id;
  }

  if (!userId) {
    return new Response(JSON.stringify({ error: "Could not find user" }), { status: 400 });
  }

  // Assign admin role
  const { error: roleError } = await supabase
    .from("user_roles")
    .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

  // Create sample vendor user
  const { data: vendorData } = await supabase.auth.admin.createUser({
    email: "vendor@spazen.com",
    password: "vendor123",
    email_confirm: true,
    user_metadata: { full_name: "Demo Vendor" },
  });

  let vendorId = vendorData?.user?.id;
  if (!vendorId) {
    const { data: users } = await supabase.auth.admin.listUsers();
    const vendorUser = users?.users?.find((u: any) => u.email === "vendor@spazen.com");
    vendorId = vendorUser?.id;
  }

  if (vendorId) {
    await supabase.from("user_roles").upsert({ user_id: vendorId, role: "vendor" }, { onConflict: "user_id,role" });
  }

  // Create sample regular user
  const { data: userData } = await supabase.auth.admin.createUser({
    email: "user@spazen.com",
    password: "user123",
    email_confirm: true,
    user_metadata: { full_name: "Demo User" },
  });

  return new Response(JSON.stringify({
    success: true,
    message: "Admin, vendor, and user accounts created",
    accounts: [
      { email: "shiv.maurya01@gmail.com", role: "admin" },
      { email: "vendor@spazen.com", password: "vendor123", role: "vendor" },
      { email: "user@spazen.com", password: "user123", role: "user" },
    ]
  }), { headers: { "Content-Type": "application/json" } });
});
