import React from "react";
import NeoCard from "./NeoCard";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <NeoCard key={i} className="bg-white">
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="h-10 w-10 bg-gray-200" />
            </div>
            <Skeleton className="h-10 w-24 bg-gray-200 mb-2" />
            <Skeleton className="h-4 w-32 bg-gray-100" />
          </NeoCard>
        ))}
      </div>

      {/* Active Shipments Skeleton */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-64 bg-gray-200" />
          <Skeleton className="h-6 w-24 bg-gray-200" />
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <NeoCard
              key={i}
              className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-white"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Skeleton className="h-16 w-16 bg-gray-200" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32 bg-gray-200" />
                  <Skeleton className="h-4 w-24 bg-gray-100" />
                </div>
              </div>
              <div className="flex gap-8 w-full md:w-auto flex-1 justify-center">
                <Skeleton className="h-12 w-32 bg-gray-100" />
                <Skeleton className="h-12 w-32 bg-gray-100" />
              </div>
              <Skeleton className="h-10 w-24 bg-gray-200" />
            </NeoCard>
          ))}
        </div>
      </div>
    </div>
  );
};
