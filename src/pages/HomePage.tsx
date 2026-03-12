import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Clock, Shield, ChevronRight, ChevronLeft, CheckCircle, DollarSign, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpaCard from "@/components/SpaCard";
import BookingModal from "@/components/BookingModal";
import { MOCK_SPAS, DELHI_NCR_AREAS } from "@/data/mockData";

import oilMassageImg from "@/assets/categories/oil-massage.jpg";
import deepTissueImg from "@/assets/categories/deep-tissue.jpg";
import swedishImg from "@/assets/categories/swedish.jpg";
import hotStoneImg from "@/assets/categories/hot-stone.jpg";
import potliImg from "@/assets/categories/potli.jpg";
import coupleImg from "@/assets/categories/couple.jpg";
import jacuzziImg from "@/assets/categories/jacuzzi.jpg";
import facialImg from "@/assets/categories/facial.jpg";

import delhiImg from "@/assets/cities/delhi.jpg";
import noidaImg from "@/assets/cities/noida.jpg";
import gurgaonImg from "@/assets/cities/gurgaon.jpg";

const CATEGORIES = [
  { name: "Oil Massage", image: oilMassageImg },
  { name: "Deep Tissue", image: deepTissueImg },
  { name: "Swedish", image: swedishImg },
  { name: "Hot Stone", image: hotStoneImg },
  { name: "Potli Massage", image: potliImg },
  { name: "Couple Massage", image: coupleImg },
  { name: "Jacuzzi", image: jacuzziImg },
  { name: "Facial", image: facialImg },
];

const CITIES = [
  { name: "Delhi", spas: 18, image: delhiImg },
  { name: "Noida", spas: 8, image: noidaImg },
  { name: "Gurgaon", spas: 12, image: gurgaonImg },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const featuredSpas = MOCK_SPAS.slice(0, 6);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const howItWorks = [
    { icon: Search, title: "Search", description: "Find spas near you in Delhi NCR by area or service" },
    { icon: Star, title: "Choose", description: "Compare ratings, prices, and services to pick the perfect spa" },
    { icon: Clock, title: "Book", description: "Select your date, time, and pay securely online" },
    { icon: Shield, title: "Relax", description: "Show up and enjoy your spa session. It's that simple!" },
  ];

  const whyChoose = [
    { icon: CheckCircle, title: "Verified Spas", description: "All spa centers are verified and trusted for quality services" },
    { icon: Clock, title: "Instant Booking", description: "Book your spa appointment in seconds with real-time confirmation" },
    { icon: DollarSign, title: "Best Prices", description: "Transparent pricing with no hidden charges" },
  ];

  const testimonials = [
    { name: "Priya Sharma", area: "Hauz Khas", text: "SpaZen made finding a good spa so easy! Booked a couple massage in minutes.", rating: 5 },
    { name: "Amit Verma", area: "Gurgaon", text: "Love the ₹199 booking option. No commitment pressure and great service.", rating: 5 },
    { name: "Sneha Gupta", area: "Noida", text: "Finally a trustworthy platform for spa bookings in Delhi NCR. Highly recommend!", rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 green-gradient opacity-[0.03]" />
        <div className="section-container py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <MapPin size={14} />
              Exclusively for Delhi NCR
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
              Book a <span className="text-primary">Premium Spa</span> Near You
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover and book the best spa experiences across Delhi, Noida, and Gurgaon. Relax, rejuvenate, repeat.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by area or service..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Link to={`/spas${searchQuery ? `?q=${searchQuery}` : ""}`}>
                <Button size="lg" className="h-12 px-8 w-full sm:w-auto">Search Spas</Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Hauz Khas", "Connaught Place", "Saket", "Noida", "Gurgaon"].map(area => (
                <Link
                  key={area}
                  to={`/spas?area=${area}`}
                  className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full hover:bg-primary-light hover:text-primary transition-colors"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Carousel */}
      <section className="py-16">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Popular Categories</h2>
            <p className="text-muted-foreground mt-2">Book the Best Spas in Delhi NCR</p>
          </div>
          <div className="relative">
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft size={20} className="text-primary" />
            </button>
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.name}
                  to={`/spas?service=${cat.name}`}
                  className="flex-shrink-0 w-[280px] h-[320px] rounded-2xl overflow-hidden relative group cursor-pointer"
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-5 left-5 text-lg font-bold text-white">{cat.name}</h3>
                </Link>
              ))}
            </div>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Spas */}
      <section className="py-16 bg-muted/50">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Spas</h2>
              <p className="text-muted-foreground mt-1">Top-rated spas handpicked for you</p>
            </div>
            <Link to="/spas">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                View All <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpas.map(spa => (
              <SpaCard key={spa.id} spa={spa} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/spas">
              <Button variant="outline">View All Spas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Spas by City */}
      <section className="py-16 bg-primary-light">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Explore Spas by City</h2>
            <p className="text-muted-foreground mt-2">Discover the best spa experiences in Delhi NCR</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Info Card */}
            <div className="bg-background rounded-2xl p-8 flex flex-col justify-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">Book the Best Spa in Delhi NCR</h3>
              <p className="text-sm text-muted-foreground mb-2">Discover top-rated spa therapies across Delhi, Noida, and Gurgaon.</p>
              <p className="text-sm text-muted-foreground mb-6">Relax, refresh, and book your next spa session instantly with SpaZen.</p>
              <Link to="/spas">
                <Button className="w-fit">Explore Spas Near You</Button>
              </Link>
            </div>
            {/* City Cards */}
            {CITIES.map(city => (
              <Link
                key={city.name}
                to={`/spas?city=${city.name}`}
                className="rounded-2xl overflow-hidden relative h-[280px] group cursor-pointer"
              >
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-lg font-bold text-white">Book massage in {city.name}</h3>
                  <p className="text-sm text-primary font-medium">{city.spas} Spas Available</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-2">Book your spa session in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <div key={i} className="text-center animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                  <step.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SpaZen */}
      <section className="py-16 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Why Choose SpaZen?</h2>
            <p className="text-muted-foreground mt-2">Experience hassle-free spa booking with our trusted platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="bg-background rounded-2xl p-8 text-center border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          {/* USP - Data Privacy */}
          <div className="mt-10 bg-background rounded-2xl border border-border p-6 md:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
            <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2 justify-center">
              <Shield size={20} className="text-primary" />
              Your Data is Safe with SpaZen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary-light">
                <Lock size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">No Data Leak</p>
                  <p className="text-xs text-muted-foreground mt-1">Your personal details are encrypted and never shared with third parties.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary-light">
                <Eye size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">100% Privacy</p>
                  <p className="text-xs text-muted-foreground mt-1">Your contact info is only shared with confirmed bookings. No spam, ever.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary-light">
                <Shield size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Secure Payments</p>
                  <p className="text-xs text-muted-foreground mt-1">All transactions processed via Razorpay with bank-grade encryption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary-light">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-background rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className={j < t.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-xs font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="section-container">
          <div className="green-gradient rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Own a Spa in Delhi NCR?</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              List your spa on SpaZen and reach thousands of customers. Join our growing network today.
            </p>
            <Link to="/vendor/register">
              <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90 font-semibold">
                Register Your Spa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default HomePage;
