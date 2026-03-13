import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, roles, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Auto-redirect if already logged in
  useEffect(() => {
    if (!authLoading && user && roles.length > 0) {
      redirectToDashboard(roles);
    }
  }, [authLoading, user, roles]);

  const redirectToDashboard = (roleList: string[]) => {
    if (roleList.includes("admin")) navigate("/admin", { replace: true });
    else if (roleList.includes("vendor")) navigate("/vendor/dashboard", { replace: true });
    else navigate("/dashboard", { replace: true });
  };

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back! 🎉" });
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: rolesData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);
        const roleList = rolesData?.map((r: any) => r.role) || [];
        redirectToDashboard(roleList);
      }
    }
  };

  const handleSignup = async () => {
    if (!signupName || !signupEmail || !signupPassword) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (signupPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: { data: { full_name: signupName } },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account Created! 🎉", description: "You're now logged in." });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Welcome to SpaZen</h1>
            <p className="text-muted-foreground text-sm mt-1">Login or create your account</p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <Input placeholder="you@email.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Password</Label>
                  <Input type="password" placeholder="Enter password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="mt-1.5" />
                </div>
                <Button className="w-full" onClick={handleLogin} disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Full Name</Label>
                  <Input placeholder="Your name" value={signupName} onChange={e => setSignupName(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <Input placeholder="you@email.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Password</Label>
                  <Input type="password" placeholder="Min 6 characters" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} className="mt-1.5" />
                </div>
                <Button className="w-full" onClick={handleSignup} disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
