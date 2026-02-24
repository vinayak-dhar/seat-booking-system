import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, AlertTriangle, Info } from "lucide-react";
import { format, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import SeatGrid from "@/components/SeatGrid";
import SeatLegend from "@/components/SeatLegend";
import AppLayout from "@/components/AppLayout";
import { useToast } from "@/hooks/use-toast";

export type SeatStatus = "designated" | "floater" | "booked" | "released" | "available";

export interface Seat {
  id: string;
  label: string;
  status: SeatStatus;
}

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  // 40 designated seats
  for (let i = 1; i <= 40; i++) {
    const statuses: SeatStatus[] = ["designated", "booked", "released"];
    const status = i % 7 === 0 ? "booked" : i % 9 === 0 ? "released" : "designated";
    seats.push({ id: `d-${i}`, label: `D-${String(i).padStart(2, "0")}`, status });
  }
  // 10 floater seats
  for (let i = 1; i <= 10; i++) {
    const status: SeatStatus = i % 4 === 0 ? "booked" : i % 5 === 0 ? "available" : "floater";
    seats.push({ id: `f-${i}`, label: `F-${String(i).padStart(2, "0")}`, status });
  }
  return seats;
};

const SeatBooking = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [seats] = useState<Seat[]>(generateSeats);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { toast } = useToast();

  const isPastDate = date ? isBefore(startOfDay(date), startOfDay(new Date())) : false;
  const isNonDesignatedDay = false; // mock

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return;
    if (isPastDate) {
      toast({ title: "Cannot book", description: "You cannot book a seat for a past date.", variant: "destructive" });
      return;
    }
    setSelectedSeat(seat);
    setShowConfirm(true);
  };

  const handleConfirmBooking = () => {
    toast({ title: "Seat booked!", description: `You've booked seat ${selectedSeat?.label} for ${date ? format(date, "PPP") : "today"}.` });
    setShowConfirm(false);
    setSelectedSeat(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Book a Seat</h1>
          <p className="text-muted-foreground mt-1">Select a date and pick your seat</p>
        </div>

        {/* Date selector + warnings */}
        <div className="flex flex-wrap items-start gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  if (d && isBefore(startOfDay(d), startOfDay(new Date()))) {
                    setShowWarning(false);
                  }
                }}
                disabled={(d) => isBefore(startOfDay(d), startOfDay(new Date()))}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <SeatLegend />
        </div>

        {isNonDesignatedDay && (
          <Alert className="border-warning/40 bg-warning/5">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-sm">
              You can book for this day only after 3 PM on the previous working day.
            </AlertDescription>
          </Alert>
        )}

        {isPastDate && (
          <Alert className="border-destructive/40 bg-destructive/5">
            <Info className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-sm">
              Cannot book seats for past dates.
            </AlertDescription>
          </Alert>
        )}

        {/* Seat Grid */}
        <Card className="card-shadow border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              Office Floor Plan
              <Badge variant="secondary" className="font-normal text-xs">50 seats</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SeatGrid seats={seats} onSeatClick={handleSeatClick} />
          </CardContent>
        </Card>

        {/* Booking Confirmation Modal */}
        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogDescription>You're about to book a seat.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Seat</span>
                <span className="font-medium text-foreground">{selectedSeat?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">{date ? format(date, "PPP") : "—"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <Badge variant="outline" className="capitalize">{selectedSeat?.status}</Badge>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default SeatBooking;
