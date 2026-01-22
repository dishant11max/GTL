import React, { useEffect, useState } from "react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";
import { getHubs } from "@/services/api";
import { MapPin, Activity } from "lucide-react";

const HubsPage = () => {
  const [hubs, setHubs] = useState([]);

  useEffect(() => {
    getHubs().then(setHubs);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Operational":
        return "bg-[#138808] text-white";
      case "High Load":
        return "bg-[#FF9933]";
      case "Maintenance":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <NeoLayout>
      <div className="container mx-auto px-6">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-8">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase mb-2">
              Network
            </h1>
            <p className="text-2xl font-bold bg-black text-white inline-block px-2">
              // LIVE HUB STATUS
            </p>
          </div>
          <div className="text-right mt-6 md:mt-0">
            <div className="text-5xl font-black">{hubs.length}</div>
            <div className="font-bold uppercase tracking-widest">
              Active Centers
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubs.map((hub) => (
            <NeoCard key={hub.id} className="relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MapPin size={120} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <span
                    className={`px-2 py-1 border-2 border-black font-bold text-sm uppercase ${getStatusColor(hub.status)} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                  >
                    {hub.status}
                  </span>
                  <Activity className="animate-pulse" />
                </div>

                <h3 className="text-3xl font-black uppercase mb-2">
                  {hub.city}
                </h3>
                <p className="font-mono text-sm opacity-60 mb-6 border-b-2 border-dashed border-black/30 pb-4">
                  {hub.address}
                </p>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs font-bold uppercase mb-1">
                      Capacity
                    </div>
                    <div className="w-32 h-4 border-2 border-black bg-white p-[2px]">
                      <div
                        className="h-full bg-black"
                        style={{ width: hub.capacity }}
                      ></div>
                    </div>
                  </div>
                  <div className="font-black text-xl">{hub.capacity}</div>
                </div>
              </div>
            </NeoCard>
          ))}
        </div>
      </div>
    </NeoLayout>
  );
};

export default HubsPage;
