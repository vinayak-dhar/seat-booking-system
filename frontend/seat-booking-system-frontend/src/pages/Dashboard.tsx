import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Armchair, CalendarDays, LogOut, LayoutGrid, Users, ArrowRight } from "lucide-react";
import BatchIndicator from "@/components/BatchIndicator";
import AppLayout from "@/components/AppLayout";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const user = {
    name: "Alex Johnson",
    squad: "Squad 3",
    batch: "Batch 1",
    designatedSeat: "D-12",
  };

  const isDesignatedDay = true; // mock

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name} 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your workspace overview for today</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-shadow border-border/60">
            <CardContent className="pt-5 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Squad</p>
                <p className="text-sm font-semibold text-foreground">{user.squad}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow border-border/60">
            <CardContent className="pt-5 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Batch</p>
                <p className="text-sm font-semibold text-foreground">{user.batch}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow border-border/60">
            <CardContent className="pt-5 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Armchair className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Designated Seat</p>
                <p className="text-sm font-semibold text-foreground">{user.designatedSeat}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow border-border/60">
            <CardContent className="pt-5 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Leave Status</p>
                <Badge variant="outline" className="text-xs mt-0.5">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="card-shadow border-border/60 lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upcoming Design Days</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md pointer-events-auto"
              />
            </CardContent>
          </Card>

          {/* Actions & Batch */}
          <div className="space-y-4">
            <Card className="card-shadow border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-between" onClick={() => navigate("/booking")}>
                  Book a Seat <ArrowRight className="w-4 h-4" />
                </Button>
                {isDesignatedDay && (
                  <Button variant="outline" className="w-full justify-between text-destructive hover:text-destructive">
                    Release My Seat <LogOut className="w-4 h-4" />
                  </Button>
                )}
              </CardContent>
            </Card>

            <BatchIndicator currentBatch="Batch 1" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
