import { Link } from "react-router-dom";
import { Search, MapPin, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg green-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Spa<span className="text-primary">Zen</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/spas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Explore Spas
            </Link>
            <Link to="/my-bookings" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              My Bookings
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/vendor/register">
              <Button variant="outline" size="sm">List Your Spa</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-1" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/spas" className="text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-1" onClick={() => setMobileMenuOpen(false)}>Explore Spas</Link>
              <Link to="/my-bookings" className="text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-1" onClick={() => setMobileMenuOpen(false)}>My Bookings</Link>
              <div className="flex gap-2 pt-2">
                <Link to="/vendor/register" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">List Your Spa</Button>
                </Link>
                <Link to="/login" className="flex-1">
                  <Button size="sm" className="w-full">Login</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
