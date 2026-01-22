export type OrderStatus = 'PENDING' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
export type OrderPriority = 'NORMAL' | 'HIGH' | 'CRITICAL';
export type DriverStatus = 'IDLE' | 'BUSY' | 'OFFLINE';
export type TripStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Order {
  id: string;
  customerName: string;
  pickup: Location;
  drop: Location;
  weight: number; // kg
  priority: OrderPriority;
  status: OrderStatus;
  createdAt: string;
  assignedDriverId?: string;
  timeline: {
    created: string;
    assigned?: string;
    pickedUp?: string;
    delivered?: string;
  };
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  status: DriverStatus;
  avatarUrl: string;
  vehicle: {
    model: string;
    plate: string;
    capacity: number; // kg
  };
  location: Location;
  currentTripId?: string;
  metrics: {
    rating: number; // 0-5
    completedTrips: number;
    totalDistance: number; // km
    fuelEfficiency: number; // km/l (mock)
  };
  lastUpdate: string;
}

export interface Stop {
  id: string;
  orderId: string;
  type: 'PICKUP' | 'DROP';
  location: Location;
  status: 'PENDING' | 'COMPLETED' | 'SKIPPED';
  eta?: string;
}

export interface Trip {
  id: string;
  driverId: string;
  status: TripStatus;
  stops: Stop[];
  routePolyline?: string; // encoded polyline or mock path
  totalDistance: number;
  startTime?: string;
  endTime?: string;
}

export interface Alert {
  id: string;
  type: 'GEOFENCE' | 'OVERSPEED' | 'DELAY' | 'IDLE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  driverId: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}
