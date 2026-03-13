import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarCheck, Heart, Clock, User, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const statusColor: Record<string, string> = {
  confirmed: "bg-primary/20 text-primary border-primary/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
};

const UserDashboard = () => {
  const { user, loading, signOut } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      setDataLoading(true);
      const [bRes, pRes] = await Promise.all([
        supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
      ]);
      setBookings((bRes.data as any[]) || []);
      setProfile(pRes.data);
      setDataLoading(false);
    };
    fetch();
  }, [user]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/login" replace />;

  const upcoming = bookings.filter(b => b.status === "confirmed" || b.status === "pending");
  const completed = bookings.filter(b => b.status === "completed");
  const totalSpent = completed.reduce((s, b) => s + Number(b.amount), 0);

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <CalendarCheck className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{upcoming.length}</p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
              <p className="text-xs text-muted-foreground">Total Bookings</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{completed.length}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <IndianRupee className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">₹{totalSpent.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">All Bookings</CardTitle>
          </CardHeader>
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
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No bookings yet. <Link to="/spas" className="text-primary underline">Browse spas</Link></TableCell></TableRow>
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
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
