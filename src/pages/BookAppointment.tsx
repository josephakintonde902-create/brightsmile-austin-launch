import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const navigate = useNavigate();

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleContinue = () => {
    if (selectedDate) {
      navigate("/appointment-details", { state: { date: selectedDate.toISOString() } });
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">1</span>
                <span className="text-sm font-medium text-foreground">Select Date</span>
              </div>
              <div className="h-px w-10 bg-border" />
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-semibold">2</span>
                <span className="text-sm text-muted-foreground">Your Details</span>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                Schedule Your Appointment
              </h1>
              <p className="text-muted-foreground text-lg">
                Choose a convenient date to begin your journey to a healthier smile.
              </p>
            </div>

            {/* Calendar Card */}
            <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-6 md:p-8 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                <CalendarIcon className="h-4 w-4" />
                <span>Appointments available Monday–Friday, 9am–5pm</span>
              </div>

              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || !isWeekday(date);
                  }}
                  className="p-3 pointer-events-auto"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-base font-semibold",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-input hover:bg-accent",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-10 font-normal text-sm",
                    row: "flex w-full mt-2",
                    cell: "h-10 w-10 text-center text-sm p-0 relative rounded-md focus-within:relative focus-within:z-20",
                    day: "h-10 w-10 p-0 font-normal rounded-md hover:bg-accent transition-colors aria-selected:opacity-100",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground font-semibold",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-30",
                    day_hidden: "invisible",
                  }}
                />
              </div>

              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-accent/50 text-center"
                >
                  <p className="text-sm text-muted-foreground">Selected date</p>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Button variant="outline" asChild className="rounded-full">
                <Link to="/"><ChevronLeft className="mr-1 h-4 w-4" /> Back to Home</Link>
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!selectedDate}
                className="rounded-full px-8"
                size="lg"
              >
                Continue to Details
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookAppointment;
