import { useState } from "react";
import { X, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Spa, SpaService } from "@/data/mockData";
import { MOCK_SPAS } from "@/data/mockData";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSpa?: Spa;
}

const BookingModal = ({ isOpen, onClose, preselectedSpa }: BookingModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSpaId, setSelectedSpaId] = useState(preselectedSpa?.id || "");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [paymentType, setPaymentType] = useState<"full" | "token">("full");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Update selectedSpaId when preselectedSpa changes
  useState(() => {
    if (preselectedSpa) {
      setSelectedSpaId(preselectedSpa.id);
      setSelectedServiceId("");
    }
  });

  const selectedSpa = preselectedSpa || MOCK_SPAS.find(s => s.id === selectedSpaId);
  const selectedService = selectedSpa?.services.find(s => s.id === selectedServiceId);
  const totalAmount = selectedService?.price || 0;
  const tokenAmount = 199;

  const generateTimeSlots = () => {
    if (!selectedSpa) return [];
    const [openH] = selectedSpa.openingTime.split(":").map(Number);
    const [closeH] = selectedSpa.closingTime.split(":").map(Number);
    const slots: string[] = [];
    for (let h = openH; h < closeH; h++) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
      slots.push(`${String(h).padStart(2, "0")}:30`);
    }
    return slots;
  };

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div
        className="bg-background rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Book Your Spa Session</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
            <Input id="name" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} className="mt-1.5" />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
            <Input id="phone" placeholder="Enter 10-digit phone number" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1.5" />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
          </div>

          {/* Select Spa */}
          {!preselectedSpa ? (
            <div>
              <Label className="text-sm font-medium">Select Spa *</Label>
              <Select value={selectedSpaId} onValueChange={(v) => { setSelectedSpaId(v); setSelectedServiceId(""); }}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Choose a spa" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_SPAS.map(spa => (
                    <SelectItem key={spa.id} value={spa.id}>{spa.name} — {spa.area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div>
              <Label className="text-sm font-medium">Spa</Label>
              <div className="mt-1.5 px-3 py-2.5 rounded-md border border-border bg-muted text-sm text-foreground">
                {preselectedSpa.name} — {preselectedSpa.area}
              </div>
            </div>
          )}

          {/* Select Service */}
          {selectedSpa && (
            <div>
              <Label className="text-sm font-medium">Select Service *</Label>
              <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSpa.services.filter(s => s.isActive).map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} – ₹{service.price.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date" className="text-sm font-medium">Date *</Label>
              <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm font-medium">Time *</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {generateTimeSlots().map(slot => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Coupon */}
          <div>
            <Label htmlFor="coupon" className="text-sm font-medium">Coupon Code</Label>
            <div className="flex gap-2 mt-1.5">
              <Input id="coupon" placeholder="Enter coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} className="flex-1" />
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary-light">Apply</Button>
            </div>
          </div>

          {/* Payment Options */}
          {totalAmount > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Payment Options</Label>
              
              <div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentType === "full" ? "border-primary bg-primary-light" : "border-border hover:border-primary/30"}`}
                onClick={() => setPaymentType("full")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === "full" ? "border-primary" : "border-muted-foreground/40"}`}>
                    {paymentType === "full" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">Pay Full Amount — ₹{totalAmount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">One-time payment</p>
                  </div>
                  <CheckCircle2 size={18} className={paymentType === "full" ? "text-primary" : "text-transparent"} />
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentType === "token" ? "border-primary bg-primary-light" : "border-border hover:border-primary/30"}`}
                onClick={() => setPaymentType("token")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === "token" ? "border-primary" : "border-muted-foreground/40"}`}>
                    {paymentType === "token" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">Book Now – Pay ₹199 Only</p>
                    <p className="text-xs text-muted-foreground">Pay remaining ₹{(totalAmount - tokenAmount).toLocaleString()} at the spa</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Summary */}
          {totalAmount > 0 && (
            <div className="bg-muted rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Price</span>
                <span className="text-foreground">₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-foreground">₹0</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="text-foreground">Total Amount</span>
                <span className="text-success text-lg">
                  ₹{(paymentType === "full" ? totalAmount : tokenAmount).toLocaleString()}
                </span>
              </div>
              {paymentType === "token" && (
                <p className="text-xs text-muted-foreground">+ ₹{(totalAmount - tokenAmount).toLocaleString()} to be paid at the spa</p>
              )}
            </div>
          )}

          {/* Terms */}
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(c) => setTermsAccepted(c === true)}
              className="mt-0.5"
            />
            <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              I accept the Terms & Conditions *
            </Label>
          </div>

          {/* Footer note */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock size={12} />
            <span>Secure payment powered by Razorpay. Your payment information is encrypted and secure.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 p-5 border-t border-border">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button
            className="flex-1"
            disabled={!name || !phone || !selectedSpaId || !selectedServiceId || !date || !time || !termsAccepted}
          >
            Pay ₹{(paymentType === "full" ? totalAmount : tokenAmount).toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
