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
import { DELHI_NCR_AREAS, SERVICE_TYPES } from "@/data/mockData";

const VendorRegisterPage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
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
              <Label className="text-sm font-medium">Google Maps Link *</Label>
              <Input placeholder="Paste Google Maps link" className="mt-1.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Opening Time *</Label>
              <Input type="time" defaultValue="11:00" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm font-medium">Closing Time *</Label>
              <Input type="time" defaultValue="22:00" className="mt-1.5" />
            </div>
          </div>

          {/* Services */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Services Offered *</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SERVICE_TYPES.map(service => (
                <label
                  key={service}
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
              ))}
            </div>
          </div>

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
              <Label className="text-sm font-medium">GST Number (optional)</Label>
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
