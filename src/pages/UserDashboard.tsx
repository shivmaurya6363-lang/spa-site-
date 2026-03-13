import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Heart, Clock, User } from "lucide-react";

const upcomingBookings = [
  { spa: "Tranquil Touch Spa", service: "Oil Massage", date: "Mar 18, 2026", time: "3:00 PM", status: "confirmed" },
  { spa: "Zen Retreat", service: "Facial", date: "Mar 22, 2026", time: "11:00 AM", status: "confirmed" },
];

const pastBookings = [
  { spa: "Royal Spa", service: "Swedish Massage", date: "Mar 5, 2026", time: "2:00 PM", amount: "₹2,500", rating: 4.5 },
  { spa: "Bliss Spa", service: "Deep Tissue", date: "Feb 20, 2026", time: "4:00 PM", amount: "₹3,200", rating: 5 },
  { spa: "Tranquil Touch Spa", service: "Couple Massage", date: "Feb 10, 2026", time: "6:00 PM", amount: "₹5,000", rating: 4 },
];

const UserDashboard = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="section-container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">Member</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/spas"><Button size="sm">Book a Spa</Button></Link>
            <Button variant="outline" size="sm" onClick={signOut}>Logout</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <CalendarCheck className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground">Total Bookings</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Favorites</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingBookings.map((b, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-foreground">{b.spa}</p>
                        <p className="text-xs text-muted-foreground">{b.service}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] bg-primary/20 text-primary border-primary/30">{b.status}</Badge>
                    </div>
                    <p className="text-xs text-primary mt-2">{b.date} · {b.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Past */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Past Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pastBookings.map((b, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-foreground">{b.spa}</p>
                        <p className="text-xs text-muted-foreground">{b.service} · {b.date}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{b.amount}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {"★".repeat(Math.floor(b.rating))}
                      <span className="text-xs text-muted-foreground ml-1">{b.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
