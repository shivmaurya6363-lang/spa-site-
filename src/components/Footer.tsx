import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">SpaZen</span>
            </div>
            <p className="text-sm text-background/60">
              Delhi NCR's premium spa booking platform. Discover, book, and relax.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/spas" className="text-sm text-background/60 hover:text-background transition-colors">Explore Spas</Link>
              <Link to="/my-bookings" className="text-sm text-background/60 hover:text-background transition-colors">My Bookings</Link>
              <Link to="/vendor/register" className="text-sm text-background/60 hover:text-background transition-colors">List Your Spa</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Popular Areas</h4>
            <div className="flex flex-col gap-2">
              {["Connaught Place", "Hauz Khas", "Saket", "Gurgaon", "Noida"].map(area => (
                <Link key={area} to={`/spas?area=${area}`} className="text-sm text-background/60 hover:text-background transition-colors">
                  {area}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-background/60">
              <div className="flex items-center gap-2"><Phone size={14} /> +91 98765 00000</div>
              <div className="flex items-center gap-2"><Mail size={14} /> hello@spazen.in</div>
              <div className="flex items-center gap-2"><MapPin size={14} /> Delhi NCR, India</div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/40">
          © 2024 SpaZen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
