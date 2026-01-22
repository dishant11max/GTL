import { useAppStore } from "@/stores/useAppStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Phone, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function DriversPage() {
  const { drivers } = useAppStore();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Drivers</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Driver
        </Button>
      </div>

      <div className="border rounded-xl bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Current Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="flex items-center gap-3 font-medium">
                  <div className="relative">
                    <Avatar>
                        <AvatarImage src={driver.avatarUrl} />
                        <AvatarFallback>{driver.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${driver.status === 'BUSY' ? 'bg-orange-500' : driver.status === 'IDLE' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  </div>
                  <div className="flex flex-col">
                    <span>{driver.name}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {driver.phone}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={driver.status === 'BUSY' ? 'default' : 'secondary'}>
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell>
                    <div className="flex flex-col">
                        <span className="text-sm">{driver.vehicle.model}</span>
                        <span className="text-xs text-muted-foreground">{driver.vehicle.plate}</span>
                    </div>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-[200px] truncate">
                   <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {driver.location.address}
                   </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-1 font-medium">
                        ★ {driver.metrics.rating.toFixed(1)}
                    </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {format(new Date(driver.lastUpdate), "HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
