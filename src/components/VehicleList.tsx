
import React from 'react';
import { Vehicle } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VehicleListProps {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({ 
  vehicles, 
  selectedVehicleId, 
  onSelectVehicle 
}) => {
  // Sort vehicles: active first, then by name
  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return a.name.localeCompare(b.name);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'maintenance': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getVehicleEmoji = (type: string) => {
    switch (type) {
      case 'car': return '🚗';
      case 'truck': return '🚚';
      case 'bus': return '🚌';
      default: return '🚗';
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold mb-4">Vehicles ({vehicles.length})</h2>
        
        {sortedVehicles.map((vehicle) => (
          <Card 
            key={vehicle.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedVehicleId === vehicle.id 
                ? 'border-primary border-2' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelectVehicle(vehicle.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getVehicleEmoji(vehicle.type)}</div>
                  <div>
                    <h3 className="font-medium">{vehicle.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(vehicle.status)} mr-2`}></span>
                      <span className="text-sm text-gray-600 capitalize">{vehicle.status}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{vehicle.speed} km/h</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default VehicleList;
