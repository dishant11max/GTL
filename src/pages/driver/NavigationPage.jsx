import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Navigation, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export default function NavigationPage() {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(2.4);
  const [eta, setEta] = useState(8);

  // Mock movement
  useEffect(() => {
    const interval = setInterval(() => {
        setDistance(d => Math.max(0, d - 0.1));
        setEta(e => Math.max(0, e - 0.3));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-100 relative overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[url('https://maps.geoapify.com/v1/staticmap?style=osm-bright-grey&width=800&height=1200&center=lonlat:-74.0060,40.7128&zoom=14&apiKey=YOUR_API_KEY')] bg-cover bg-center" style={{ filter: 'contrast(1.2)' }}>
             {/* Polyline mock */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'scale(2)' }}>
                <path d="M 150,150 Q 200,200 400,300 T 600,600" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" strokeDasharray="10 10" />
             </svg>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-white fill-white transform rotate-45" />
                </div>
             </div>
        </div>

      <div className="z-10 p-4">
        <Button size="icon" variant="secondary" className="rounded-full shadow-lg h-12 w-12" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-auto z-10 p-4 pb-8 bg-gradient-to-t from-black/20 to-transparent">
          <Card className="shadow-2xl border-0 ring-1 ring-black/5">
              <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                      <div className="h-14 w-14 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
                          <Navigation className="h-8 w-8" />
                      </div>
                      <div>
                          <p className="text-muted-foreground font-medium">Next Drop-off</p>
                          <h2 className="text-2xl font-bold leading-none">123 Broadway</h2>
                          <p className="text-sm text-muted-foreground mt-1">New York, NY 10013</p>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-50 p-3 rounded-lg text-center">
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Distance</p>
                          <p className="text-xl font-bold text-slate-800">{distance.toFixed(1)} km</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg text-center">
                           <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">ETA</p>
                          <p className={`text-xl font-bold ${eta < 2 ? 'text-green-600' : 'text-slate-800'}`}>{eta.toFixed(0)} min</p>
                      </div>
                  </div>

                  <Button className="w-full h-14 text-lg text-xl font-bold rounded-xl shadow-xl shadow-primary/20 animate-in fade-in slide-in-from-bottom-4">
                      Complete Delivery
                  </Button>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
