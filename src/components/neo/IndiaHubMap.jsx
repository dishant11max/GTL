import React, { useState, useEffect } from "react";
import {
  MapPin,
  Truck,
  BarChart3,
  Activity,
  Router,
  Globe,
  ShieldCheck,
} from "lucide-react";

const IndiaHubMap = ({ hubs, onHubSelect, selectedHub }) => {
  const [hoveredHub, setHoveredHub] = useState(null);
  const [radarAngle, setRadarAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Expanded Hub coordinates for a bigger, comprehensive map
  // Scaled up for 800x900 viewBox
  const hubPositions = {
    "DELHI NCR": { x: 350, y: 260, region: "NCR", type: "MAIN" },
    MUMBAI: { x: 230, y: 560, region: "Maharashtra", type: "MAIN" },
    BANGALORE: { x: 290, y: 720, region: "Karnataka", type: "MAIN" },
    HYDERABAD: { x: 340, y: 610, region: "Telangana", type: "MAIN" },
    CHENNAI: { x: 370, y: 750, region: "Tamil Nadu", type: "MAIN" },
    KOLKATA: { x: 580, y: 460, region: "West Bengal", type: "MAIN" },
    PUNE: { x: 250, y: 590, region: "Maharashtra", type: "SECONDARY" },
    AHMEDABAD: { x: 210, y: 430, region: "Gujarat", type: "SECONDARY" },
    JAIPUR: { x: 280, y: 320, region: "Rajasthan", type: "SECONDARY" },
    LUCKNOW: { x: 420, y: 340, region: "UP", type: "SECONDARY" },
    PATNA: { x: 500, y: 380, region: "Bihar", type: "SECONDARY" },
    BHOPAL: { x: 360, y: 450, region: "MP", type: "SECONDARY" },
    INDORE: { x: 320, y: 480, region: "MP", type: "SECONDARY" },
    NAGPUR: { x: 380, y: 520, region: "Maharashtra", type: "SECONDARY" },
    COIMBATORE: { x: 310, y: 780, region: "Tamil Nadu", type: "SECONDARY" },
    VISAKHAPATNAM: { x: 460, y: 620, region: "Andhra", type: "SECONDARY" },
    SURAT: { x: 220, y: 500, region: "Gujarat", type: "SECONDARY" },
    GUWAHATI: { x: 670, y: 340, region: "Assam", type: "SECONDARY" },
    BHUBANESWAR: { x: 520, y: 540, region: "Odisha", type: "SECONDARY" },
    RAIPUR: { x: 440, y: 500, region: "Chhattisgarh", type: "SECONDARY" },
    CHANDIGARH: { x: 320, y: 200, region: "Punjab", type: "SECONDARY" },
  };

  const activeHub = hoveredHub || selectedHub;
  const activeHubData = hubs.find((h) => h.city === activeHub);

  // Generate complex connection lines
  const connections = [];
  const cities = Object.keys(hubPositions);
  cities.forEach((city, i) => {
    // Connect to 3 nearest neighbors roughly (simulated by list index for chaos/complexity look)
    for (let j = 1; j <= 3; j++) {
      const targetCity = cities[(i + j * 3) % cities.length];
      connections.push({ from: city, to: targetCity });
    }
    // Ensure specific main hub connections
    if (hubPositions[city].type === "SECONDARY") {
      const mainHubs = cities.filter((c) => hubPositions[c].type === "MAIN");
      const nearestMain = mainHubs[i % mainHubs.length];
      connections.push({ from: city, to: nearestMain, type: "TRUNK" });
    }
  });

  return (
    <div className="relative bg-white border-4 border-black p-4 lg:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col xl:flex-row gap-8">
      {/* Map Container - MADE HUGE */}
      <div className="flex-1 relative bg-[#F4F4F5] border-2 border-black overflow-hidden group">
        {/* Decorative Grid Background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Dynamic Radar Sweep Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            background: `conic-gradient(from ${radarAngle}deg at 50% 50%, rgba(0,0,0,0) 0deg, rgba(34,197,94,0.5) 360deg)`,
          }}
        ></div>

        <svg
          viewBox="0 0 800 900"
          className="w-full h-auto min-h-[600px] xl:h-[800px]"
          style={{ filter: "drop-shadow(4px 4px 0px rgba(0,0,0,0.1))" }}
        >
          {/* India Map Silhouette (Rough approximation for style) */}
          <path
            d="M 350 100 L 440 90 L 520 110 L 590 140 L 640 200 L 680 260 L 700 340 L 690 400 L 660 440 L 620 470 L 590 500 L 610 560 L 590 620 L 560 680 L 520 740 L 460 800 L 400 840 L 340 850 L 280 830 L 240 780 L 200 720 L 170 640 L 150 560 L 140 480 L 150 400 L 170 320 L 200 240 L 240 180 L 300 130 Z"
            fill="#FFFFFF"
            stroke="black"
            strokeWidth="4"
            className="drop-shadow-xl"
          />

          {/* Connection Lines - creating the "web" */}
          {connections.map((conn, i) => {
            const start = hubPositions[conn.from];
            const end = hubPositions[conn.to];
            const isTrunk = conn.type === "TRUNK";
            if (!start || !end) return null;

            return (
              <line
                key={`link-${i}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={isTrunk ? "#000" : "#FF8C00"}
                strokeWidth={isTrunk ? "1.5" : "0.5"}
                strokeDasharray={isTrunk ? "none" : "4,4"}
                opacity={isTrunk ? "0.1" : "0.3"}
                className={isTrunk ? "" : "animate-pulse"}
              />
            );
          })}

          {/* Nodes */}
          {Object.entries(hubPositions).map(([city, pos]) => {
            const isActive = activeHub === city;
            const isMain = pos.type === "MAIN";
            const isSelected = selectedHub === city;

            return (
              <g
                key={city}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredHub(city)}
                onMouseLeave={() => setHoveredHub(null)}
                onClick={() => onHubSelect?.(city)}
              >
                {/* Ping Animation for Main Hubs */}
                {isMain && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 60 : 30}
                    fill="none"
                    stroke={isActive ? "#FF8C00" : "#22C55E"}
                    strokeWidth="1"
                    opacity="0.4"
                    className="animate-ping"
                    style={{ animationDuration: "3s" }}
                  />
                )}

                {/* Hover Glow */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 25 : 0}
                  fill={isActive ? "#FF8C00" : "transparent"}
                  opacity="0.2"
                  className="transition-all duration-300"
                />

                {/* Node Marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isMain ? 10 : 6}
                  fill={
                    isSelected
                      ? "#FF8C00"
                      : isActive
                        ? "#FF8C00"
                        : isMain
                          ? "white"
                          : "#22C55E"
                  }
                  stroke="black"
                  strokeWidth={isMain ? "3" : "2"}
                />

                {/* City Label */}
                {(isMain || isActive) && (
                  <g>
                    <rect
                      x={pos.x + 15}
                      y={pos.y - 10}
                      width={city.length * 8 + 10}
                      height="20"
                      fill="black"
                      opacity={isActive ? 1 : 0.8}
                    />
                    <text
                      x={pos.x + 20}
                      y={pos.y + 4}
                      className="text-[10px] font-black fill-white"
                    >
                      {city}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Map Overlay Stats */}
        <div className="absolute top-4 right-4 space-y-2">
          <div className="bg-white border-2 border-black p-2 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black">NETWORK ONLINE</span>
          </div>
          <div className="bg-white border-2 border-black p-2 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Globe className="w-3 h-3" />
            <span className="text-xs font-black">21 HUBS ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Side Panel - Hub Details */}
      <div className="xl:w-96 flex flex-col gap-6">
        <div className="border-4 border-black bg-black text-white p-6 shadow-[8px_8px_0px_0px_#FF8C00]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-black uppercase leading-none">
              {activeHubData ? activeHubData.city : "SELECT HUB"}
            </h3>
            {activeHubData && (
              <Activity className="w-6 h-6 text-[#22C55E] animate-bounce" />
            )}
          </div>
          {activeHubData ? (
            <div className="space-y-1">
              <p className="font-bold text-[#FF8C00]">
                {hubPositions[activeHubData.city]?.region?.toUpperCase() ||
                  "INDIA"}
              </p>
              <p className="text-sm opacity-70">Status: Operational</p>
            </div>
          ) : (
            <p className="text-sm opacity-60">
              Interactive Network Map. Click any node to view real-time metrics.
            </p>
          )}
        </div>

        {activeHubData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-4 border-black bg-gray-50 p-4 hover:bg-white hover:-translate-y-1 transition-transform">
                <Truck className="w-6 h-6 mb-2" />
                <div className="text-2xl font-black">{activeHubData.fleet}</div>
                <div className="text-xs font-bold text-gray-500 uppercase">
                  Fleet Size
                </div>
              </div>
              <div className="border-4 border-black bg-gray-50 p-4 hover:bg-white hover:-translate-y-1 transition-transform">
                <BarChart3 className="w-6 h-6 mb-2" />
                <div className="text-2xl font-black">{activeHubData.vol}</div>
                <div className="text-xs font-bold text-gray-500 uppercase">
                  Daily Vol
                </div>
              </div>
            </div>

            <div className="border-4 border-black bg-[#22C55E] p-4 text-white">
              <div className="flex justify-between items-center mb-2">
                <span className="font-black uppercase text-sm">
                  SLA Compliance
                </span>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-4xl font-black">{activeHubData.sla}</div>
              <div className="w-full bg-black/20 h-2 mt-2">
                <div
                  className="bg-white h-full"
                  style={{ width: activeHubData.sla }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-4 border-dashed border-gray-300 p-8 text-center bg-gray-50 flex-1 flex flex-col justify-center items-center">
            <Globe className="w-16 h-16 text-gray-300 mb-4 animate-spin-slow" />
            <p className="font-bold text-gray-400 uppercase">
              Explore the Network
            </p>
          </div>
        )}

        {/* Global Network Stats */}
        <div className="mt-auto border-t-4 border-black pt-6">
          <h4 className="font-black uppercase mb-4 text-lg">
            Network Overview
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2">
              <span className="font-bold text-sm text-gray-600">
                Total Coverage
              </span>
              <span className="font-black">21 Major Cities</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2">
              <span className="font-bold text-sm text-gray-600">
                Warehouse Space
              </span>
              <span className="font-black">4.5M Sq. Ft.</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-gray-600">
                Active Fleet
              </span>
              <span className="font-black">1200+ Units</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaHubMap;
