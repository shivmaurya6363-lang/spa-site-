import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DELHI_NCR_AREAS, SERVICE_TYPES, AMENITIES, TIME_SLOTS_30MIN } from "@/data/mockData";
import { Shield, Lock, Eye } from "lucide-react";

const VendorRegisterPage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicePrices, setServicePrices] = useState<Record<string, string>>({});
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
    if (selectedServices.includes(service)) {
      setServicePrices(prev => {
        const updated = { ...prev };
        delete updated[service];
        return updated;
      });
    }
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="section-container py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Register Your Spa</h1>
          <p className="text-muted-foreground mt-2">Join SpaZen and reach thousands of customers across Delhi NCR</p>
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-5" style={{ boxShadow: "var(--shadow-card)" }}>
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Spa Name *</Label>
              <Input placeholder="Enter spa name" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm font-medium">Owner Name *</Label>
              <Input placeholder="Enter owner name" className="mt-1.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Phone Number *</Label>
              <Input placeholder="10-digit number" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm font-medium">Email Address *</Label>
              <Input type="email" placeholder="you@email.com" className="mt-1.5" />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Full Address *</Label>
            <Input placeholder="Enter full spa address" className="mt-1.5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Area *</Label>
              <Select>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select area" /></SelectTrigger>
                <SelectContent>
                  {DELHI_NCR_AREAS.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Google Maps Link <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input placeholder="Paste Google Maps link" className="mt-1.5" />
            </div>
          </div>

          {/* Timing - 30 min intervals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Opening Time *</Label>
              <Select defaultValue="11:00">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS_30MIN.map(slot => (
                    <SelectItem key={`open-${slot}`} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Closing Time *</Label>
              <Select defaultValue="22:00">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS_30MIN.map(slot => (
                    <SelectItem key={`close-${slot}`} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Services with Price */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Services Offered * <span className="text-muted-foreground font-normal text-xs">(select & set price)</span></Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICE_TYPES.map(service => (
                <div key={service} className="space-y-1.5">
                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                      selectedServices.includes(service)
                        ? "border-primary bg-primary-light text-primary"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <Checkbox
                      checked={selectedServices.includes(service)}
                      onCheckedChange={() => toggleService(service)}
                    />
                    {service}
                  </label>
                  {selectedServices.includes(service) && (
                    <div className="flex items-center gap-1.5 pl-1">
                      <span className="text-xs text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        placeholder="Price"
                        value={servicePrices[service] || ""}
                        onChange={e => setServicePrices(prev => ({ ...prev, [service]: e.target.value }))}
                        className="h-8 text-xs w-28"
                      />
                      <span className="text-xs text-muted-foreground">per session</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Amenities</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AMENITIES.map(amenity => (
                <label
                  key={amenity}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                    selectedAmenities.includes(amenity)
                      ? "border-primary bg-primary-light text-primary"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <Checkbox
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          {/* Social & Optional */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Instagram Handle</Label>
              <Input placeholder="@yourspa" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm font-medium">WhatsApp Number</Label>
              <Input placeholder="+91 XXXXX XXXXX" className="mt-1.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">GST Number <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input placeholder="Enter GST number" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm font-medium">Referral Code</Label>
              <Input placeholder="If referred by another spa" className="mt-1.5" />
            </div>
          </div>

          {/* Bank Details */}
          <div className="border-t border-border pt-5">
            <h3 className="font-semibold text-foreground text-sm mb-4">Bank Account Details (for payouts)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Account Holder Name</Label>
                <Input placeholder="Name as on bank account" className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium">Account Number</Label>
                <Input placeholder="Enter account number" className="mt-1.5" />
              </div>
            </div>
            <div className="mt-4">
              <Label className="text-sm font-medium">IFSC Code</Label>
              <Input placeholder="Enter IFSC code" className="mt-1.5" />
            </div>
          </div>

          {/* USP - Data Privacy & Security */}
          <div className="border-t border-border pt-5">
            <div className="bg-primary-light rounded-xl p-5">
              <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                <Shield size={16} className="text-primary" />
                Your Data is Safe with SpaZen
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Lock size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground"><strong className="text-foreground">No Data Leak:</strong> Your personal & bank details are encrypted and never shared with third parties.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Eye size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground"><strong className="text-foreground">Customer Privacy:</strong> Customer contact details are only shown for confirmed bookings. No spam, no misuse.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Shield size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground"><strong className="text-foreground">Secure Payments:</strong> All transactions are processed via Razorpay with bank-grade encryption.</p>
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full mt-2">Submit Registration</Button>

          <p className="text-xs text-center text-muted-foreground">
            By registering, you agree to SpaZen's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorRegisterPage;
