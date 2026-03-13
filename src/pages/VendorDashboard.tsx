import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, IndianRupee, Star, Users, Eye, TrendingUp, Store } from "lucide-react";

const vendorStats = [
  { label: "Today's Bookings", value: "8", icon: CalendarCheck, change: "+3" },
  { label: "This Month Revenue", value: "₹1.2L", icon: IndianRupee, change: "+18%" },
  { label: "Total Reviews", value: "245", icon: Star, change: "4.6 avg" },
  { label: "Profile Views", value: "1,230", icon: Eye, change: "+22%" },
];

const todaysBookings = [
  { time: "10:00 AM", customer: "Rahul S.", service: "Oil Massage", duration: "60 min", status: "confirmed" },
  { time: "11:30 AM", customer: "Priya G.", service: "Swedish Massage", duration: "90 min", status: "confirmed" },
  { time: "01:00 PM", customer: "Amit K.", service: "Deep Tissue", duration: "60 min", status: "pending" },
  { time: "03:00 PM", customer: "Neha S.", service: "Couple Massage", duration: "90 min", status: "confirmed" },
  { time: "05:00 PM", customer: "Vikash J.", service: "Hot Stone", duration: "75 min", status: "pending" },
];

const statusColor: Record<string, string> = {
  confirmed: "bg-primary/20 text-primary border-primary/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const VendorDashboard = () => {
  const { hasRole, loading, user, signOut } = useAuth();

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!hasRole("vendor") && !hasRole("admin")) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="section-container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Store className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">Vendor</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Vendor Dashboard</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}>Logout</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {vendorStats.map(stat => (
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

        {/* Today's Schedule */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Today's Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysBookings.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-primary w-20">{b.time}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{b.customer}</p>
                      <p className="text-xs text-muted-foreground">{b.service} · {b.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-[10px] ${statusColor[b.status]}`}>{b.status}</Badge>
                    {b.status === "pending" && (
                      <Button size="sm" className="h-7 text-xs">Accept</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default VendorDashboard;
