import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/10">
      <div className="section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <span className="text-2xl font-heading font-semibold tracking-wide">
              <span className="text-primary">Spa</span><span className="text-foreground italic">Zen</span>
            </span>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Delhi NCR's luxury spa booking platform. Discover, book, and experience premium wellness.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-primary mb-5">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/spas" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explore Spas</Link>
              <Link to="/my-bookings" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Bookings</Link>
              <Link to="/vendor/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">List Your Spa</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-primary mb-5">Popular Areas</h4>
            <div className="flex flex-col gap-3">
              {["Connaught Place", "Hauz Khas", "Saket", "Gurgaon", "Noida"].map(area => (
                <Link key={area} to={`/spas?area=${area}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {area}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-primary mb-5">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5"><Phone size={14} className="text-primary/60" /> +91 98765 00000</div>
              <div className="flex items-center gap-2.5"><Mail size={14} className="text-primary/60" /> hello@spazen.in</div>
              <div className="flex items-center gap-2.5"><MapPin size={14} className="text-primary/60" /> Delhi NCR, India</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60 tracking-wider uppercase">
            © 2024 SpaZen. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer uppercase tracking-wider">Privacy</span>
            <span className="text-xs text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer uppercase tracking-wider">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
