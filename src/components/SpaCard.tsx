import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Spa } from "@/data/mockData";

interface SpaCardProps {
  spa: Spa;
}

const SpaCard = ({ spa }: SpaCardProps) => {
  return (
    <div className="spa-card group">
      <div className="aspect-[4/3] bg-primary-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🧖</span>
        </div>
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 border border-primary/20">
          <Star size={12} className="fill-primary text-primary" />
          <span className="text-xs font-semibold text-foreground">{spa.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">{spa.name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin size={13} className="text-primary/50" />
          <span>{spa.area}, {spa.city}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Starting from</span>
            <p className="text-primary font-bold text-lg">₹{spa.priceFrom.toLocaleString()}</p>
          </div>
          <Link to={`/spa/${spa.id}`}>
            <Button size="sm" className="text-xs uppercase tracking-wider">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpaCard;
