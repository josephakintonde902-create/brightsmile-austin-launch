import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, CalendarPlus, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Confirmation = () => {
  const location = useLocation();
  const dateStr = (location.state as any)?.date;
  const name = (location.state as any)?.name || "Patient";
  const selectedDate = dateStr ? new Date(dateStr) : null;

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "Not specified";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="container mx-auto max-w-xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-[var(--shadow-elevated)] p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <CheckCircle2 className="h-20 w-20 text-primary mx-auto" style={{ color: "#22c55e" }} />
            </motion.div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Appointment Request Received
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for choosing BrightSmile Dental Studio, {name}. Your appointment request has been securely recorded in our system.
            </p>

            <div className="bg-accent/40 rounded-xl p-6 mb-8 inline-flex flex-col gap-4 w-full max-w-sm mx-auto">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Appointment Date</p>
                  <p className="font-semibold text-foreground">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Clock className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-semibold text-foreground">10:30 AM</p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-8">
              A confirmation email has been sent to your inbox. Our team will contact you shortly to finalize your booking.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-full px-6" size="lg">
                <Link to="/"><Home className="mr-2 h-4 w-4" /> Return to Homepage</Link>
              </Button>
              <Button variant="outline" className="rounded-full px-6" size="lg">
                <CalendarPlus className="mr-2 h-4 w-4" /> Add to Calendar
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Confirmation;
