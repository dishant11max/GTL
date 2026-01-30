import React, { useState } from "react";
import NeoCard from "./NeoCard";
import { TrendingUp, AlertTriangle, Fuel, CheckCircle } from "lucide-react";

const BonusTracker = () => {
  // Mock data - In real app, this would come from backend based on telemetry
  const [stats] = useState({
    potentialBonus: 4500,
    safetyPenalty: 150,
    fuelReward: 300,
    monthlyTarget: 80, // percentage
    currentProgress: 65,
  });

  return (
    <NeoCard className="bg-[#FF8C00] text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-black uppercase mb-1">
            Performance Bonus
          </h3>
          <p className="text-sm font-bold opacity-80">
            Estimated payout this month
          </p>
        </div>
        <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center rounded-full animate-pulse">
          <span className="text-2xl">💰</span>
        </div>
      </div>

      <div className="text-5xl font-black mb-6 tracking-tighter">
        ₹{stats.potentialBonus.toLocaleString()}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold uppercase mb-1">
          <span>Monthly Target</span>
          <span>{stats.currentProgress}% / 100%</span>
        </div>
        <div className="w-full h-4 bg-white border-2 border-black rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-1000"
            style={{ width: `${stats.currentProgress}%` }}
          />
        </div>
        <p className="text-[10px] font-bold mt-1 opacity-70">
          *Reach 80% safety score to unlock full bonus.
        </p>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Negative Impact */}
        <div className="bg-white p-2 border-2 border-black">
          <div className="flex items-center gap-1 text-red-600 font-bold text-xs uppercase mb-1">
            <AlertTriangle className="w-3 h-3" /> Penalties
          </div>
          <p className="font-black text-lg">-₹{stats.safetyPenalty}</p>
          <p className="text-[10px] font-bold text-gray-500 leading-tight">
            3 Hard Braking Events
          </p>
        </div>

        {/* Positive Impact */}
        <div className="bg-white p-2 border-2 border-black">
          <div className="flex items-center gap-1 text-green-600 font-bold text-xs uppercase mb-1">
            <Fuel className="w-3 h-3" /> Fuel Reward
          </div>
          <p className="font-black text-lg">+₹{stats.fuelReward}</p>
          <p className="text-[10px] font-bold text-gray-500 leading-tight">
            Efficient Driving (12km/l)
          </p>
        </div>
      </div>
    </NeoCard>
  );
};

export default BonusTracker;
