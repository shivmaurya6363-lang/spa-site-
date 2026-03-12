import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingStatusBadge from "@/components/BookingStatusBadge";
import type { Booking } from "@/data/mockData";

const MOCK_BOOKINGS: Booking[] = [
  { id: "b1", spaId: "1", spaName: "Serenity Spa & Wellness", serviceName: "Swedish Massage", date: "2024-12-20", time: "14:00", amount: 1999, status: "confirmed", paymentType: "full" },
  { id: "b2", spaId: "3", spaName: "Zen Body Works", serviceName: "Couple Massage", date: "2024-12-15", time: "16:00", amount: 4999, status: "completed", paymentType: "full" },
  { id: "b3", spaId: "2", spaName: "Royal Thai Spa", serviceName: "Hot Stone Massage", date: "2024-12-10", time: "11:00", amount: 199, status: "cancelled", paymentType: "token" },
];

const MyBookingsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="section-container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">My Bookings</h1>

        {MOCK_BOOKINGS.length > 0 ? (
          <div className="space-y-4">
            {MOCK_BOOKINGS.map(booking => (
              <div key={booking.id} className="bg-card rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ boxShadow: "var(--shadow-card)" }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{booking.spaName}</h3>
                    <BookingStatusBadge status={booking.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{booking.serviceName}</p>
                  <p className="text-xs text-muted-foreground mt-1">{booking.date} at {booking.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success">₹{booking.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground capitalize">{booking.paymentType === "token" ? "Token paid" : "Full paid"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📋</p>
            <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
            <p className="text-muted-foreground text-sm">Book your first spa session to get started!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
