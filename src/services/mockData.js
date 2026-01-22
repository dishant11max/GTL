import { addMinutes, subHours } from "date-fns";

// Constants
const LOCATIONS = {
  DistroCenter: { lat: 40.7128, lng: -74.006, address: "Central Hub, NY" },
  Midtown: { lat: 40.7549, lng: -73.984, address: "123 Broadway, NY" },
  Downtown: { lat: 40.7074, lng: -74.0113, address: "55 Wall St, NY" },
  Brooklyn: { lat: 40.6782, lng: -73.9442, address: "400 Atlantic Ave, BK" },
  Queens: { lat: 40.7282, lng: -73.7949, address: "Main St, Queens" },
};

const NAMES = [
  "Alex Rivera",
  "Jordan Lee",
  "Casey Smith",
  "Taylor Doe",
  "Morgan Kim",
];
const CUSTOMERS = [
  "TechCorp Inc.",
  "Fresh Foods Ltd.",
  "Global Logistics",
  "Home Base",
  "Retail Giants",
];

// Generators
export const generateOrders = (count) => {
  return Array.from({ length: count }).map((_, i) => {
    const isPriority = Math.random() > 0.8;
    return {
      id: `ORD-${1000 + i}`,
      customerName: CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)],
      pickup: LOCATIONS.DistroCenter,
      drop: Object.values(LOCATIONS)[
        Math.floor(Math.random() * Object.values(LOCATIONS).length)
      ],
      weight: Math.floor(Math.random() * 50) + 5,
      priority: isPriority ? "HIGH" : "NORMAL",
      status: "PENDING",
      createdAt: subHours(
        new Date(),
        Math.floor(Math.random() * 24),
      ).toISOString(),
      timeline: {
        created: subHours(
          new Date(),
          Math.floor(Math.random() * 24),
        ).toISOString(),
      },
    };
  });
};

export const generateDrivers = () => {
  return NAMES.map((name, i) => ({
    id: `DRV-${100 + i}`,
    name,
    phone: `+1 (555) 010-${100 + i}`,
    status: i < 3 ? "BUSY" : "IDLE",
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    vehicle: {
      model: "Mercedes Sprinter",
      plate: `ABC-${100 + i}`,
      capacity: 1000,
    },
    location: Object.values(LOCATIONS)[i % Object.values(LOCATIONS).length],
    metrics: {
      rating: 4.5 + Math.random() * 0.5,
      completedTrips: 120 + Math.floor(Math.random() * 50),
      totalDistance: 1500 + Math.floor(Math.random() * 1000),
      fuelEfficiency: 8.5,
    },
    lastUpdate: new Date().toISOString(),
  }));
};

export const generateTrips = (drivers, orders) => {
  // Simple Mock: Create 2 trips
  return drivers.slice(0, 2).map((driver, i) => ({
    id: `TRIP-${200 + i}`,
    driverId: driver.id,
    status: "ACTIVE",
    stops: [
      {
        id: `STOP-${i}-1`,
        orderId: orders[i].id,
        type: "PICKUP",
        location: orders[i].pickup,
        status: "COMPLETED",
      },
      {
        id: `STOP-${i}-2`,
        orderId: orders[i].id,
        type: "DROP",
        location: orders[i].drop,
        status: "PENDING",
      },
    ],
    totalDistance: 12.5,
    startTime: subHours(new Date(), 1).toISOString(),
  }));
};
