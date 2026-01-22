import { useAppStore } from "@/stores/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Clock } from "lucide-react";
import { format } from "date-fns";

export default function AlertsPage() {
  // const { alerts } = useAppStore(); // unused for now
  
  // Mock alerts here if store is empty for demo
  const demoAlerts = [
    { id: '1', type: 'OVERSPEED', severity: 'HIGH', message: 'Driver Alex Rivera exceeded 110km/h in 80 zone', timestamp: new Date().toISOString(), resolved: false },
    { id: '2', type: 'GEOFENCE', severity: 'MEDIUM', message: 'Vehicle exited Downtown Zone without authorization', timestamp: new Date(Date.now() - 3600000).toISOString(), resolved: false },
    { id: '3', type: 'DELAY', severity: 'LOW', message: 'Order #ORD-1004 is running 15m late', timestamp: new Date(Date.now() - 7200000).toISOString(), resolved: true },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">System Alerts</h2>
        <p className="text-muted-foreground">Monitor and resolve critical fleet exceptions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Summary Cards */}
          <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-100 rounded-full text-red-600">
                        <AlertTriangle className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="text-sm font-medium text-red-900">Critical Alerts</p>
                          <h3 className="text-2xl font-bold text-red-700">2</h3>
                      </div>
                  </div>
              </CardContent>
          </Card>
           <Card>
              <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="text-sm font-medium text-muted-foreground">Pending</p>
                          <h3 className="text-2xl font-bold">5</h3>
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
              <ScrollArea className="h-[400px] w-full pr-4">
                  <div className="flex flex-col gap-4">
                      {demoAlerts.map(alert => (
                          <div key={alert.id} className={`flex items-start justify-between p-4 rounded-lg border ${alert.resolved ? 'bg-muted/50 opacity-60' : 'bg-background shadow-sm border-l-4 border-l-red-500'}`}>
                              <div className="flex gap-4">
                                  <div className={`mt-1 ${alert.type === 'OVERSPEED' ? 'text-red-500' : 'text-orange-500'}`}>
                                      <AlertTriangle className="h-5 w-5" />
                                  </div>
                                  <div>
                                      <div className="flex items-center gap-2 mb-1">
                                          <h4 className="font-semibold">{alert.type} Warning</h4>
                                          <Badge variant={alert.severity === 'HIGH' ? 'destructive' : 'outline'}>{alert.severity}</Badge>
                                          {alert.resolved && <Badge variant="secondary">Resolved</Badge>}
                                      </div>
                                      <p className="text-sm text-foreground">{alert.message}</p>
                                      <p className="text-xs text-muted-foreground mt-2">{format(new Date(alert.timestamp), "MMM d, HH:mm")}</p>
                                  </div>
                              </div>
                              {!alert.resolved && (
                                  <Button size="sm" variant="outline">Resolve</Button>
                              )}
                          </div>
                      ))}
                  </div>
              </ScrollArea>
          </CardContent>
      </Card>
    </div>
  );
}
