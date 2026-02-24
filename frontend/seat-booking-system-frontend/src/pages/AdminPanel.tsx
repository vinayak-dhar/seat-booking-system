import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, Armchair, BarChart3, Search, Edit } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useToast } from "@/hooks/use-toast";

interface UserEntry {
  id: number;
  name: string;
  email: string;
  squad: string;
  batch: string;
  seat: string;
}

const mockUsers: UserEntry[] = [
  { id: 1, name: "Alex Johnson", email: "alex@company.com", squad: "Squad 3", batch: "Batch 1", seat: "D-12" },
  { id: 2, name: "Maria Garcia", email: "maria@company.com", squad: "Squad 1", batch: "Batch 2", seat: "D-05" },
  { id: 3, name: "James Lee", email: "james@company.com", squad: "Squad 5", batch: "Batch 1", seat: "D-22" },
  { id: 4, name: "Sarah Chen", email: "sarah@company.com", squad: "Squad 2", batch: "Batch 2", seat: "D-31" },
  { id: 5, name: "Robert Kim", email: "robert@company.com", squad: "Squad 7", batch: "Batch 1", seat: "D-08" },
  { id: 6, name: "Emma Wilson", email: "emma@company.com", squad: "Squad 4", batch: "Batch 2", seat: "F-03" },
  { id: 7, name: "David Park", email: "david@company.com", squad: "Squad 6", batch: "Batch 1", seat: "D-19" },
  { id: 8, name: "Lisa Wang", email: "lisa@company.com", squad: "Squad 8", batch: "Batch 2", seat: "D-35" },
];

const AdminPanel = () => {
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<UserEntry | null>(null);
  const [editBatch, setEditBatch] = useState("");
  const [editSeat, setEditSeat] = useState("");
  const { toast } = useToast();

  const filtered = mockUsers.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const occupancyData = [
    { day: "Mon", seats: 42 },
    { day: "Tue", seats: 38 },
    { day: "Wed", seats: 45 },
    { day: "Thu", seats: 35 },
    { day: "Fri", seats: 28 },
  ];

  const handleSave = () => {
    toast({ title: "User updated", description: `${editUser?.name}'s details have been saved.` });
    setEditUser(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Manage users, seats, and view utilization</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="card-shadow border-border/60">
            <CardContent className="pt-5 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Users</p>
                <p className="text-xl font-bold text-foreground">{mockUsers.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow border-border/60">
            <CardContent className="pt-5 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Armchair className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Seats</p>
                <p className="text-xl font-bold text-foreground">50</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow border-border/60">
            <CardContent className="pt-5 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Avg. Occupancy</p>
                <p className="text-xl font-bold text-foreground">76%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Occupancy chart (simple bar) */}
        <Card className="card-shadow border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Weekly Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-40">
              {occupancyData.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-foreground">{d.seats}</span>
                  <div
                    className="w-full rounded-t-md bg-primary/80 transition-all duration-300"
                    style={{ height: `${(d.seats / 50) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Table */}
        <Card className="card-shadow border-border/60">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">All Users</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9 h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Squad</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Seat</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell><Badge variant="secondary">{user.squad}</Badge></TableCell>
                    <TableCell><Badge variant="outline">{user.batch}</Badge></TableCell>
                    <TableCell className="font-mono text-sm">{user.seat}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditUser(user);
                          setEditBatch(user.batch);
                          setEditSeat(user.seat);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update batch and seat assignment for {editUser?.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Batch</Label>
                <Select value={editBatch} onValueChange={setEditBatch}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Batch 1">Batch 1</SelectItem>
                    <SelectItem value="Batch 2">Batch 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Designated Seat</Label>
                <Input value={editSeat} onChange={(e) => setEditSeat(e.target.value)} placeholder="e.g., D-12" />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setEditUser(null)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default AdminPanel;
