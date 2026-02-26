import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const dateStr = (location.state as any)?.date;
  const selectedDate = dateStr ? new Date(dateStr) : null;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", notes: "" });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.service) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("book-appointment", {
        body: {
          full_name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.service,
          appointment_date: selectedDate!.toISOString().split("T")[0],
          appointment_time: "10:30 AM",
          notes: form.notes.trim() || null,
        },
      });

      if (error) throw error;

      if (!data?.success) {
        toast({ title: "Booking failed", description: data?.message || "Unable to process appointment", variant: "destructive" });
        setLoading(false);
        return;
      }

      navigate("/confirmation", { state: { date: dateStr, name: form.name } });
    } catch (err) {
      console.error("Booking error:", err);
      toast({ title: "Error", description: "Unable to process your appointment. Please try again.", variant: "destructive" });
      setLoading(false);
    }
  };

  if (!selectedDate) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No date selected. Please start from the booking page.</p>
            <Button asChild className="rounded-full"><Link to="/book-appointment">Select a Date</Link></Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto max-w-2xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Progress */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">✓</span>
                <span className="text-sm text-muted-foreground">Select Date</span>
              </div>
              <div className="h-px w-10 bg-primary" />
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">2</span>
                <span className="text-sm font-medium text-foreground">Your Details</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Complete Your Appointment Request</h1>
            </div>

            {/* Date display */}
            <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-5 mb-6 flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Selected Date</p>
                  <p className="font-semibold text-foreground">
                    {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Selected Time</p>
                  <p className="font-semibold text-foreground">10:30 AM</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-6 md:p-8 space-y-5 mb-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="John Smith" value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} className="rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} className="rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="(512) 555-0147" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={20} className="rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label>Select Service *</Label>
                <Select value={form.service} onValueChange={(v) => update("service", v)}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whitening">Teeth Whitening</SelectItem>
                    <SelectItem value="implants">Dental Implants</SelectItem>
                    <SelectItem value="rootcanal">Root Canal Treatment</SelectItem>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic Dentistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any special requirements or concerns..." value={form.notes} onChange={(e) => update("notes", e.target.value)} maxLength={1000} className="rounded-lg" rows={3} />
              </div>

              <Button type="submit" disabled={loading} className="w-full rounded-full" size="lg">
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Confirm Appointment"}
              </Button>
            </form>

            <div className="flex justify-start">
              <Button variant="outline" asChild className="rounded-full">
                <Link to="/book-appointment"><ChevronLeft className="mr-1 h-4 w-4" /> Back</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AppointmentDetails;
