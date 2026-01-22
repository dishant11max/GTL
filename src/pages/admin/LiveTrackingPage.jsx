import { useAppStore } from "@/stores/useAppStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation, Truck } from "lucide-react";
import { useState } from "react";

export default function LiveTrackingPage() {
  const { drivers } = useAppStore();
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const selectedDriver = drivers.find((d) => d.id === selectedDriverId);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Sidebar List */}
      <Card className="w-80 flex flex-col h-full border-0 shadow-lg z-10">
        <div className="p-4 border-b font-semibold">Live Fleet Status</div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {drivers.map((driver) => (
              <button
                key={driver.id}
                onClick={() => setSelectedDriverId(driver.id)}
                className={`flex items-center gap-3 p-4 text-left border-b hover:bg-muted/50 transition-colors ${selectedDriverId === driver.id ? "bg-muted border-l-4 border-l-primary" : ""}`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={driver.avatarUrl} />
                    <AvatarFallback>
                      {driver.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${driver.status === "BUSY" ? "bg-orange-500" : "bg-green-500"}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{driver.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {driver.status === "BUSY" ? "On Delivery" : "Idle"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Map Area */}
      <div className="flex-1 rounded-xl overflow-hidden relative border shadow-sm bg-slate-100 group">
        {/* Mock Map Background */}
        <div
          className="absolute inset-0 bg-[url('https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=1600&height=1200&center=lonlat:-74.0060,40.7128&zoom=12&apiKey=YOUR_API_KEY')] bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,240,240,0.5), rgba(240,240,240,0.5)), repeating-linear-gradient(0deg, transparent, transparent 19px, #ddd 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #ddd 20px)",
          }}
        >
          {/* Simple grid to mock map texture if image fails */}
          <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-4xl select-none">
            Interactive Map View
          </div>
        </div>

        {/* Floating Details Card */}
        {selectedDriver && (
          <div className="absolute top-4 right-4 w-80">
            <Card className="shadow-2xl">
              <CardContent className="p-0">
                <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white">
                      <AvatarImage src={selectedDriver.avatarUrl} />
                      <AvatarFallback>
                        {selectedDriver.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{selectedDriver.name}</h3>
                      <p className="text-xs opacity-90">
                        {selectedDriver.vehicle.model}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 grid gap-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground text-sm">
                      Status
                    </span>
                    <Badge>{selectedDriver.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground text-sm">
                      Current Speed
                    </span>
                    <span className="font-mono">45 km/h</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground text-sm">
                      Location
                    </span>
                    <span className="text-sm text-right truncate max-w-[150px]">
                      {selectedDriver.location.address}
                    </span>
                  </div>
                  <div className="pt-2">
                    <Button className="w-full">View Full Route</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mock Markers */}
        {drivers.map((driver, i) => (
          <div
            key={driver.id}
            className="absolute transition-all duration-1000 ease-in-out cursor-pointer hover:scale-110"
            style={{
              top: `${40 + i * 10 + Math.random() * 5}%`,
              left: `${30 + i * 12 + Math.random() * 5}%`,
            }}
            onClick={() => setSelectedDriverId(driver.id)}
          >
            <div
              className={`rounded-full p-1 shadow-lg ${selectedDriverId === driver.id ? "bg-primary z-50 scale-125" : "bg-white z-10"}`}
            >
              <Truck
                className={`h-5 w-5 ${selectedDriverId === driver.id ? "text-white" : "text-primary"}`}
              />
            </div>
            <div className="bg-white px-2 py-0.5 rounded text-[10px] font-bold shadow absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
              {driver.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
