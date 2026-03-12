import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpaCard from "@/components/SpaCard";
import { MOCK_SPAS, DELHI_NCR_AREAS, SERVICE_TYPES } from "@/data/mockData";

const SpaListingPage = () => {
  const [searchParams] = useSearchParams();
  const initialArea = searchParams.get("area") || "";
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [areaFilter, setAreaFilter] = useState(initialArea);
  const [serviceFilter, setServiceFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredSpas = useMemo(() => {
    return MOCK_SPAS.filter(spa => {
      if (search && !spa.name.toLowerCase().includes(search.toLowerCase()) && !spa.area.toLowerCase().includes(search.toLowerCase())) return false;
      if (areaFilter && spa.area !== areaFilter) return false;
      if (serviceFilter && !spa.services.some(s => s.name === serviceFilter)) return false;
      if (priceFilter) {
        const [min, max] = priceFilter.split("-").map(Number);
        if (max && (spa.priceFrom < min || spa.priceFrom > max)) return false;
        if (!max && spa.priceFrom < min) return false;
      }
      return true;
    });
  }, [search, areaFilter, serviceFilter, priceFilter]);

  const clearFilters = () => {
    setSearch("");
    setAreaFilter("");
    setServiceFilter("");
    setPriceFilter("");
  };

  const hasActiveFilters = search || areaFilter || serviceFilter || priceFilter;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="section-container py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Explore Spas in Delhi NCR</h1>
          <p className="text-muted-foreground mt-1">{filteredSpas.length} spas found</p>
        </div>

        {/* Search + Filter Toggle */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search spas..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <SlidersHorizontal size={16} /> Filters
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 animate-fade-in">
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger><SelectValue placeholder="All Areas" /></SelectTrigger>
              <SelectContent>
                {DELHI_NCR_AREAS.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger><SelectValue placeholder="All Services" /></SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger><SelectValue placeholder="Price Range" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1000">Under ₹1,000</SelectItem>
                <SelectItem value="1000-2000">₹1,000 – ₹2,000</SelectItem>
                <SelectItem value="2000-3000">₹2,000 – ₹3,000</SelectItem>
                <SelectItem value="3000-">₹3,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-primary hover:underline flex items-center gap-1 mb-4">
            <X size={12} /> Clear all filters
          </button>
        )}

        {/* Results */}
        {filteredSpas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpas.map(spa => (
              <SpaCard key={spa.id} spa={spa} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-semibold text-foreground mb-2">No spas found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SpaListingPage;
