import { useAppStore } from "@/stores/useAppStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Navigation, Package, CheckCircle, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function TripPage() {
  const { trips } = useAppStore();
  const navigate = useNavigate();

  // Mock: Pick the first active trip or first trip
  const activeTrip = trips[0];

  if (!activeTrip) {
      return (
          <div className="flex flex-col items-center justify-center h-[80vh] p-6 text-center text-muted-foreground">
              <Package className="h-16 w-16 mb-4 opacity-20" />
              <h2 className="text-xl font-semibold mb-2">No Active Trips</h2>
              <p>You have no assigned trips at the moment. Enjoy you break!</p>
              <Button className="mt-6" variant="outline" onClick={() => window.location.reload()}>Refresh</Button>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
          <div className="flex justify-between items-start mb-4">
              <div>
                  <h2 className="text-2xl font-bold">Trip #{activeTrip.id}</h2>
                  <p className="text-muted-foreground text-sm">{activeTrip.stops.length} Stops • {activeTrip.totalDistance} km</p>
              </div>
              <Badge variant={activeTrip.status === 'ACTIVE' ? 'default' : 'secondary'}>{activeTrip.status}</Badge>
          </div>
          <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20" onClick={() => navigate("/driver/navigation")}>
              <Navigation className="mr-2 h-5 w-5" /> Start Navigation
          </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
          <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-8 py-4">
              {activeTrip.stops.map((stop, index) => (
                  <div key={stop.id} className="relative">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-[41px] top-1 h-6 w-6 rounded-full border-4 border-slate-50 flex items-center justify-center ${stop.status === 'COMPLETED' ? 'bg-green-500' : index === 0 ? 'bg-primary' : 'bg-slate-300'}`}>
                          {stop.status === 'COMPLETED' && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                      
                      <Card className={`border-0 shadow-sm ${stop.status === 'COMPLETED' ? 'opacity-60 grayscale' : ''}`}>
                          <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                  <Badge variant="outline" className="mb-2">
                                      {stop.type}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground font-mono">
                                    {stop.eta || '10:30 AM'}
                                  </span>
                              </div>
                              <h3 className="font-semibold text-lg leading-tight mb-1">{stop.location.address}</h3>
                              <p className="text-sm text-muted-foreground mb-3">Order #{stop.orderId}</p>
                              
                              {stop.status !== 'COMPLETED' && (
                                  <div className="flex gap-2">
                                      <Button size="sm" variant="outline" className="flex-1">Call</Button>
                                      <Button size="sm" className="flex-1">Details</Button>
                                  </div>
                              )}
                          </CardContent>
                      </Card>
                  </div>
              ))}
          </div>
      </ScrollArea>
    </div>
  );
}
