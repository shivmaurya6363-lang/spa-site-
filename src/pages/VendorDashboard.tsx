import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, IndianRupee, Star, Eye, TrendingUp, Store, Copy, Plus, Trash2, Users, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SpaService {
  id: string;
  spa_id: string;
  name: string;
  price: number;
  duration_minutes: number;
  is_active: boolean;
}

const statusColor: Record<string, string> = {
  confirmed: "bg-primary/20 text-primary border-primary/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
  eligible: "bg-green-500/20 text-green-400 border-green-500/30",
  paid: "bg-primary/20 text-primary border-primary/30",
};

const VendorDashboard = () => {
  const { hasRole, loading, user, signOut } = useAuth();
  const [spa, setSpa] = useState<any>(null);
  const [services, setServices] = useState<SpaService[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: "", duration_minutes: "60" });

  const fetchData = async () => {
    if (!user) return;
    setDataLoading(true);
    const { data: spaData } = await supabase.from("spas").select("*").eq("vendor_id", user.id).maybeSingle();
    setSpa(spaData);
    if (spaData) {
      const [sRes, bRes, rRes] = await Promise.all([
        supabase.from("spa_services").select("*").eq("spa_id", spaData.id),
        supabase.from("bookings").select("*").eq("spa_id", spaData.id).order("created_at", { ascending: false }),
        supabase.from("referrals").select("*").eq("referrer_id", user.id),
      ]);
      setServices((sRes.data as any[]) || []);
      setBookings((bRes.data as any[]) || []);
      setReferrals((rRes.data as any[]) || []);
    }
    setDataLoading(false);
  };

  useEffect(() => {
    if (user && (hasRole("vendor") || hasRole("admin"))) fetchData();
  }, [user]);

  const addService = async () => {
    if (!newService.name || !newService.price || !spa) {
      toast({ title: "Fill service name and price", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("spa_services").insert({
      spa_id: spa.id,
      name: newService.name,
      price: Number(newService.price),
      duration_minutes: Number(newService.duration_minutes) || 60,
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Service added!" });
      setNewService({ name: "", price: "", duration_minutes: "60" });
      setAddServiceOpen(false);
      fetchData();
    }
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from("spa_services").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Service deleted" }); fetchData(); }
  };

  const copyReferralCode = () => {
    if (spa?.referral_code) {
      navigator.clipboard.writeText(spa.referral_code);
      toast({ title: "Referral code copied!" });
    }
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!hasRole("vendor") && !hasRole("admin")) return <Navigate to="/login" replace />;

  const totalRevenue = bookings.filter(b => b.status === "completed").reduce((s: number, b: any) => s + Number(b.amount), 0);
  const totalCommission = referrals.reduce((s: number, r: any) => s + Number(r.commission_amount), 0);
  const referredRegistered = referrals.length;
  const referredEligible = referrals.filter((r: any) => r.status === "eligible" || r.status === "paid").length;

  const vendorStats = [
    { label: "Total Bookings", value: bookings.length.toString(), icon: CalendarCheck, sub: `${bookings.filter(b => b.status === "completed").length} completed` },
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: IndianRupee, sub: "from completed" },
    { label: "Active Services", value: services.filter(s => s.is_active).length.toString(), icon: Star, sub: `${services.length} total` },
    { label: "Referral Earnings", value: `₹${totalCommission.toLocaleString("en-IN")}`, icon: Gift, sub: `${referredRegistered} referred` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="section-container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Store className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">Vendor</Badge>
              {spa && <Badge variant="outline" className={`text-[10px] ${statusColor[spa.status] || "bg-muted text-muted-foreground"}`}>{spa.status}</Badge>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{spa?.name || "Vendor Dashboard"}</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}>Logout</Button>
        </div>

        {!spa && !dataLoading && (
          <Card className="bg-card border-border mb-8">
            <CardContent className="p-8 text-center">
              <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium">No spa registered yet</p>
              <p className="text-sm text-muted-foreground mt-1">Register your spa to start managing bookings</p>
              <Button className="mt-4" onClick={() => window.location.href = "/vendor/register"}>Register Spa</Button>
            </CardContent>
          </Card>
        )}

        {spa && (
          <>
            {/* Referral Code Banner */}
            <Card className="bg-primary/5 border-primary/20 mb-6">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Your Referral Code</p>
                    <p className="text-lg font-bold text-primary tracking-wider">{spa.referral_code}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={copyReferralCode}><Copy className="w-3 h-3 mr-1" /> Copy</Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {vendorStats.map(stat => (
                <Card key={stat.label} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">{stat.sub}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="bookings" className="space-y-4">
              <TabsList>
                <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
                <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
                <TabsTrigger value="referrals">Referrals ({referrals.length})</TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <Card className="bg-card border-border">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.length === 0 && (
                          <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No bookings yet</TableCell></TableRow>
                        )}
                        {bookings.map(b => (
                          <TableRow key={b.id}>
                            <TableCell className="font-medium">{b.service_name}</TableCell>
                            <TableCell>{b.booking_date}</TableCell>
                            <TableCell>{b.booking_time}</TableCell>
                            <TableCell>₹{Number(b.amount).toLocaleString("en-IN")}</TableCell>
                            <TableCell><Badge variant="outline" className={`text-[10px] ${statusColor[b.status]}`}>{b.status}</Badge></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Your Services</CardTitle>
                    <Button size="sm" onClick={() => setAddServiceOpen(true)}><Plus className="w-3 h-3 mr-1" /> Add Service</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service Name</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services.length === 0 && (
                          <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No services added</TableCell></TableRow>
                        )}
                        {services.map(s => (
                          <TableRow key={s.id}>
                            <TableCell className="font-medium">{s.name}</TableCell>
                            <TableCell>{s.duration_minutes} min</TableCell>
                            <TableCell>₹{Number(s.price).toLocaleString("en-IN")}</TableCell>
                            <TableCell><Badge variant="outline" className={s.is_active ? "text-[10px] bg-green-500/20 text-green-400 border-green-500/30" : "text-[10px] bg-muted text-muted-foreground"}>
                              {s.is_active ? "Active" : "Inactive"}
                            </Badge></TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => deleteService(s.id)}>
                                <Trash2 className="w-3 h-3 mr-1" /> Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Referrals Tab */}
              <TabsContent value="referrals">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 text-center">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">{referredRegistered}</p>
                      <p className="text-xs text-muted-foreground">Total Referred</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 text-center">
                      <Store className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">{referredEligible}</p>
                      <p className="text-xs text-muted-foreground">Registered & Eligible</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 text-center">
                      <IndianRupee className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">₹{totalCommission.toLocaleString("en-IN")}</p>
                      <p className="text-xs text-muted-foreground">Total Commission</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-card border-border">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Commission</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {referrals.length === 0 && (
                          <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-8">No referrals yet. Share your code to earn ₹1,000 per referral!</TableCell></TableRow>
                        )}
                        {referrals.map((r: any) => (
                          <TableRow key={r.id}>
                            <TableCell>{new Date(r.created_at).toLocaleDateString("en-IN")}</TableCell>
                            <TableCell>₹{Number(r.commission_amount).toLocaleString("en-IN")}</TableCell>
                            <TableCell><Badge variant="outline" className={`text-[10px] ${statusColor[r.status]}`}>{r.status}</Badge></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Add Service Dialog */}
        <Dialog open={addServiceOpen} onOpenChange={setAddServiceOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Service</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Service Name</Label><Input className="mt-1.5" value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} placeholder="e.g. Swedish Massage" /></div>
              <div><Label>Price (₹)</Label><Input className="mt-1.5" type="number" value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} placeholder="2000" /></div>
              <div><Label>Duration (minutes)</Label><Input className="mt-1.5" type="number" value={newService.duration_minutes} onChange={e => setNewService({ ...newService, duration_minutes: e.target.value })} placeholder="60" /></div>
              <Button className="w-full" onClick={addService}>Add Service</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default VendorDashboard;
