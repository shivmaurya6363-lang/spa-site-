import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Store, CalendarCheck, IndianRupee, TrendingUp, Shield, Eye, CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Spa {
  id: string;
  vendor_id: string;
  name: string;
  owner_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  area: string | null;
  city: string | null;
  description: string | null;
  status: string;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
}

interface Booking {
  id: string;
  user_id: string;
  spa_id: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  amount: number;
  status: string;
  created_at: string;
}

interface Referral {
  id: string;
  referrer_id: string;
  referred_spa_id: string;
  commission_amount: number;
  status: string;
  created_at: string;
}

const statusColor: Record<string, string> = {
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  rejected: "bg-destructive/20 text-destructive border-destructive/30",
  confirmed: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
  eligible: "bg-green-500/20 text-green-400 border-green-500/30",
  paid: "bg-primary/20 text-primary border-primary/30",
};

const AdminDashboard = () => {
  const { hasRole, loading, user, signOut } = useAuth();
  const [spas, setSpas] = useState<Spa[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedSpa, setSelectedSpa] = useState<Spa | null>(null);
  const [spaBookings, setSpaBookings] = useState<Booking[]>([]);
  const [spaServices, setSpaServices] = useState<any[]>([]);
  const [spaReferrals, setSpaReferrals] = useState<Referral[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchData = async () => {
    setDataLoading(true);
    const [spasRes, bookingsRes, referralsRes, servicesRes] = await Promise.all([
      supabase.from("spas").select("*").order("created_at", { ascending: false }),
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("referrals").select("*"),
      supabase.from("spa_services").select("*"),
    ]);
    setSpas((spasRes.data as any[]) || []);
    setBookings((bookingsRes.data as any[]) || []);
    setReferrals((referralsRes.data as any[]) || []);
    setServices((servicesRes.data as any[]) || []);
    setDataLoading(false);
  };

  useEffect(() => {
    if (hasRole("admin")) fetchData();
  }, [hasRole("admin")]);

  const handleStatusChange = async (spaId: string, newStatus: string) => {
    const { error } = await supabase.from("spas").update({ status: newStatus }).eq("id", spaId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `Spa ${newStatus}!` });
      fetchData();
      if (selectedSpa?.id === spaId) setSelectedSpa({ ...selectedSpa, status: newStatus });
    }
  };

  const viewSpaDetails = async (spa: Spa) => {
    setSelectedSpa(spa);
    const [bRes, sRes, rRes] = await Promise.all([
      supabase.from("bookings").select("*").eq("spa_id", spa.id).order("created_at", { ascending: false }),
      supabase.from("spa_services").select("*").eq("spa_id", spa.id),
      supabase.from("referrals").select("*").eq("referred_spa_id", spa.id),
    ]);
    setSpaBookings((bRes.data as any[]) || []);
    setSpaServices((sRes.data as any[]) || []);
    setSpaReferrals((rRes.data as any[]) || []);
    setDetailOpen(true);
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!hasRole("admin")) return <Navigate to="/login" replace />;

  const totalRevenue = bookings.filter(b => b.status === "completed").reduce((s, b) => s + Number(b.amount), 0);
  const totalCommission = referrals.filter(r => r.status !== "pending").reduce((s, r) => s + Number(r.commission_amount), 0);
  const pendingSpas = spas.filter(s => s.status === "pending");
  const approvedSpas = spas.filter(s => s.status === "approved");

  const statsData = [
    { label: "Total Spas", value: spas.length.toString(), icon: Store, change: `${approvedSpas.length} active` },
    { label: "Pending Approvals", value: pendingSpas.length.toString(), icon: Clock, change: "needs action" },
    { label: "Total Bookings", value: bookings.length.toString(), icon: CalendarCheck, change: `${bookings.filter(b => b.status === "completed").length} done` },
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: IndianRupee, change: `₹${totalCommission.toLocaleString("en-IN")} commission` },
  ];

  const spaRevenue = (spaId: string) => bookings.filter(b => b.spa_id === spaId && b.status === "completed").reduce((s, b) => s + Number(b.amount), 0);
  const spaBookingCount = (spaId: string) => bookings.filter(b => b.spa_id === spaId).length;
  const spaReferralCount = (spaId: string) => referrals.filter(r => r.referred_spa_id === spaId).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="section-container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">Admin</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}>Logout</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map(stat => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Spas ({spas.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingSpas.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedSpas.length})</TabsTrigger>
            <TabsTrigger value="bookings">All Bookings ({bookings.length})</TabsTrigger>
          </TabsList>

          {/* All Spas */}
          <TabsContent value="all">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Spa Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {spas.length === 0 && (
                      <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No spas registered yet</TableCell></TableRow>
                    )}
                    {spas.map(spa => (
                      <TableRow key={spa.id}>
                        <TableCell className="font-medium">{spa.name}</TableCell>
                        <TableCell>{spa.owner_name}</TableCell>
                        <TableCell>{spa.area || "-"}</TableCell>
                        <TableCell>{new Date(spa.created_at).toLocaleDateString("en-IN")}</TableCell>
                        <TableCell>{spaBookingCount(spa.id)}</TableCell>
                        <TableCell>₹{spaRevenue(spa.id).toLocaleString("en-IN")}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] ${statusColor[spa.status]}`}>{spa.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => viewSpaDetails(spa)}>
                              <Eye className="w-3 h-3 mr-1" /> View
                            </Button>
                            {spa.status === "pending" && (
                              <>
                                <Button size="sm" className="h-7 text-xs" onClick={() => handleStatusChange(spa.id, "approved")}>
                                  <CheckCircle className="w-3 h-3 mr-1" /> Approve
                                </Button>
                                <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleStatusChange(spa.id, "rejected")}>
                                  <XCircle className="w-3 h-3 mr-1" /> Reject
                                </Button>
                              </>
                            )}
                            {spa.status === "approved" && (
                              <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleStatusChange(spa.id, "rejected")}>Disable</Button>
                            )}
                            {spa.status === "rejected" && (
                              <Button size="sm" className="h-7 text-xs" onClick={() => handleStatusChange(spa.id, "approved")}>Re-Approve</Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending */}
          <TabsContent value="pending">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Spa Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingSpas.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No pending approvals</TableCell></TableRow>
                    )}
                    {pendingSpas.map(spa => (
                      <TableRow key={spa.id}>
                        <TableCell className="font-medium">{spa.name}</TableCell>
                        <TableCell>{spa.owner_name}</TableCell>
                        <TableCell>{spa.phone || "-"}</TableCell>
                        <TableCell>{spa.area || "-"}</TableCell>
                        <TableCell>{new Date(spa.created_at).toLocaleDateString("en-IN")}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => viewSpaDetails(spa)}><Eye className="w-3 h-3 mr-1" /> View</Button>
                            <Button size="sm" className="h-7 text-xs" onClick={() => handleStatusChange(spa.id, "approved")}>Approve</Button>
                            <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleStatusChange(spa.id, "rejected")}>Reject</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approved */}
          <TabsContent value="approved">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Spa Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Services</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedSpas.length === 0 && (
                      <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No approved spas</TableCell></TableRow>
                    )}
                    {approvedSpas.map(spa => (
                      <TableRow key={spa.id}>
                        <TableCell className="font-medium">{spa.name}</TableCell>
                        <TableCell>{spa.owner_name}</TableCell>
                        <TableCell>{spa.area || "-"}</TableCell>
                        <TableCell>{services.filter(s => s.spa_id === spa.id).length}</TableCell>
                        <TableCell>{spaBookingCount(spa.id)}</TableCell>
                        <TableCell>₹{spaRevenue(spa.id).toLocaleString("en-IN")}</TableCell>
                        <TableCell>{spaReferralCount(spa.id)}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => viewSpaDetails(spa)}><Eye className="w-3 h-3 mr-1" /> Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Bookings */}
          <TabsContent value="bookings">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No bookings yet</TableCell></TableRow>
                    )}
                    {bookings.map(b => (
                      <TableRow key={b.id}>
                        <TableCell className="font-mono text-xs">{b.id.slice(0, 8)}</TableCell>
                        <TableCell>{b.service_name}</TableCell>
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
        </Tabs>

        {/* Spa Detail Dialog */}
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedSpa && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    {selectedSpa.name}
                    <Badge variant="outline" className={`text-[10px] ${statusColor[selectedSpa.status]}`}>{selectedSpa.status}</Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-xs text-muted-foreground">Owner</p><p className="text-sm font-medium text-foreground">{selectedSpa.owner_name}</p></div>
                    <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium text-foreground">{selectedSpa.phone || "-"}</p></div>
                    <div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium text-foreground">{selectedSpa.email || "-"}</p></div>
                    <div><p className="text-xs text-muted-foreground">Area</p><p className="text-sm font-medium text-foreground">{selectedSpa.area || "-"}, {selectedSpa.city}</p></div>
                    <div><p className="text-xs text-muted-foreground">Referral Code</p><p className="text-sm font-medium text-primary">{selectedSpa.referral_code || "-"}</p></div>
                    <div><p className="text-xs text-muted-foreground">Registered</p><p className="text-sm font-medium text-foreground">{new Date(selectedSpa.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div>
                  </div>
                  {selectedSpa.address && (
                    <div><p className="text-xs text-muted-foreground">Address</p><p className="text-sm text-foreground">{selectedSpa.address}</p></div>
                  )}
                  {selectedSpa.description && (
                    <div><p className="text-xs text-muted-foreground">Description</p><p className="text-sm text-foreground">{selectedSpa.description}</p></div>
                  )}

                  {/* Stats Summary */}
                  <div className="grid grid-cols-4 gap-3">
                    <Card className="bg-muted/50 border-border"><CardContent className="p-3 text-center">
                      <p className="text-lg font-bold text-foreground">{spaBookings.length}</p>
                      <p className="text-[10px] text-muted-foreground">Total Bookings</p>
                    </CardContent></Card>
                    <Card className="bg-muted/50 border-border"><CardContent className="p-3 text-center">
                      <p className="text-lg font-bold text-foreground">{spaBookings.filter(b => b.status === "completed").length}</p>
                      <p className="text-[10px] text-muted-foreground">Completed</p>
                    </CardContent></Card>
                    <Card className="bg-muted/50 border-border"><CardContent className="p-3 text-center">
                      <p className="text-lg font-bold text-foreground">₹{spaBookings.filter(b => b.status === "completed").reduce((s, b) => s + Number(b.amount), 0).toLocaleString("en-IN")}</p>
                      <p className="text-[10px] text-muted-foreground">Revenue</p>
                    </CardContent></Card>
                    <Card className="bg-muted/50 border-border"><CardContent className="p-3 text-center">
                      <p className="text-lg font-bold text-foreground">{spaReferrals.length}</p>
                      <p className="text-[10px] text-muted-foreground">Referrals</p>
                    </CardContent></Card>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Services ({spaServices.length})</h3>
                    {spaServices.length === 0 ? <p className="text-xs text-muted-foreground">No services added</p> : (
                      <div className="space-y-2">
                        {spaServices.map((s: any) => (
                          <div key={s.id} className="flex justify-between items-center p-2 rounded-lg bg-muted/50 border border-border">
                            <div>
                              <p className="text-sm font-medium text-foreground">{s.name}</p>
                              <p className="text-xs text-muted-foreground">{s.duration_minutes} min</p>
                            </div>
                            <p className="text-sm font-semibold text-foreground">₹{Number(s.price).toLocaleString("en-IN")}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Bookings */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Recent Bookings</h3>
                    {spaBookings.length === 0 ? <p className="text-xs text-muted-foreground">No bookings yet</p> : (
                      <div className="space-y-2">
                        {spaBookings.slice(0, 10).map(b => (
                          <div key={b.id} className="flex justify-between items-center p-2 rounded-lg bg-muted/50 border border-border">
                            <div>
                              <p className="text-sm font-medium text-foreground">{b.service_name}</p>
                              <p className="text-xs text-muted-foreground">{b.booking_date} · {b.booking_time}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-foreground">₹{Number(b.amount).toLocaleString("en-IN")}</p>
                              <Badge variant="outline" className={`text-[10px] ${statusColor[b.status]}`}>{b.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Referral Info */}
                  {spaReferrals.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">Referral Commission</h3>
                      <div className="space-y-2">
                        {spaReferrals.map(r => (
                          <div key={r.id} className="flex justify-between items-center p-2 rounded-lg bg-muted/50 border border-border">
                            <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("en-IN")}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-foreground">₹{Number(r.commission_amount).toLocaleString("en-IN")}</p>
                              <Badge variant="outline" className={`text-[10px] ${statusColor[r.status]}`}>{r.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {selectedSpa.status === "pending" && (
                      <>
                        <Button className="flex-1" onClick={() => { handleStatusChange(selectedSpa.id, "approved"); }}>
                          <CheckCircle className="w-4 h-4 mr-2" /> Approve
                        </Button>
                        <Button variant="destructive" className="flex-1" onClick={() => { handleStatusChange(selectedSpa.id, "rejected"); }}>
                          <XCircle className="w-4 h-4 mr-2" /> Reject
                        </Button>
                      </>
                    )}
                    {selectedSpa.status === "approved" && (
                      <Button variant="destructive" className="flex-1" onClick={() => handleStatusChange(selectedSpa.id, "rejected")}>Disable Spa</Button>
                    )}
                    {selectedSpa.status === "rejected" && (
                      <Button className="flex-1" onClick={() => handleStatusChange(selectedSpa.id, "approved")}>Re-Approve</Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
