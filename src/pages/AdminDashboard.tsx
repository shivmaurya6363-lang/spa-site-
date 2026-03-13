import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Store, CalendarCheck, IndianRupee, TrendingUp, Shield } from "lucide-react";

const statsData = [
  { label: "Total Users", value: "2,847", icon: Users, change: "+12%" },
  { label: "Active Spas", value: "156", icon: Store, change: "+8%" },
  { label: "Total Bookings", value: "12,450", icon: CalendarCheck, change: "+23%" },
  { label: "Revenue", value: "₹18.5L", icon: IndianRupee, change: "+15%" },
];

const recentBookings = [
  { id: "BK001", user: "Rahul Sharma", spa: "Tranquil Touch Spa", service: "Swedish Massage", amount: "₹2,500", status: "confirmed" },
  { id: "BK002", user: "Priya Gupta", spa: "Zen Retreat", service: "Deep Tissue", amount: "₹3,200", status: "pending" },
  { id: "BK003", user: "Amit Kumar", spa: "Royal Spa", service: "Couple Massage", amount: "₹5,000", status: "completed" },
  { id: "BK004", user: "Neha Singh", spa: "Bliss Spa", service: "Facial", amount: "₹1,800", status: "cancelled" },
];

const pendingVendors = [
  { name: "Aura Wellness Center", owner: "Vikash Jain", area: "Hauz Khas", phone: "9876543210" },
  { name: "Serene Spa & Salon", owner: "Meena Agarwal", area: "Dwarka", phone: "9812345678" },
];

const statusColor: Record<string, string> = {
  confirmed: "bg-primary/20 text-primary border-primary/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
};

const AdminDashboard = () => {
  const { hasRole, loading, user, signOut } = useAuth();

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!hasRole("admin")) return <Navigate to="/login" replace />;

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
                  <span className="text-xs text-green-400 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBookings.map(b => (
                    <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{b.user}</p>
                        <p className="text-xs text-muted-foreground">{b.spa} · {b.service}</p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="text-sm font-semibold text-foreground">{b.amount}</p>
                        <Badge variant="outline" className={`text-[10px] ${statusColor[b.status]}`}>{b.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Vendors */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Pending Vendor Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingVendors.map(v => (
                    <div key={v.name} className="p-3 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm font-medium text-foreground">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.owner} · {v.area}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" className="h-7 text-xs flex-1">Approve</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs flex-1">Reject</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
