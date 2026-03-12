import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Clock, Star, Instagram, MessageCircle, ChevronLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { MOCK_SPAS, MOCK_REVIEWS } from "@/data/mockData";

const SpaDetailPage = () => {
  const { id } = useParams();
  const spa = MOCK_SPAS.find(s => s.id === id);
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!spa) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="section-container py-16 text-center">
          <p className="text-4xl mb-4">😕</p>
          <h2 className="text-xl font-semibold text-foreground mb-2">Spa not found</h2>
          <Link to="/spas"><Button variant="outline">Browse Spas</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="section-container py-6">
        {/* Breadcrumb */}
        <Link to="/spas" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft size={16} /> Back to Spas
        </Link>

        {/* Photo Gallery Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <div className="md:col-span-2 aspect-[16/9] bg-primary-light rounded-2xl flex items-center justify-center">
            <span className="text-6xl">🧖</span>
          </div>
          <div className="grid grid-rows-2 gap-3">
            <div className="bg-primary-light rounded-2xl flex items-center justify-center">
              <span className="text-3xl">💆</span>
            </div>
            <div className="bg-primary-light rounded-2xl flex items-center justify-center relative">
              <span className="text-3xl">🌿</span>
              <button className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full text-foreground">
                Show All Photos
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{spa.name}</h1>
                <div className="flex items-center gap-1 bg-primary-light text-primary px-2.5 py-1 rounded-full">
                  <Star size={13} className="fill-current" />
                  <span className="text-sm font-semibold">{spa.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={14} /> {spa.address}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {spa.openingTime} – {spa.closingTime}</span>
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{spa.description}</p>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Services & Pricing</h2>
              <div className="space-y-3">
                {spa.services.filter(s => s.isActive).map(service => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                    <div>
                      <p className="font-medium text-foreground text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.duration} minutes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success">₹{service.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Location</h2>
              <div className="aspect-[16/9] bg-muted rounded-2xl overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${spa.lat},${spa.lng}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Spa Location"
                />
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Reviews ({spa.reviewCount})</h2>
              <div className="space-y-4">
                {MOCK_REVIEWS.map(review => (
                  <div key={review.id} className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-xs font-bold text-primary">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{review.userName}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} size={10} className={j < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"} />
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="mb-4">
                <span className="text-xs text-muted-foreground">Starting from</span>
                <p className="text-2xl font-bold text-success">₹{spa.priceFrom.toLocaleString()}</p>
              </div>

              <Button className="w-full mb-3" size="lg" onClick={() => setBookingOpen(true)}>
                Book Now
              </Button>

              <Button variant="outline" className="w-full mb-4" size="sm" asChild>
                <a href={`https://wa.me/${spa.whatsapp.replace(/\s/g, "")}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} className="mr-2" /> WhatsApp
                </a>
              </Button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={14} /> {spa.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Instagram size={14} /> {spa.instagram}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={14} /> {spa.openingTime} – {spa.closingTime}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <button className="text-sm text-primary hover:underline flex items-center gap-1">
                  <Share2 size={14} /> Share this spa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedSpa={spa} />
    </div>
  );
};

export default SpaDetailPage;
