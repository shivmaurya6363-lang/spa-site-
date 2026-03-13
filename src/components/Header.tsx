import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, hasRole, signOut } = useAuth();

  const getDashboardLink = () => {
    if (hasRole("admin")) return "/admin";
    if (hasRole("vendor")) return "/vendor/dashboard";
    if (user) return "/dashboard";
    return "/login";
  };

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-primary/10">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-2xl font-heading font-semibold tracking-wide">
              <span className="text-primary">Spa</span><span className="text-foreground italic">Zen</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: "/", label: "Home" },
              { to: "/spas", label: "Explore" },
              { to: "/my-bookings", label: "My Bookings" },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs font-medium text-muted-foreground hover:text-primary uppercase tracking-[0.12em] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to={getDashboardLink()}>
                  <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" className="text-xs uppercase tracking-wider">
                  Login
                </Button>
              </Link>
            )}
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
              <Link to="/" className="text-xs font-medium text-muted-foreground hover:text-primary uppercase tracking-wider px-2 py-1.5" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/spas" className="text-xs font-medium text-muted-foreground hover:text-primary uppercase tracking-wider px-2 py-1.5" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
              <Link to="/my-bookings" className="text-xs font-medium text-muted-foreground hover:text-primary uppercase tracking-wider px-2 py-1.5" onClick={() => setMobileMenuOpen(false)}>My Bookings</Link>
              <div className="flex gap-2 pt-2">
                {user ? (
                  <>
                    <Link to={getDashboardLink()} className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full text-xs uppercase tracking-wider">Dashboard</Button>
                    </Link>
                    <Button size="sm" variant="outline" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full text-xs uppercase tracking-wider">Login</Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
