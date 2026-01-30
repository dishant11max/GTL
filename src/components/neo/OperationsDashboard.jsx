import React, { useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Play, Zap, Phone, Package } from "lucide-react";
import NeoCard from "./NeoCard";
import NeoButton from "./NeoButton";
import L from "leaflet";

// Fix for default marker icons in React Leaflet
if (L.Icon.Default.prototype._getIconUrl) {
  delete L.Icon.Default.prototype._getIconUrl;
}
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ activeMode, setDestination, destination }) => {
  useMapEvents({
    click(e) {
      if (activeMode === "routing") {
        setDestination([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return destination ? (
    <Marker position={destination}>
      <Popup>Destination</Popup>
    </Marker>
  ) : null;
};

const OperationsDashboard = () => {
  const [activeMode, setActiveMode] = useState("tracking"); // tracking | routing
  const [showOptimization, setShowOptimization] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [destination, setDestination] = useState(null);

  // Mock Fleet Data
  const [trucks] = useState([
    {
      id: 1,
      name: "Adeel",
      vehicle: "MH-04-AD-5555",
      type: "truck",
      pos: [19.076, 72.8777], // Mumbai
      color: "#FF8C00",
      status: "Moving",
      cargo: "Electronics (5T)",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Raj Singh",
      vehicle: "DL-01-XY-9876",
      type: "van",
      pos: [28.7041, 77.1025], // Delhi
      color: "#22C55E",
      status: "Idle",
      cargo: "Empty",
      phone: "+91 99887 76655",
    },
    {
      id: 3,
      name: "Sarah Jen",
      vehicle: "KA-05-ZZ-1234",
      type: "bike",
      pos: [12.9716, 77.5946], // Bangalore
      color: "#3B82F6",
      status: "Loading",
      cargo: "Documents",
      phone: "+91 88776 65544",
    },
  ]);

  // Dynamic Icons based on Type and Color
  const getVehicleIcon = (type, color) => {
    let svgContent = "";

    if (type === "truck") {
      svgContent = `
        <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="black" stroke-width="2"></rect>
        <line x1="16" y1="5" x2="16" y2="19" stroke="black" stroke-width="2"></line>
        <circle cx="7" cy="19" r="2" fill="black"></circle>
        <circle cx="17" cy="19" r="2" fill="black"></circle>
      `;
    } else if (type === "van") {
      svgContent = `
        <path d="M2 10 L2 18 L22 18 L22 12 L17 8 L2 10 Z" fill="none" stroke="black" stroke-width="2"></path>
        <circle cx="7" cy="18" r="2" fill="black"></circle>
        <circle cx="17" cy="18" r="2" fill="black"></circle>
        <rect x="4" y="11" width="6" height="4" stroke="black" stroke-width="1"></rect>
      `;
    } else if (type === "bike") {
      svgContent = `
        <circle cx="6" cy="16" r="3" stroke="black" stroke-width="2" fill="none"></circle>
        <circle cx="18" cy="16" r="3" stroke="black" stroke-width="2" fill="none"></circle>
        <path d="M6 16 L12 10 L18 16 M12 10 L12 6 M10 6 L14 6" stroke="black" stroke-width="2" fill="none"></path>
      `;
    }

    return new L.DivIcon({
      html: `<div style="background-color: ${color}; width: 32px; height: 32px; border: 2px solid black; border-radius: ${type === "bike" ? "50%" : "4px"}; display: flex; align-items: center; justify-content: center; box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                ${svgContent}
              </svg>
             </div>`,
      className: "bg-transparent",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  const handleOptimization = () => {
    setShowOptimization(true);
  };

  // Calculate dynamic stats based on distance
  const getStats = () => {
    if (!selectedTruck && !trucks[0]) return null;
    const truck = selectedTruck || trucks[0];

    // Function to calculate real distance between two coords using Haversine formula
    const haversineDistance = (coords1, coords2) => {
      const toRad = (x) => (x * Math.PI) / 180;
      const R = 6371; // Earth radius in km

      const dLat = toRad(coords2[0] - coords1[0]);
      const dLon = toRad(coords2[1] - coords1[1]);
      const lat1 = toRad(coords1[0]);
      const lat2 = toRad(coords2[0]);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(R * c);
    };

    // Priority: Dynamic interactive calculation first
    if (destination) {
      // Real distance calculation
      const kmDist = haversineDistance(truck.pos, destination);

      // Assume standard route has some inefficiency (via highways) -> +20% distance
      const stdKmDist = Math.round(kmDist * 1.2);
      const stdSpeed = 50; // Average truck speed 50 km/h
      const stdTimeHours = stdKmDist / stdSpeed;

      const stdH = Math.floor(stdTimeHours);
      const stdM = Math.round((stdTimeHours % 1) * 60);

      // AI Route is closer to direct geodesic distance + better speed
      const aiKmDist = Math.round(kmDist * 1.05); // Only 5% deviation from direct line
      const aiSpeed = 60; // Optimized traffic flow 60 km/h
      const aiTimeHours = aiKmDist / aiSpeed;

      const aiH = Math.floor(aiTimeHours);
      const aiM = Math.round((aiTimeHours % 1) * 60);

      return {
        stdTime: `${stdH}h ${stdM}m`,
        aiTime: `${aiH}h ${aiM}m`,
        stdDist: `${stdKmDist} km`,
        aiDist: `${aiKmDist} km`,
        savedTime: `${stdH * 60 + stdM - (aiH * 60 + aiM)} mins`,
        savedDist: `${stdKmDist - aiKmDist} km`,
      };
    }

    // Fallback: Static demo data ONLY if no destination set but analysis requested
    if (showOptimization) {
      return {
        stdTime: "4h 15m",
        aiTime: "3h 20m",
        stdDist: "154 km",
        aiDist: "135 km",
        savedTime: "55 mins",
        savedDist: "19 km",
      };
    }

    return null;
  };

  const stats = getStats();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[800px]">
      {/* Sidebar - Fleet List */}
      <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2">
        <NeoCard className="bg-white sticky top-0 z-10">
          <h2 className="text-xl font-black uppercase mb-1">Active Fleet</h2>
          <p className="text-sm font-bold text-gray-500">
            {trucks.length} vehicles online
          </p>
        </NeoCard>

        {trucks.map((truck) => (
          <div
            key={truck.id}
            onClick={() => setSelectedTruck(truck)}
            className={`p-4 border-2 cursor-pointer transition-all ${
              selectedTruck?.id === truck.id
                ? "bg-gray-50 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-1 -translate-y-1"
                : "bg-white border-gray-200 hover:border-black"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-black text-lg">{truck.name}</h3>
              <span
                className={`text-xs font-bold px-2 py-0.5 uppercase border ${
                  truck.status === "Moving"
                    ? "bg-green-100 text-green-800 border-green-300"
                    : truck.status === "Idle"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                      : "bg-blue-100 text-blue-800 border-blue-300"
                }`}
              >
                {truck.status}
              </span>
            </div>
            <p className="text-xs font-bold text-gray-500 mb-2">
              {truck.vehicle}
            </p>
            <div className="flex items-center gap-2 text-sm font-medium mb-1">
              <Phone className="w-3 h-3" /> {truck.phone}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Package className="w-3 h-3" /> {truck.cargo}
            </div>
          </div>
        ))}

        <NeoCard className="bg-black text-white p-4 mt-auto">
          <h3 className="font-black text-lg uppercase mb-2">Controls</h3>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                setActiveMode("tracking");
                setShowOptimization(false);
                setDestination(null);
              }}
              className={`flex-1 py-1 text-xs font-bold border border-white ${activeMode === "tracking" ? "bg-white text-black" : "text-white"}`}
            >
              TRACK
            </button>
            <button
              onClick={() => setActiveMode("routing")}
              className={`flex-1 py-1 text-xs font-bold border border-white ${activeMode === "routing" ? "bg-[#22C55E] text-black border-[#22C55E]" : "text-white"}`}
            >
              ROUTE
            </button>
          </div>
          {activeMode === "routing" && (
            <div className="text-xs text-gray-400">
              <p className="mb-2">1. Select "Route"</p>
              <p className="mb-2">2. Click map to set destination.</p>
              <p>OR view route analysis.</p>
              <NeoButton
                variant="secondary"
                className="w-full mt-3 !py-1 !text-xs"
                onClick={handleOptimization}
                disabled={showOptimization}
              >
                {showOptimization ? "ANALYSIS ACTIVE" : "SHOW AI ANALYSIS"}
              </NeoButton>
            </div>
          )}
        </NeoCard>
      </div>

      {/* Main Map Area */}
      <div className="lg:col-span-3 h-full">
        <NeoCard className="bg-white p-0 overflow-hidden h-full relative z-0">
          <MapContainer
            center={[21.0, 78.0]} // Center India roughly
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker
              activeMode={activeMode}
              setDestination={setDestination}
              destination={destination}
            />

            {/* Trucks Markers */}
            {trucks.map((truck) => (
              <Marker
                key={truck.id}
                position={truck.pos}
                icon={getVehicleIcon(truck.type, truck.color)}
                eventHandlers={{ click: () => setSelectedTruck(truck) }}
              >
                <Popup className="font-['Space_Grotesk'] font-bold">
                  <div className="text-center">
                    <p className="uppercase text-xs text-gray-500">
                      {truck.vehicle}
                    </p>
                    <p className="text-lg font-black">{truck.name}</p>
                    <p className="text-sm font-medium">{truck.cargo}</p>
                    <p className="mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 border border-green-300 inline-block uppercase">
                      {truck.status}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Stats Overlay */}
          {activeMode === "routing" && showOptimization && stats && (
            <div className="absolute top-4 right-4 bg-white border-4 border-black p-4 z-[9999] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xs w-full">
              <h4 className="font-black text-lg uppercase mb-4 border-b-2 border-dashed border-gray-300 pb-2">
                AI Optimization
              </h4>
              <div className="mb-4 text-xs font-bold text-gray-500 bg-gray-100 p-2 border-2 border-dashed border-gray-300">
                DESTINATION: <br />
                <span className="text-black">
                  {destination
                    ? `${destination[0].toFixed(4)}, ${destination[1].toFixed(4)}`
                    : "SELECT ON MAP"}
                </span>
              </div>

              <div className="space-y-4">
                {/* Standard Route Stats */}
                <div className="bg-red-50 p-2 border border-red-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-red-500 text-xs uppercase">
                      Standard Route
                    </span>
                    <span className="font-black text-red-700">
                      {stats.stdTime}
                    </span>
                  </div>
                  <div className="text-right text-xs font-bold text-red-400">
                    {stats.stdDist}
                  </div>
                </div>

                {/* AI Route Stats */}
                <div className="bg-green-50 p-2 border border-green-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-green-600 text-xs uppercase flex items-center gap-1">
                      <Zap className="w-3 h-3" /> AI Route
                    </span>
                    <span className="font-black text-green-700">
                      {stats.aiTime}
                    </span>
                  </div>
                  <div className="text-right text-xs font-bold text-green-500">
                    {stats.aiDist}
                  </div>
                </div>

                {/* Savings Box */}
                <div className="bg-black text-white p-2 mt-2">
                  <p className="text-[10px] font-bold opacity-60 uppercase text-center mb-1">
                    Total Savings
                  </p>
                  <div className="flex justify-between text-sm font-black">
                    <span>⏱️ {stats.savedTime}</span>
                    <span>🛣️ {stats.savedDist}</span>
                  </div>
                </div>

                {/* AI Explanation Logic */}
                <div className="bg-blue-50 p-2 border border-blue-100 text-[10px] text-blue-800">
                  <p className="font-bold mb-1">⚡ Why is AI faster?</p>
                  <ul className="list-disc pl-3 space-y-0.5 opacity-80">
                    <li>Avoids predicted heavy traffic (-15m)</li>
                    <li>Skips 3 toll booths (-8m)</li>
                    <li>Better road quality gradient (+12km/h)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </NeoCard>
      </div>
    </div>
  );
};

export default OperationsDashboard;
