import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Truck,
  LogOut,
  BarChart3,
} from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";
import NeoButton from "@/components/neo/NeoButton";
import AnalyticsDashboard from "@/components/neo/AnalyticsDashboard";
import OperationsDashboard from "@/components/neo/OperationsDashboard";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("quotes");
  const [dataLoading, setDataLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // If auth is done loading and no user, fetch redirect
    if (!authLoading && !user) {
      navigate("/admin-login");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    // Analytics and Operations have their own data or handles loading internal mock data, so we can skip fetch for it
    if (activeTab === "analytics" || activeTab === "operations") {
      setDataLoading(false);
      return;
    }

    setDataLoading(true);
    try {
      if (activeTab === "quotes") {
        const { data } = await supabase
          .from("quotes")
          .select("*")
          .order("created_at", { ascending: false });
        setQuotes(data || []);
      } else if (activeTab === "drivers") {
        const { data } = await supabase
          .from("drivers")
          .select("*")
          .order("created_at", { ascending: false });
        setDrivers(data || []);
      } else if (activeTab === "contacts") {
        const { data } = await supabase
          .from("contacts")
          .select("*")
          .order("created_at", { ascending: false });
        setContacts(data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const SidebarItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 p-4 font-bold border-l-4 transition-all ${
        activeTab === id
          ? "border-[#FF8C00] bg-gray-50 text-[#FF8C00]"
          : "border-transparent hover:bg-gray-50 text-gray-600"
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <NeoLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <NeoCard className="bg-white p-0 overflow-hidden sticky top-24">
              <div className="p-6 border-b-2 border-gray-100">
                <h2 className="text-xl font-black uppercase flex items-center gap-2">
                  <LayoutDashboard className="w-6 h-6" /> Admin
                </h2>
              </div>
              <div className="py-2">
                <SidebarItem id="quotes" label="Quotes" icon={FileText} />
                <SidebarItem
                  id="analytics"
                  label="Analytics"
                  icon={BarChart3}
                />
                <SidebarItem id="operations" label="Live Ops" icon={MapPin} />
                <SidebarItem id="drivers" label="Drivers" icon={Users} />
                <SidebarItem
                  id="contacts"
                  label="Messages"
                  icon={MessageSquare}
                />
              </div>
              <div className="border-t-2 border-gray-100 p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 font-bold text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </NeoCard>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-3xl font-black uppercase">
                {activeTab === "quotes" && "Quote Requests"}
                {activeTab === "drivers" && "Driver Pilots"}
                {activeTab === "contacts" && "Contact Messages"}
                {activeTab === "analytics" && "Smart Analytics"}
                {activeTab === "operations" && "Real-Time Operations"}
              </h1>
              <NeoButton
                variant="secondary"
                onClick={fetchData}
                className="!py-2"
              >
                Refresh
              </NeoButton>
            </div>

            {/* ANALYTICS TAB */}
            {activeTab === "analytics" && <AnalyticsDashboard />}

            {/* OPERATIONS TAB */}
            {activeTab === "operations" && <OperationsDashboard />}

            {dataLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-12 h-12 border-4 border-[#FF8C00] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="font-bold text-gray-500">Loading data...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* QUOTES LIST */}
                {activeTab === "quotes" && (
                  <>
                    {quotes.length === 0 ? (
                      <div className="text-center py-20 bg-gray-50 border-4 border-dashed border-gray-200">
                        <p className="font-bold text-gray-500">
                          No quotes found
                        </p>
                      </div>
                    ) : (
                      quotes.map((quote) => (
                        <NeoCard
                          key={quote.id}
                          className="bg-white hover:translate-x-1 hover:-translate-y-1 transition-transform"
                        >
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-black text-lg">
                                  #{quote.id.slice(0, 8).toUpperCase()}
                                </span>
                                <span
                                  className={`px-2 py-0.5 text-xs font-bold uppercase border ${getStatusColor(quote.status)}`}
                                >
                                  {quote.status}
                                </span>
                                <span className="text-sm text-gray-400 font-medium flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(
                                    quote.created_at,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <p className="text-xs font-bold text-gray-400 uppercase">
                                    Route
                                  </p>
                                  <p className="font-bold text-lg flex items-center gap-2">
                                    {quote.pickup_city}{" "}
                                    <ChevronRight className="w-4 h-4 text-gray-400" />{" "}
                                    {quote.delivery_city}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-gray-400 uppercase">
                                    Customer
                                  </p>
                                  <p className="font-bold">
                                    {quote.customer_name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {quote.customer_phone}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-gray-400 uppercase">
                                    Cargo
                                  </p>
                                  <p className="font-bold">
                                    {quote.cargo_type} ({quote.weight}kg)
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-gray-400 uppercase">
                                    Vehicle
                                  </p>
                                  <p className="font-bold capitalize">
                                    {quote.vehicle_type?.replace("-", " ")}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
                              <a
                                href={`tel:${quote.customer_phone}`}
                                className="flex items-center gap-2 font-bold text-sm hover:text-[#FF8C00]"
                              >
                                <Phone className="w-4 h-4" /> Call Customer
                              </a>
                            </div>
                          </div>
                        </NeoCard>
                      ))
                    )}
                  </>
                )}

                {/* DRIVERS LIST */}
                {activeTab === "drivers" && (
                  <>
                    {drivers.length === 0 ? (
                      <div className="text-center py-20 bg-gray-50 border-4 border-dashed border-gray-200">
                        <p className="font-bold text-gray-500">
                          No drivers registered yet
                        </p>
                      </div>
                    ) : (
                      drivers.map((driver) => (
                        <NeoCard key={driver.id} className="bg-white">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center font-black text-xl border-2 border-black">
                              {driver.name?.[0] || "D"}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-black text-lg">
                                {driver.name}
                              </h3>
                              <div className="flex flex-wrap gap-4 mt-2 text-sm font-medium text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" /> {driver.email}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" />{" "}
                                  {driver.phone || "No phone"}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Truck className="w-4 h-4" />{" "}
                                  {driver.vehicle_number || "No vehicle"}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`px-3 py-1 text-xs font-bold uppercase border ${getStatusColor(driver.status)}`}
                            >
                              {driver.status?.replace("_", " ")}
                            </div>
                          </div>
                        </NeoCard>
                      ))
                    )}
                  </>
                )}

                {/* CONTACTS LIST */}
                {activeTab === "contacts" && (
                  <>
                    {contacts.length === 0 ? (
                      <div className="text-center py-20 bg-gray-50 border-4 border-dashed border-gray-200">
                        <p className="font-bold text-gray-500">
                          No messages found
                        </p>
                      </div>
                    ) : (
                      contacts.map((msg) => (
                        <NeoCard key={msg.id} className="bg-white">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-black text-lg">
                              {msg.subject}
                            </h3>
                            <span className="text-xs font-bold text-gray-400">
                              {new Date(msg.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="font-medium text-gray-800 mb-4 bg-gray-50 p-3 border-l-4 border-gray-300">
                            "{msg.message}"
                          </p>
                          <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" /> {msg.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" /> {msg.email}
                            </span>
                            {msg.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" /> {msg.phone}
                              </span>
                            )}
                          </div>
                        </NeoCard>
                      ))
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </NeoLayout>
  );
};

export default AdminDashboardPage;
