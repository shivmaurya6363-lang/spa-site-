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
import { toast } from "@/hooks/use-toast";

interface FormErrors {
  spaName?: string;
  ownerName?: string;
  phone?: string;
  email?: string;
  address?: string;
  area?: string;
  services?: string;
}

const VendorRegisterPage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicePrices, setServicePrices] = useState<Record<string, string>>({});
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Form fields
  const [spaName, setSpaName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");

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

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!spaName.trim()) newErrors.spaName = "Spa name is required";
    if (!ownerName.trim()) newErrors.ownerName = "Owner name is required";
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit number";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!address.trim()) newErrors.address = "Address is required";
    if (!area) newErrors.area = "Please select an area";
    if (selectedServices.length === 0) newErrors.services = "Select at least one service";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(true);

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast({
        title: "Form incomplete",
        description: "Please fix the highlighted fields to continue.",
        variant: "destructive",
      });
      return;
    }

    // Check if all selected services have prices
    const missingPrices = selectedServices.filter(s => !servicePrices[s] || servicePrices[s] === "");
    if (missingPrices.length > 0) {
      toast({
        title: "Prices missing",
        description: `Please set price for: ${missingPrices.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Submitted! 🎉",
      description: "We'll review your details and get back to you within 24 hours.",
    });
  };

  const errorClass = "border-destructive ring-1 ring-destructive/30";
  const errorText = "text-destructive text-xs mt-1";

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
            <div data-error={!!errors.spaName}>
              <Label className={`text-sm font-medium ${errors.spaName ? "text-destructive" : ""}`}>Spa Name *</Label>
              <Input
                placeholder="Enter spa name"
                className={`mt-1.5 ${errors.spaName ? errorClass : ""}`}
                value={spaName}
                onChange={e => { setSpaName(e.target.value); if (submitted) setErrors(prev => ({ ...prev, spaName: e.target.value.trim() ? undefined : prev.spaName })); }}
              />
              {errors.spaName && <p className={errorText}>{errors.spaName}</p>}
            </div>
            <div data-error={!!errors.ownerName}>
              <Label className={`text-sm font-medium ${errors.ownerName ? "text-destructive" : ""}`}>Owner Name *</Label>
              <Input
                placeholder="Enter owner name"
                className={`mt-1.5 ${errors.ownerName ? errorClass : ""}`}
                value={ownerName}
                onChange={e => { setOwnerName(e.target.value); if (submitted) setErrors(prev => ({ ...prev, ownerName: e.target.value.trim() ? undefined : prev.ownerName })); }}
              />
              {errors.ownerName && <p className={errorText}>{errors.ownerName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div data-error={!!errors.phone}>
              <Label className={`text-sm font-medium ${errors.phone ? "text-destructive" : ""}`}>Phone Number *</Label>
              <Input
                placeholder="10-digit number"
                className={`mt-1.5 ${errors.phone ? errorClass : ""}`}
                value={phone}
                onChange={e => { setPhone(e.target.value); if (submitted) setErrors(prev => ({ ...prev, phone: /^\d{10}$/.test(e.target.value.trim()) ? undefined : prev.phone })); }}
              />
              {errors.phone && <p className={errorText}>{errors.phone}</p>}
            </div>
            <div data-error={!!errors.email}>
              <Label className={`text-sm font-medium ${errors.email ? "text-destructive" : ""}`}>Email Address *</Label>
              <Input
                type="email"
                placeholder="you@email.com"
                className={`mt-1.5 ${errors.email ? errorClass : ""}`}
                value={email}
                onChange={e => { setEmail(e.target.value); if (submitted) setErrors(prev => ({ ...prev, email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value.trim()) ? undefined : prev.email })); }}
              />
              {errors.email && <p className={errorText}>{errors.email}</p>}
            </div>
          </div>

          <div data-error={!!errors.address}>
            <Label className={`text-sm font-medium ${errors.address ? "text-destructive" : ""}`}>Full Address *</Label>
            <Input
              placeholder="Enter full spa address"
              className={`mt-1.5 ${errors.address ? errorClass : ""}`}
              value={address}
              onChange={e => { setAddress(e.target.value); if (submitted) setErrors(prev => ({ ...prev, address: e.target.value.trim() ? undefined : prev.address })); }}
            />
            {errors.address && <p className={errorText}>{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div data-error={!!errors.area}>
              <Label className={`text-sm font-medium ${errors.area ? "text-destructive" : ""}`}>Area *</Label>
              <Select value={area} onValueChange={val => { setArea(val); if (submitted) setErrors(prev => ({ ...prev, area: undefined })); }}>
                <SelectTrigger className={`mt-1.5 ${errors.area ? errorClass : ""}`}><SelectValue placeholder="Select area" /></SelectTrigger>
                <SelectContent>
                  {DELHI_NCR_AREAS.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.area && <p className={errorText}>{errors.area}</p>}
            </div>
            <div>
              <Label className="text-sm font-medium">Google Maps Link <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input placeholder="Paste Google Maps link" className="mt-1.5" />
            </div>
          </div>

          {/* Timing */}
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
          <div data-error={!!errors.services}>
            <Label className={`text-sm font-medium mb-3 block ${errors.services ? "text-destructive" : ""}`}>
              Services Offered * <span className="text-muted-foreground font-normal text-xs">(select & set price)</span>
            </Label>
            {errors.services && <p className={`${errorText} mb-2`}>{errors.services}</p>}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${errors.services ? "rounded-lg border border-destructive/30 p-3" : ""}`}>
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
                      onCheckedChange={() => { toggleService(service); if (submitted) setErrors(prev => ({ ...prev, services: undefined })); }}
                    />
                    {service}
                  </label>
                  {selectedServices.includes(service) && (
                    <div className="flex items-center gap-2 pl-1 flex-wrap">
                      <span className="text-xs text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        placeholder="Price"
                        value={servicePrices[service] || ""}
                        onChange={e => setServicePrices(prev => ({ ...prev, [service]: e.target.value }))}
                        className="h-8 text-xs w-24"
                      />
                      <Select defaultValue="60">
                        <SelectTrigger className="h-8 text-xs w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 min</SelectItem>
                          <SelectItem value="45">45 min</SelectItem>
                          <SelectItem value="60">60 min</SelectItem>
                          <SelectItem value="75">75 min</SelectItem>
                          <SelectItem value="90">90 min</SelectItem>
                          <SelectItem value="120">120 min</SelectItem>
                        </SelectContent>
                      </Select>
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

          <Button size="lg" className="w-full mt-2" onClick={handleSubmit}>Submit Registration</Button>

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
