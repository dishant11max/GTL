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
            <h1 className="text-4xl font-black uppercase mb-1">
              Pilot Dashboard
            </h1>
            <p className="font-bold text-gray-500">
              Welcome back,{" "}
              <span className="text-[#FF8C00] uppercase">{formData.name}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-100 border-2 border-green-500 text-green-700 font-bold text-sm uppercase flex items-center">
              ● Online
            </span>
            <NeoButton
              variant="secondary"
              onClick={handleLogout}
              className="!py-1 text-xs"
            >
              Logout
            </NeoButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Priority Info */}
          <div className="space-y-6">
            {/* NEW: Performance Bonus Tracker */}
            <BonusTracker />

            {/* Current Vehicle */}
            <NeoCard>
              <h3 className="font-black text-xl uppercase mb-4">
                Current Vehicle
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
              <div className="grid grid-cols-2 gap-2 text-sm font-bold">
                <div className="bg-gray-50 p-2 border border-black">
                  <span className="block text-gray-500 text-[10px] uppercase">
                    Fuel
                  </span>
                  65%
                </div>
                <div className="bg-gray-50 p-2 border border-black">
                  <span className="block text-gray-500 text-[10px] uppercase">
                    Health
                  </span>
                  Good
                </div>
              </div>
            </NeoCard>
          </div>

          {/* Right Column - Tasks & Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Task */}
            <NeoCard className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-red-100 text-red-700 border border-red-500 px-2 py-0.5 text-xs font-black uppercase mb-2 inline-block">
                    High Priority
                  </span>
                  <h2 className="text-3xl font-black uppercase">
                    Pickup #ORD-9921
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">10:30 AM</p>
                  <p className="text-sm font-bold text-gray-500">Today</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-500 text-xs uppercase">
                      Location
                    </p>
                    <p className="font-black text-lg">
                      Bhiwandi Warehouse, Zone 4
                    </p>
                    <p className="text-sm underline cursor-pointer hover:text-[#FF8C00]">
                      View on Map
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-500 text-xs uppercase">
                      Cargo
                    </p>
                    <p className="font-black text-lg">Electronics (50 Units)</p>
                    <p className="text-sm">Fragile Handling Required</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <NeoButton className="flex-1 py-3 justify-center">
                  <Navigation className="w-4 h-4 mr-2" /> Start Navigation
                </NeoButton>
                <NeoButton
                  variant="secondary"
                  className="flex-1 py-3 justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" /> Call Supervisor
                </NeoButton>
              </div>
            </NeoCard>

            {/* Upcoming Tasks List */}
            <div>
              <h3 className="text-xl font-black uppercase mb-4">
                Upcoming Schedule
              </h3>
              <div className="space-y-3">
                {tasks.slice(1).map((task) => (
                  <NeoCard
                    key={task.id}
                    className="p-4 flex justify-between items-center group cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-100 border-2 border-black group-hover:bg-white transition-colors">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-black text-lg">{task.type}</p>
                        <p className="text-sm font-bold text-gray-500">
                          {task.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black">{task.time}</p>
                      <span className="text-xs bg-gray-200 px-2 py-0.5 uppercase font-bold text-gray-600 border border-gray-400">
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
