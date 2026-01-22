import { useState } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Map, Timer } from "lucide-react";
import { toast } from "sonner";

export default function OptimizerPage() {
  const { trips, drivers } = useAppStore();
  const [selectedTripId, setSelectedTripId] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedData, setOptimizedData] = useState(null);

  const handleOptimize = () => {
    if (!selectedTripId) return;
    setIsOptimizing(true);

    // Mock AI delay
    setTimeout(() => {
      setOptimizedData({
        originalDistance: 45.2,
        newDistance: 38.4,
        originalTime: 65,
        newTime: 52,
        stopsOrder: [0, 2, 4, 1, 3, 5], // Mock reordering
      });
      setIsOptimizing(false);
      toast.success("Route optimized successfully! Saved 6.8km.");
    }, 2000);
  };

  const selectedTrip = trips.find((t) => t.id === selectedTripId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          AI Route Optimizer
        </h2>
        <p className="text-muted-foreground">
          Select a trip to optimize stop sequence using our genetic algorithm
          engine.
        </p>
      </div>

      <div className="flex gap-4 items-start max-w-4xl">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Select Trip for Optimization
              </label>
              <Select onValueChange={setSelectedTripId} value={selectedTripId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a trip..." />
                </SelectTrigger>
                <SelectContent>
                  {trips.map((trip) => (
                    <SelectItem key={trip.id} value={trip.id}>
                      {trip.id} - {trip.stops.length} stops (
                      {drivers.find((d) => d.id === trip.driverId)?.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleOptimize}
              disabled={!selectedTripId || isOptimizing}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
            >
              {isOptimizing ? (
                <>Optimizing Route...</>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" /> Generate Optimized Route
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {optimizedData && (
          <Card className="flex-1 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Wand2 className="h-5 w-5" /> Optimization Results
              </CardTitle>
              <CardDescription>AI found a more efficient path.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-background rounded-lg border">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Map className="h-3 w-3" /> Distance
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {optimizedData.newDistance}km
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {optimizedData.originalDistance}km
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="mt-2 text-green-600 border-green-200 bg-green-50"
                  >
                    -15% Distance
                  </Badge>
                </div>
                <div className="p-3 bg-background rounded-lg border">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Timer className="h-3 w-3" /> Duration
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {optimizedData.newTime}m
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {optimizedData.originalTime}m
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="mt-2 text-green-600 border-green-200 bg-green-50"
                  >
                    -20% Time
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full text-primary border-primary hover:bg-primary/10"
              >
                Apply to Trip
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {optimizedData && (
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Route Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-slate-100 rounded-lg flex items-center justify-center text-muted-foreground border-2 border-dashed">
              Map Preview of Optimized Polyline
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
