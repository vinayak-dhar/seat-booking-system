import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BatchIndicatorProps {
  currentBatch: "Batch 1" | "Batch 2";
}

const schedule = {
  "Batch 1": {
    week1: ["Mon", "Tue", "Wed"],
    week2: ["Thu", "Fri"],
  },
  "Batch 2": {
    week1: ["Thu", "Fri"],
    week2: ["Mon", "Tue", "Wed"],
  },
};

const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// Mock: week 1 is current
const currentWeek = "week1";

const BatchIndicator = ({ currentBatch }: BatchIndicatorProps) => {
  const batchSchedule = schedule[currentBatch];

  return (
    <Card className="card-shadow border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          Batch Schedule
          <Badge variant="outline" className="text-xs font-normal">{currentBatch}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(["week1", "week2"] as const).map((week) => (
          <div key={week}>
            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
              {week === "week1" ? "Week 1" : "Week 2"}
              {week === currentWeek && (
                <Badge className="text-[10px] h-4 bg-primary/10 text-primary hover:bg-primary/10">Current</Badge>
              )}
            </p>
            <div className="flex gap-1.5">
              {allDays.map((day) => {
                const isActive = batchSchedule[week].includes(day);
                return (
                  <div
                    key={day}
                    className={`flex-1 text-center text-xs py-1.5 rounded-md font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BatchIndicator;
