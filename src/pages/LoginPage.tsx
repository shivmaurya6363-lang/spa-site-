import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl green-gradient flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-sm mt-1">Login with your phone number</p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input id="phone" placeholder="Enter 10-digit number" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1.5" />
              </div>

              {otpSent && (
                <div className="animate-fade-in">
                  <Label htmlFor="otp" className="text-sm font-medium">Enter OTP</Label>
                  <Input id="otp" placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} className="mt-1.5" maxLength={6} />
                </div>
              )}

              <Button className="w-full" onClick={() => setOtpSent(true)}>
                {otpSent ? "Verify & Login" : "Send OTP"}
              </Button>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
