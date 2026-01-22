import React, { useEffect, useState } from "react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";
import NeoButton from "@/components/neo/NeoButton";
import { getServices } from "@/services/api";
import { ArrowUpRight } from "lucide-react";

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <NeoLayout>
      <div className="container mx-auto px-6">
        <header className="mb-20 text-center">
          <div className="inline-block px-4 py-1 bg-black text-white font-bold uppercase tracking-widest mb-4">
            Our Offerings
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-6">
            Logistics{" "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808]"
              style={{ WebkitTextStroke: "2px black" }}
            >
              Solutions
            </span>
          </h1>
          <p className="text-2xl font-medium max-w-3xl mx-auto">
            From first mile to last mile, we have engineered the most robust
            supply chain network in India.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <NeoCard
              key={service.id}
              className="flex flex-col h-full bg-[#FAFAFA] hover:bg-white"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-6xl">{service.icon}</span>
                <span className="px-3 py-1 border-2 border-black font-bold bg-[#FF9933]">
                  {service.price}
                </span>
              </div>
              <h3 className="text-4xl font-black uppercase mb-4">
                {service.title}
              </h3>
              <p className="text-xl font-medium mb-8 flex-grow opacity-80">
                {service.description}
              </p>
              <NeoButton className="w-full flex justify-between items-center group">
                GET QUOTE{" "}
                <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
              </NeoButton>
            </NeoCard>
          ))}
        </div>

        <section className="mt-20 border-t-4 border-black pt-12 text-center">
          <h2 className="text-4xl font-black uppercase mb-8">
            Need a custom solution?
          </h2>
          <NeoButton variant="dark" className="mx-auto text-xl px-12 py-4">
            TALK TO SALES
          </NeoButton>
        </section>
      </div>
    </NeoLayout>
  );
};

export default ServicesPage;
