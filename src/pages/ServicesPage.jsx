import React, { useState } from "react";
import {
  Truck,
  Package,
  Zap,
  Thermometer,
  Clock,
  ArrowRight,
} from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";
import NeoButton from "@/components/neo/NeoButton";
import QuoteModal from "@/components/neo/QuoteModal";

const ServicesPage = () => {
  const services = [
    {
      title: "FULL TRUCK LOAD",
      icon: <Truck className="w-12 h-12 mb-4" />,
      desc: [
        "Pan-India Coverage",
        "9-32 MT Capacity",
        "Real-time GPS Tracking",
      ],
      eta: "2-4 Days",
      price: "Dynamic",
    },
    {
      title: "PART TRUCK LOAD",
      icon: <Package className="w-12 h-12 mb-4" />,
      desc: [
        "Cost-effective for small loads",
        "Door-to-door delivery",
        "Consolidated transport",
      ],
      eta: "3-6 Days",
      price: "Per Kg",
    },
    {
      title: "EXPRESS DELIVERY",
      icon: <Zap className="w-12 h-12 mb-4" />,
      desc: [
        "Time-critical shipments",
        "Dedicated vehicles",
        "Priority handling",
      ],
      eta: "24-48 Hrs",
      price: "Premium",
    },
    {
      title: "COLD CHAIN",
      icon: <Thermometer className="w-12 h-12 mb-4" />,
      desc: [
        "Temperature controlled",
        "-25°C to +25°C",
        "Pharma & Perishables",
      ],
      eta: "Custom",
      price: "Fixed",
    },
  ];

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <NeoLayout>
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
      <div className="container mx-auto px-6">
        <div className="mb-12 border-b-4 border-black pb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4">
            Our <span className="text-[#FF8C00]">Services</span>
          </h1>
          <p className="text-xl font-medium max-w-2xl">
            Robust logistics solutions tailored for the Indian market. Reliable,
            tracked, and insured.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <NeoCard
              key={index}
              className="h-full flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-200"
            >
              <div>
                <div className="bg-[#FF8C00] w-20 h-20 border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">
                  {service.title}
                </h3>
                <ul className="space-y-3 mb-8">
                  {service.desc.map((item, i) => (
                    <li key={i} className="flex items-center text-lg font-bold">
                      <div className="w-2 h-2 bg-black mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex gap-4 mb-6 text-sm font-black uppercase">
                  <span className="bg-[#22C55E] px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
                    ETA: {service.eta}
                  </span>
                  <span className="bg-white px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {service.price}
                  </span>
                </div>
                <NeoButton
                  className="w-full justify-between group-hover:bg-black group-hover:text-white transition-colors"
                  onClick={() => setQuoteModalOpen(true)}
                >
                  GET QUOTE <ArrowRight className="w-5 h-5" />
                </NeoButton>
              </div>
            </NeoCard>
          ))}
        </div>

        {/* Smart Logistics Tech Section */}
        <div className="mb-20">
          <div className="mb-12 border-b-4 border-black pb-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
              Smart <span className="text-[#22C55E]">Logistics Tech</span>
            </h2>
            <p className="text-xl font-medium max-w-2xl">
              Leveraging AI and IoT to drive efficiency, safety, and
              sustainability in every mile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI Route Optimization */}
            <NeoCard className="bg-white hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-4 border-2 border-black">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase mb-2">
                AI Route Optimization
              </h3>
              <p className="font-medium text-gray-600">
                Algorithms that predict traffic and reduce travel time by up to
                25%.
              </p>
            </NeoCard>

            {/* Real-time GPS */}
            <NeoCard className="bg-white hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-16 h-16 bg-[#FF8C00] text-black flex items-center justify-center mb-4 border-2 border-black">
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-white rounded-full animate-ping top-0 right-0"></div>
                  <Truck className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-black uppercase mb-2">
                Real-Time GPS
              </h3>
              <p className="font-medium text-gray-600">
                Live vehicle tracking with millisecond latency for precise ETA.
              </p>
            </NeoCard>

            {/* Fuel Analytics */}
            <NeoCard className="bg-white hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-16 h-16 bg-[#22C55E] text-white flex items-center justify-center mb-4 border-2 border-black">
                <Thermometer className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase mb-2">
                Fuel Analytics
              </h3>
              <p className="font-medium text-gray-600">
                IoT sensors helping reduce fuel wastage and carbon footprint.
              </p>
            </NeoCard>

            {/* Driver Performance */}
            <NeoCard className="bg-white hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-16 h-16 bg-white text-black flex items-center justify-center mb-4 border-2 border-black">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase mb-2">
                Driver Scorecard
              </h3>
              <p className="font-medium text-gray-600">
                Gamified performance metrics to ensure safety and efficiency.
              </p>
            </NeoCard>
          </div>
        </div>
      </div>
    </NeoLayout>
  );
};

export default ServicesPage;
