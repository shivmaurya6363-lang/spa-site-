import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Clock, Shield, ChevronRight, ChevronLeft, CheckCircle, DollarSign, Lock, Eye, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpaCard from "@/components/SpaCard";
import BookingModal from "@/components/BookingModal";
import { MOCK_SPAS } from "@/data/mockData";

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
      carouselRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  const howItWorks = [
    { icon: Search, title: "Search", description: "Find spas near you in Delhi NCR by area or service", step: "01" },
    { icon: Star, title: "Choose", description: "Compare ratings, prices, and services to pick the perfect spa", step: "02" },
    { icon: Clock, title: "Book", description: "Select your date, time, and pay securely online", step: "03" },
    { icon: Shield, title: "Relax", description: "Show up and enjoy your spa session. It's that simple!", step: "04" },
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

      {/* Hero — gradient bg with pattern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary-light to-background">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary/8 blur-2xl" />
        
        <div className="section-container py-20 md:py-28 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-5 py-2 rounded-full mb-6 border border-primary/20 backdrop-blur-sm">
              <Sparkles size={14} />
              Exclusively for Delhi NCR
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-5 tracking-tight">
              Book a <span className="text-primary relative">Premium Spa
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.3"/></svg>
              </span><br />Near You
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
              Discover and book the best spa experiences across Delhi, Noida & Gurgaon. Relax, rejuvenate, repeat.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-background/80 backdrop-blur-sm p-2 rounded-2xl border border-border shadow-lg">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by area or service..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 border-0 bg-transparent shadow-none focus-visible:ring-0 text-base"
                />
              </div>
              <Link to={`/spas${searchQuery ? `?q=${searchQuery}` : ""}`}>
                <Button size="lg" className="h-12 px-8 w-full sm:w-auto rounded-xl text-base font-semibold">
                  Search Spas
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {["Hauz Khas", "Connaught Place", "Saket", "Noida", "Gurgaon"].map(area => (
                <Link
                  key={area}
                  to={`/spas?area=${area}`}
                  className="text-xs font-medium bg-background/60 backdrop-blur-sm text-muted-foreground px-4 py-2 rounded-full border border-border/50 hover:border-primary hover:text-primary hover:bg-primary-light transition-all duration-200"
                >
                  <MapPin size={10} className="inline mr-1" />{area}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Carousel */}
      <section className="py-14 md:py-20">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Categories</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Popular Services</h2>
            </div>
            <div className="hidden sm:flex gap-2">
              <button onClick={() => scrollCarousel("left")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scrollCarousel("right")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={`/spas?service=${cat.name}`}
                className="flex-shrink-0 w-[220px] md:w-[260px] rounded-2xl overflow-hidden relative group cursor-pointer aspect-[3/4]"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-base font-bold text-white">{cat.name}</h3>
                  <p className="text-xs text-white/70 mt-0.5 flex items-center gap-1 group-hover:text-primary transition-colors">
                    Explore <ArrowRight size={12} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spas */}
      <section className="py-14 md:py-20 bg-muted/40">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Handpicked</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Spas</h2>
            </div>
            <Link to="/spas">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-1 rounded-full">
                View All <ChevronRight size={14} />
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
              <Button variant="outline" className="rounded-full">View All Spas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 md:py-20">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Simple Process</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative text-center p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                  STEP {step.step}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4 mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <step.icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-bold text-foreground mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by City */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-primary-light/50 to-primary-light">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Locations</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Explore Spas by City</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {/* Info Card */}
            <div className="bg-background rounded-2xl p-7 flex flex-col justify-center border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-xl font-bold text-primary mb-3 leading-tight">Book the Best Spa in Delhi NCR</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">Discover top-rated spa therapies. Relax, refresh, and book instantly with SpaZen.</p>
              <Link to="/spas">
                <Button className="w-full rounded-xl">Explore Spas <ArrowRight size={16} className="ml-1" /></Button>
              </Link>
            </div>
            {/* City Cards */}
            {CITIES.map(city => (
              <Link
                key={city.name}
                to={`/spas?city=${city.name}`}
                className="rounded-2xl overflow-hidden relative h-[240px] lg:h-auto group"
              >
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full w-fit mb-2 uppercase tracking-wider">
                    {city.spas} Spas
                  </div>
                  <h3 className="text-base font-bold text-white">Book massage in {city.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose + USP */}
      <section className="py-14 md:py-20">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Trust & Safety</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why Choose SpaZen?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {whyChoose.map((item, i) => (
              <div key={i} className="bg-background rounded-2xl p-7 text-center border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 group" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* USP Strip */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary-light via-background to-primary-light p-6 md:p-8">
            <div className="flex items-center gap-2 justify-center mb-5">
              <Shield size={20} className="text-primary" />
              <h3 className="font-bold text-foreground text-lg">Your Data is Safe with SpaZen</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">No Data Leak</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Your personal details are encrypted & never shared.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">100% Privacy</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Contact shared only for confirmed bookings. No spam.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Secure Payments</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Razorpay powered with bank-grade encryption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 md:py-20 bg-muted/40">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Reviews</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-background rounded-2xl p-6 border border-border hover:shadow-md transition-shadow" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className={j < t.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default HomePage;
