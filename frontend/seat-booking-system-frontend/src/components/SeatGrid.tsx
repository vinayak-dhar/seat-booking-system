import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Seat, SeatStatus } from "@/pages/SeatBooking";

interface SeatGridProps {
  seats: Seat[];
  onSeatClick: (seat: Seat) => void;
}

const statusStyles: Record<SeatStatus, string> = {
  designated: "bg-seat-designated text-seat-designated-foreground hover:opacity-90",
  floater: "bg-seat-floater text-seat-floater-foreground hover:opacity-90",
  booked: "bg-seat-booked text-seat-booked-foreground cursor-not-allowed opacity-70",
  released: "bg-seat-released text-seat-released-foreground hover:opacity-90",
  available: "bg-seat-available text-seat-available-foreground hover:bg-muted",
};

const statusTooltip: Record<SeatStatus, string> = {
  designated: "Designated Seat",
  floater: "Floater Seat",
  booked: "Booked",
  released: "Released – Available to Book",
  available: "Available",
};

const SeatGrid = ({ seats, onSeatClick }: SeatGridProps) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
      {seats.map((seat) => (
        <Tooltip key={seat.id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => onSeatClick(seat)}
              disabled={seat.status === "booked"}
              className={cn(
                "relative flex items-center justify-center h-12 rounded-lg text-xs font-semibold transition-all duration-150 seat-shadow",
                "hover:seat-shadow-hover hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                statusStyles[seat.status],
                seat.status === "booked" && "hover:scale-100"
              )}
            >
              {seat.label}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            <p>{seat.label} — {statusTooltip[seat.status]}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default SeatGrid;
