import { useAppStore } from "@/stores/useAppStore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Navigation } from "lucide-react";
import { format } from "date-fns";

export default function TripsPage() {
  const { trips, drivers } = useAppStore();

  const getDriverName = (id) =>
    drivers.find((d) => d.id === id)?.name || "Unknown";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Trips</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Trip
        </Button>
      </div>

      <div className="border rounded-xl bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trip ID</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Stops</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Started</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No active trips.
                </TableCell>
              </TableRow>
            ) : (
              trips.map((trip) => (
                <TableRow
                  key={trip.id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{trip.id}</TableCell>
                  <TableCell>{getDriverName(trip.driverId)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      <Navigation className="h-3 w-3" />
                      {trip.stops.length} Stops
                    </Badge>
                  </TableCell>
                  <TableCell>{trip.totalDistance} km</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        trip.status === "ACTIVE" ? "default" : "secondary"
                      }
                    >
                      {trip.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {trip.startTime
                      ? format(new Date(trip.startTime), "MMM d, HH:mm")
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
