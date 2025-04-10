
export interface Vehicle {
  id: string;
  name: string;
  type: "car" | "truck" | "bus";
  status: "active" | "idle" | "maintenance";
  position: {
    lat: number;
    lng: number;
  };
  speed: number;
  heading: number;
  lastUpdated: string;
}

export interface Incident {
  id: string;
  vehicleId: string;
  type: "accident" | "speeding" | "maintenance" | "alert";
  position: {
    lat: number;
    lng: number;
  };
  severity: "low" | "medium" | "high";
  timestamp: string;
  description: string;
  resolved: boolean;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
