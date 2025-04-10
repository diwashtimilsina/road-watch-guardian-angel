
import { Vehicle, Incident } from "../types";

// Generate initial mock vehicles
export const generateMockVehicles = (count: number): Vehicle[] => {
  const vehicles: Vehicle[] = [];
  
  // Define areas for vehicles to be positioned
  const areas = [
    { center: { lat: 40.7128, lng: -74.0060 }, radius: 0.1 }, // New York
    { center: { lat: 34.0522, lng: -118.2437 }, radius: 0.1 }, // Los Angeles
    { center: { lat: 41.8781, lng: -87.6298 }, radius: 0.1 }, // Chicago
  ];
  
  const vehicleTypes: ["car", "truck", "bus"] = ["car", "truck", "bus"];
  const statusTypes: ["active", "idle", "maintenance"] = ["active", "idle", "maintenance"];
  
  for (let i = 0; i < count; i++) {
    // Select a random area
    const area = areas[Math.floor(Math.random() * areas.length)];
    
    // Generate random position within the area
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * area.radius;
    const lat = area.center.lat + distance * Math.sin(angle);
    const lng = area.center.lng + distance * Math.cos(angle);
    
    vehicles.push({
      id: `v-${i + 1}`,
      name: `Vehicle ${i + 1}`,
      type: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
      status: statusTypes[Math.floor(Math.random() * statusTypes.length)],
      position: { lat, lng },
      speed: Math.floor(Math.random() * 80),
      heading: Math.floor(Math.random() * 360),
      lastUpdated: new Date().toISOString()
    });
  }
  
  return vehicles;
};

// Generate initial mock incidents
export const generateMockIncidents = (vehicles: Vehicle[], count: number): Incident[] => {
  const incidents: Incident[] = [];
  const incidentTypes: ["accident", "speeding", "maintenance", "alert"] = ["accident", "speeding", "maintenance", "alert"];
  const severityLevels: ["low", "medium", "high"] = ["low", "medium", "high"];
  
  // Select random vehicles for incidents
  const incidentVehicles = [...vehicles]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(count, vehicles.length));
  
  for (let i = 0; i < incidentVehicles.length; i++) {
    const vehicle = incidentVehicles[i];
    const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
    
    let description = "";
    switch (incidentType) {
      case "accident":
        description = "Vehicle collision detected";
        break;
      case "speeding":
        description = "Vehicle exceeding speed limit";
        break;
      case "maintenance":
        description = "Vehicle requires maintenance";
        break;
      case "alert":
        description = "Unusual vehicle behavior detected";
        break;
    }
    
    incidents.push({
      id: `i-${i + 1}`,
      vehicleId: vehicle.id,
      type: incidentType,
      position: { ...vehicle.position },
      severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
      timestamp: new Date().toISOString(),
      description,
      resolved: Math.random() > 0.7 // 30% resolved
    });
  }
  
  return incidents;
};

// Update vehicle positions with small movements
export const updateVehiclePositions = (vehicles: Vehicle[]): Vehicle[] => {
  return vehicles.map(vehicle => {
    if (vehicle.status === "active") {
      // Convert heading from degrees to radians
      const headingRad = (vehicle.heading * Math.PI) / 180;
      
      // Calculate movement based on speed and heading
      // Speed is km/h, converting to degrees (roughly) per update
      const speedFactor = vehicle.speed * 0.00001;
      
      const newLat = vehicle.position.lat + Math.sin(headingRad) * speedFactor;
      const newLng = vehicle.position.lng + Math.cos(headingRad) * speedFactor;
      
      // Occasionally change heading slightly
      let newHeading = vehicle.heading;
      if (Math.random() < 0.2) {
        newHeading = (newHeading + (Math.random() * 30 - 15)) % 360;
        if (newHeading < 0) newHeading += 360;
      }
      
      return {
        ...vehicle,
        position: { lat: newLat, lng: newLng },
        heading: newHeading,
        lastUpdated: new Date().toISOString()
      };
    }
    return vehicle;
  });
};

// Generate a new random incident
export const generateRandomIncident = (vehicles: Vehicle[]): Incident | null => {
  if (vehicles.length === 0 || Math.random() > 0.05) {
    return null; // 5% chance of incident
  }
  
  const vehicleIndex = Math.floor(Math.random() * vehicles.length);
  const vehicle = vehicles[vehicleIndex];
  
  const incidentTypes: ["accident", "speeding", "maintenance", "alert"] = ["accident", "speeding", "maintenance", "alert"];
  const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
  const severityLevels: ["low", "medium", "high"] = ["low", "medium", "high"];
  
  let description = "";
  switch (incidentType) {
    case "accident":
      description = "Vehicle collision detected";
      break;
    case "speeding":
      description = "Vehicle exceeding speed limit";
      break;
    case "maintenance":
      description = "Vehicle requires maintenance";
      break;
    case "alert":
      description = "Unusual vehicle behavior detected";
      break;
  }
  
  return {
    id: `i-${Date.now()}`,
    vehicleId: vehicle.id,
    type: incidentType,
    position: { ...vehicle.position },
    severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
    timestamp: new Date().toISOString(),
    description,
    resolved: false
  };
};
