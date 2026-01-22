import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  MapPin,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoButton from "@/components/neo/NeoButton";
import NeoCard from "@/components/neo/NeoCard";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <NeoLayout>
      {/* Hero Section */}
      <header className="pt-8 pb-20 px-6 container mx-auto text-center max-w-5xl">
        <div className="inline-block mb-6 px-4 py-2 bg-[#FF9933] border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
          NOW LIVE IN MUMBAI & DELHI
        </div>
        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter uppercase">
          India's Fastest <br />
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-black to-[#138808] stroke-black"
            style={{ WebkitTextStroke: "2px black" }}
          >
            Logistics Network
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed border-l-4 border-black pl-6 text-left md:text-center md:border-none md:pl-0">
          Connect with 10,000+ verified pilots across 50+ cities. Real-time
          tracking, instant payouts, and zero commission tailored for the Indian
          market.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <NeoButton
            onClick={() => navigate("/driver/login")}
            className="w-full md:w-auto text-xl py-4 px-8"
          >
            JOIN AS DRIVER <Truck className="w-6 h-6" />
          </NeoButton>
          <NeoButton
            variant="secondary"
            className="w-full md:w-auto text-xl py-4 px-8"
          >
            BOOK A TRUCK <ArrowRight className="w-6 h-6" />
          </NeoButton>
        </div>
      </header>

      {/* Marquee */}
      <div className="border-y-4 border-black py-4 bg-[#F4F4F5] overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-scroll gap-12 text-2xl font-bold uppercase">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span>⚡ INSTANT PAYOUTS</span>
              <span>📍 LIVE TRACKING</span>
              <span>🛡️ INSURED TRIPS</span>
              <span>🇮🇳 PAN INDIA COVERAGE</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <section className="py-20 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <MapPin className="w-10 h-10" />,
              label: "CITIES COVERED",
              value: "50+",
              color: "bg-[#FF9933]",
            },
            {
              icon: <IndianRupee className="w-10 h-10" />,
              label: "DRIVER EARNINGS",
              value: "₹2Cr+",
              color: "bg-white",
            },
            {
              icon: <ShieldCheck className="w-10 h-10" />,
              label: "SAFE TRIPS",
              value: "100%",
              color: "bg-[#138808]",
              contentClass: "text-white",
            },
          ].map((stat, index) => (
            <NeoCard
              key={index}
              className={`${stat.color} flex flex-col justify-between`}
            >
              <div className="mb-4 bg-black text-white w-16 h-16 flex items-center justify-center border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                {stat.icon}
              </div>
              <div>
                <h3
                  className={`text-5xl font-black mb-2 ${stat.contentClass || ""}`}
                >
                  {stat.value}
                </h3>
                <p
                  className={`font-bold text-xl tracking-widest ${stat.contentClass || ""}`}
                >
                  {stat.label}
                </p>
              </div>
            </NeoCard>
          ))}
        </div>
      </section>

      {/* Features / Locations */}
      <section className="py-20 bg-black text-white border-t-4 border-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-gray-700 pb-6">
            <h2 className="text-5xl md:text-6xl font-black uppercase">
              Operating <br />
              <span className="text-[#FF9933]">Hubs</span>
            </h2>
            <div className="text-right mt-4 md:mt-0">
              <NeoButton variant="primary" onClick={() => navigate("/hubs")}>
                VIEW ALL HUBS <ArrowRight className="w-4 h-4" />
              </NeoButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "MUMBAI",
              "DELHI NCR",
              "BANGALORE",
              "HYDERABAD",
              "CHENNAI",
              "PUNE",
              "KOLKATA",
              "AHMEDABAD",
            ].map((city) => (
              <div
                key={city}
                className="group relative overflow-hidden border-2 border-white p-6 hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold">{city}</h4>
                <p className="text-sm font-mono mt-2 opacity-60 group-hover:opacity-100">
                  Hub Active • 24/7
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </NeoLayout>
  );
};

export default HomePage;
