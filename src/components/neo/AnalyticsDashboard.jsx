import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Fuel,
  Gauge,
} from "lucide-react";
import NeoCard from "./NeoCard";
import { supabase } from "@/lib/supabase";

const AnalyticsDashboard = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const { data } = await supabase
        .from("drivers")
        .select("*")
        .order("rating", { ascending: false })
        .limit(3);
      setDrivers(data || []);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  // Mock Data for Fuel Efficiency
  const fuelData = [
    { name: "Mon", consumption: 450, efficiency: 85 },
    { name: "Tue", consumption: 420, efficiency: 88 },
    { name: "Wed", consumption: 480, efficiency: 82 },
    { name: "Thu", consumption: 390, efficiency: 92 },
    { name: "Fri", consumption: 410, efficiency: 90 },
    { name: "Sat", consumption: 350, efficiency: 94 },
    { name: "Sun", consumption: 330, efficiency: 95 },
  ];

  // Mock Data for Idle Time vs Active Time
  const utilizationData = [
    { name: "Active Moving", value: 65, color: "#22C55E" },
    { name: "Idle (Rest)", value: 10, color: "#3B82F6" },
    { name: "Idle (Traffic)", value: 15, color: "#F59E0B" },
    { name: "Loading/Unloading", value: 10, color: "#6366F1" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <NeoCard className="bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">
                Avg Fuel Efficiency
              </p>
              <h3 className="text-3xl font-black">4.2 km/L</h3>
            </div>
            <div className="p-2 bg-green-100 border-2 border-black rounded-full">
              <Fuel className="w-6 h-6 text-green-700" />
            </div>
          </div>
          <p className="flex items-center text-sm font-bold text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" /> +12% vs last week
          </p>
        </NeoCard>

        <NeoCard className="bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">
                Total Idle Time
              </p>
              <h3 className="text-3xl font-black">42 hrs</h3>
            </div>
            <div className="p-2 bg-yellow-100 border-2 border-black rounded-full">
              <ClockIcon className="w-6 h-6 text-yellow-700" />
            </div>
          </div>
          <p className="flex items-center text-sm font-bold text-red-600">
            <TrendingUp className="w-4 h-4 mr-1" /> +5% (Needs Attention)
          </p>
        </NeoCard>

        <NeoCard className="bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">
                Fleet Safety Score
              </p>
              <h3 className="text-3xl font-black">94/100</h3>
            </div>
            <div className="p-2 bg-blue-100 border-2 border-black rounded-full">
              <ShieldCheckIcon className="w-6 h-6 text-blue-700" />
            </div>
          </div>
          <p className="flex items-center text-sm font-bold text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" /> Best in class
          </p>
        </NeoCard>

        <NeoCard className="bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">
                CO2 Reductions
              </p>
              <h3 className="text-3xl font-black">850 kg</h3>
            </div>
            <div className="p-2 bg-teal-100 border-2 border-black rounded-full">
              <LeafIcon className="w-6 h-6 text-teal-700" />
            </div>
          </div>
          <p className="flex items-center text-sm font-bold text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" /> On track
          </p>
        </NeoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart: Fuel Consumption vs Efficiency */}
        <div className="lg:col-span-2">
          <NeoCard className="bg-white h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black uppercase flex items-center gap-2">
                <Fuel className="w-6 h-6" /> Fuel Efficiency Trends
              </h3>
              <select className="border-2 border-black font-bold text-sm p-1">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={fuelData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12, fontWeight: "bold" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12, fontWeight: "bold" }}
                  />
                  <Tooltip
                    contentStyle={{
                      border: "3px solid black",
                      borderRadius: "0px",
                      boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                    }}
                    itemStyle={{ fontWeight: "bold" }}
                  />
                  <Legend iconType="square" />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    name="Efficiency Score"
                    stroke="#22C55E"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorEff)"
                  />
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    name="Consumption (L)"
                    stroke="#EF4444"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{
                      stroke: "#EF4444",
                      strokeWidth: 2,
                      r: 4,
                      fill: "#fff",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </NeoCard>
        </div>

        {/* Secondary: Bar Chart for Utilization */}
        <div className="lg:col-span-1">
          <NeoCard className="bg-white h-[400px] flex flex-col">
            <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
              <Gauge className="w-6 h-6" /> Fleet Utilization
            </h3>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={utilizationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {utilizationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="black"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      border: "3px solid black",
                      borderRadius: "0px",
                      boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                    }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="square"
                    wrapperStyle={{ fontSize: "12px", fontWeight: "bold" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center border-t-2 border-dashed border-gray-200 pt-4">
              <p className="text-sm font-bold text-gray-500">Active Trucks</p>
              <p className="text-3xl font-black">24 / 30</p>
            </div>
          </NeoCard>
        </div>
      </div>

      {/* Bottom Row: Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NeoCard className="bg-white p-6">
          <h3 className="text-xl font-black uppercase mb-4 text-[#FF8C00]">
            Top Performing Drivers
          </h3>
          <ul className="space-y-4">
            {drivers.length === 0 ? (
              <p className="text-gray-500 font-bold">
                No drivers data available yet.
              </p>
            ) : (
              drivers.map((driver, index) => (
                <li
                  key={driver.id}
                  className="flex items-center justify-between border-b-2 border-dashed border-gray-200 pb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 border-2 border-black flex items-center justify-center font-black text-xl">
                      {driver.name ? driver.name[0] : "D"}
                    </div>
                    <div>
                      <p className="font-bold">{driver.name}</p>
                      <p className="text-xs text-gray-500">
                        {driver.vehicle_number || "No Vehicle"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#22C55E]">
                      {driver.rating ? (driver.rating * 19.5).toFixed(0) : "95"}
                      /100
                    </p>
                    <p className="text-xs font-bold text-gray-400">Score</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </NeoCard>

        <NeoCard className="bg-white p-6">
          <h3 className="text-xl font-black uppercase mb-4 text-red-500">
            Maintenance Alerts
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 bg-red-50 p-3 border-l-4 border-red-500">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-red-800">Vehicle MH-04-AB-1234</p>
                <p className="text-sm text-red-600 font-medium">
                  Brake usage anomaly detected. Inspection scheduled.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-yellow-50 p-3 border-l-4 border-yellow-500">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-yellow-800">
                  Vehicle KA-01-XY-9876
                </p>
                <p className="text-sm text-yellow-600 font-medium">
                  Routine oil change due in 500km.
                </p>
              </div>
            </li>
          </ul>
        </NeoCard>
      </div>
    </div>
  );
};

// Simple Icons for Stats
const ClockIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const ShieldCheckIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const LeafIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

export default AnalyticsDashboard;
