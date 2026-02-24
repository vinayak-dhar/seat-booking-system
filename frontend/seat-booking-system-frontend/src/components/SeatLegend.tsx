const legendItems = [
  { color: "bg-seat-designated", label: "Designated" },
  { color: "bg-seat-floater", label: "Floater" },
  { color: "bg-seat-booked", label: "Booked" },
  { color: "bg-seat-released", label: "Released" },
  { color: "bg-seat-available", label: "Available" },
];

const SeatLegend = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded-sm ${item.color}`} />
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;
