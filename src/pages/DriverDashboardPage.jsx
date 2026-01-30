import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NeoLayout from "../components/neo/NeoLayout";
import NeoCard from "../components/neo/NeoCard";
import NeoButton from "../components/neo/NeoButton";
import BonusTracker from "../components/neo/BonusTracker";
import {
  Truck,
  MapPin,
  Clock,
  Package,
  Phone,
  Navigation,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const DriverDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // overview | tasks | history
  const [formData, setFormData] = useState({
    name: "Adeel",
    vehicleNumber: "MH-04-AD-5555",
  });

  // Fetch logged in user details
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/driver-login");
      } else {
        // In real app, fetch driver details from DB
        if (user.email) {
          setFormData((prev) => ({ ...prev, name: user.email.split("@")[0] }));
        }
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const tasks = [
    {
      id: 1,
      type: "PICKUP",
      location: "Bhiwandi Warehouse, Mumbai",
      time: "10:30 AM",
      status: "PENDING",
      priority: "HIGH",
    },
    {
      id: 2,
      type: "DELIVERY",
      location: "Tech Park, Pune",
      time: "04:00 PM",
      status: "SCHEDULED",
      priority: "NORMAL",
    },
  ];

  return (
    <NeoLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-5xl font-black uppercase mb-1 tracking-tighter">
              Pilot Dashboard
            </h1>
            <p className="font-bold text-gray-500">
              Welcome back,{" "}
              <span className="text-[#FF8C00] uppercase bg-black px-2 py-0.5">
                {formData.name}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-100 border-2 border-green-500 text-green-700 font-bold text-sm uppercase flex items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              ● Online
            </span>
            <NeoButton
              variant="primary"
              onClick={() => navigate("/driver-verification")}
              className="!py-1 text-xs"
            >
              Verify Profile
            </NeoButton>
            <NeoButton
              variant="secondary"
              onClick={handleLogout}
              className="!py-1 text-xs"
            >
              <LogOut className="w-3 h-3 mr-1" /> Logout
            </NeoButton>
          </div>
        </div>

        {/* Quick Stats Row - NEW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-black text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#FF8C00]">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">
              Total Earnings
            </div>
            <div className="text-3xl font-black">₹ 12,450</div>
            <div className="text-xs text-green-400 font-bold mt-1">
              ↑ 12% this week
            </div>
          </div>
          <div className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">
              Distance Driven
            </div>
            <div className="text-3xl font-black">
              458 <span className="text-sm text-gray-400">km</span>
            </div>
          </div>
          <div className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">
              Hours Online
            </div>
            <div className="text-3xl font-black">
              34.5 <span className="text-sm text-gray-400">hrs</span>
            </div>
          </div>
          <div className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">
              Pilot Rating
            </div>
            <div className="text-3xl font-black flex items-center gap-2">
              4.9 <span className="text-[#FF8C00] text-xl">★</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Priority Info */}
          <div className="space-y-6">
            {/* NEW: Performance Bonus Tracker */}
            <BonusTracker />

            {/* Current Vehicle */}
            <NeoCard>
              <h3 className="font-black text-xl uppercase mb-4 flex justify-between items-center">
                Current Vehicle
                <span className="text-xs bg-green-200 px-2 py-0.5 border border-black">
                  ACTIVE
                </span>
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 border-2 border-black flex items-center justify-center">
                  <Truck className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-black text-lg">{formData.vehicleNumber}</p>
                  <p className="text-sm font-bold text-gray-500">
                    Ashok Leyland 12T
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm font-bold mb-4">
                <div className="bg-gray-50 p-2 border border-black text-center">
                  <span className="block text-gray-500 text-[10px] uppercase">
                    Fuel
                  </span>
                  65%
                </div>
                <div className="bg-gray-50 p-2 border border-black text-center">
                  <span className="block text-gray-500 text-[10px] uppercase">
                    AdBlue
                  </span>
                  80%
                </div>
                <div className="bg-gray-50 p-2 border border-black text-center">
                  <span className="block text-gray-500 text-[10px] uppercase">
                    Tyres
                  </span>
                  OK
                </div>
              </div>
              <NeoButton
                variant="secondary"
                className="w-full justify-center text-xs"
              >
                Report Vehicle Issue
              </NeoButton>
            </NeoCard>

            {/* Alerts Box */}
            <div className="border-4 border-black bg-yellow-400 p-4">
              <h4 className="font-black uppercase flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" /> Road Alerts (2)
              </h4>
              <ul className="list-disc pl-5 font-bold text-sm space-y-1">
                <li>Heavy traffic on NH-48 (Bhiwandi).</li>
                <li>Rain forecast post 6 PM.</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Tasks & Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Task */}
            <NeoCard className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Package className="w-48 h-48" />
              </div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-red-100 text-red-700 border border-red-500 px-2 py-0.5 text-xs font-black uppercase inline-block">
                      High Priority
                    </span>
                    <span className="bg-blue-100 text-blue-700 border border-blue-500 px-2 py-0.5 text-xs font-black uppercase inline-block">
                      Zone 4
                    </span>
                  </div>
                  <h2 className="text-4xl font-black uppercase">
                    Pickup #ORD-9921
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black">10:30 AM</p>
                  <p className="text-sm font-bold text-gray-500">
                    Scheduled Today
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                <div className="flex gap-3 bg-gray-50 p-3 border-2 border-dashed border-gray-300">
                  <div className="mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-500 text-xs uppercase">
                      Location
                    </p>
                    <p className="font-black text-lg leading-tight">
                      Bhiwandi Warehouse, Lane 5
                    </p>
                    <p className="text-sm underline cursor-pointer hover:text-[#FF8C00] mt-1">
                      View on Map
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 bg-gray-50 p-3 border-2 border-dashed border-gray-300">
                  <div className="mt-1">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-500 text-xs uppercase">
                      Cargo Details
                    </p>
                    <p className="font-black text-lg leading-tight">
                      Electronics (50 Units)
                    </p>
                    <p className="text-sm text-red-500 font-bold">
                      Fragile Handling
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                <NeoButton className="flex-1 py-4 text-lg justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                  <Navigation className="w-5 h-5 mr-2" /> Start Navigation
                </NeoButton>
                <NeoButton
                  variant="secondary"
                  className="flex-1 py-4 text-lg justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  <Phone className="w-5 h-5 mr-2" /> Call Supervisor
                </NeoButton>
              </div>
            </NeoCard>

            {/* Upcoming Tasks List */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-2xl font-black uppercase">
                  Upcoming Schedule
                </h3>
                <span className="text-sm font-bold underline cursor-pointer">
                  View Full Calendar
                </span>
              </div>

              <div className="space-y-3">
                {tasks.slice(1).map((task) => (
                  <NeoCard
                    key={task.id}
                    className="p-4 flex justify-between items-center group cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-100 border-2 border-black group-hover:bg-gray-800 group-hover:border-gray-600 transition-colors">
                        <Clock className="w-5 h-5 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="font-black text-xl">{task.type}</p>
                        <p className="text-sm font-bold text-gray-500 group-hover:text-gray-400">
                          {task.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg">{task.time}</p>
                      <span className="text-xs bg-white text-black px-2 py-0.5 uppercase font-black border border-black">
                        {task.status}
                      </span>
                    </div>
                  </NeoCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NeoLayout>
  );
};

export default DriverDashboardPage;
