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
  const [bookingSpa, setBookingSpa] = useState<typeof MOCK_SPAS[0] | undefined>(undefined);
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]" />
        
        <div className="section-container py-24 md:py-36 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-5 py-2 rounded-full mb-8 border border-primary/20 uppercase tracking-[0.15em]">
              <Sparkles size={12} />
              Exclusively for Delhi NCR
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.05] mb-6">
              Book a{" "}
              <span className="gold-shimmer">Luxury Spa</span>
              <br />
              <span className="italic font-light">Near You</span>
            </h1>
            <p className="text-base text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
              Discover and book premium spa experiences across Delhi, Noida & Gurgaon. Relax, rejuvenate, repeat.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-card p-2 rounded-2xl border border-border">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by area or service..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm"
                />
              </div>
              <Link to={`/spas${searchQuery ? `?q=${searchQuery}` : ""}`}>
                <Button size="lg" className="h-12 px-8 w-full sm:w-auto rounded-xl text-xs uppercase tracking-[0.12em] font-medium">
                  Search Spas
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {["Hauz Khas", "Connaught Place", "Saket", "Noida", "Gurgaon"].map(area => (
                <Link
                  key={area}
                  to={`/spas?area=${area}`}
                  className="text-[11px] font-medium text-muted-foreground px-4 py-2 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-all duration-300 uppercase tracking-wider"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Carousel */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em] mb-2">Categories</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">Popular Services</h2>
            </div>
            <div className="hidden sm:flex gap-2">
              <button onClick={() => scrollCarousel("left")} className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scrollCarousel("right")} className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
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
                className="flex-shrink-0 w-[220px] md:w-[260px] rounded-2xl overflow-hidden relative group cursor-pointer aspect-[3/4] border border-border"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-base font-heading font-semibold text-white">{cat.name}</h3>
                  <p className="text-[10px] text-primary mt-1 flex items-center gap-1 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight size={10} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-container"><div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" /></div>

      {/* Featured Spas */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em] mb-2">Handpicked</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">Featured Spas</h2>
            </div>
            <Link to="/spas">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-1 rounded-full text-xs uppercase tracking-wider border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
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
              <Button variant="outline" className="rounded-full text-xs uppercase tracking-wider border-primary/30 text-primary">View All Spas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em] mb-2">Simple Process</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative text-center p-7 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 group">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-medium gold-gradient text-primary-foreground px-4 py-1 rounded-full uppercase tracking-widest">
                  Step {step.step}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 mt-2 group-hover:bg-primary/20 transition-colors">
                  <step.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by City */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em] mb-2">Locations</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">Explore Spas by City</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="bg-card rounded-2xl p-8 flex flex-col justify-center border border-border">
              <h3 className="font-heading text-2xl font-semibold text-primary mb-3 leading-tight">Book the Best Spa in Delhi NCR</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Discover top-rated spa therapies. Relax, refresh, and book instantly.</p>
              <Link to="/spas">
                <Button className="w-full rounded-xl text-xs uppercase tracking-wider">
                  Explore Spas <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
            {CITIES.map(city => (
              <Link
                key={city.name}
                to={`/spas?city=${city.name}`}
                className="rounded-2xl overflow-hidden relative h-[260px] lg:h-auto group border border-border"
              >
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-primary text-primary-foreground text-[9px] font-medium px-3 py-1 rounded-full w-fit mb-2 uppercase tracking-[0.15em]">
                    {city.spas} Spas
                  </div>
                  <h3 className="text-base font-heading font-semibold text-white">Book massage in {city.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-container"><div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" /></div>

      {/* Why Choose + USP */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em] mb-2">Trust & Safety</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">Why Choose SpaZen?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {whyChoose.map((item, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 text-center border border-border hover:border-primary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* USP Strip */}
          <div className="rounded-3xl gold-gradient p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 justify-center mb-7">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Shield size={18} className="text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-primary-foreground text-xl">Your Data is Safe with SpaZen</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Lock, title: "No Data Leak", desc: "Your personal details are encrypted & never shared with anyone." },
                  { icon: Eye, title: "100% Privacy", desc: "Contact shared only for confirmed bookings. No spam, ever." },
                  { icon: Shield, title: "Secure Payments", desc: "Razorpay powered with bank-grade encryption." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-5 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-foreground">{item.title}</p>
                      <p className="text-xs text-primary-foreground/60 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em] mb-2">Reviews</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-2xl p-7 border border-border hover:border-primary/20 transition-all duration-300">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className={j < t.rating ? "fill-primary text-primary" : "text-border"} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed italic font-light">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
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

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default HomePage;
