
import React from 'react';
import { Vehicle, Incident } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VehicleDetailProps {
  vehicle: Vehicle | null;
  incidents: Incident[];
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({ vehicle, incidents }) => {
  if (!vehicle) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Select a vehicle to view details</p>
      </div>
    );
  }

  const vehicleIncidents = incidents
    .filter(incident => incident.vehicleId === vehicle.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'idle': return 'bg-yellow-500 text-black';
      case 'maintenance': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
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
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getVehicleEmoji(vehicle.type)}</span>
                <CardTitle>{vehicle.name}</CardTitle>
              </div>
              <Badge className={getStatusColor(vehicle.status)}>
                {vehicle.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Speed</p>
                <p className="font-medium">{vehicle.speed} km/h</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Heading</p>
                <p className="font-medium">{vehicle.heading}°</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{new Date(vehicle.lastUpdated).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-medium text-xs">
                  {vehicle.position.lat.toFixed(6)}, {vehicle.position.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-2">
          <h3 className="text-lg font-medium mb-2">Incident History</h3>
          {vehicleIncidents.length === 0 ? (
            <p className="text-gray-500 text-sm">No incidents recorded</p>
          ) : (
            <div className="space-y-3">
              {vehicleIncidents.map((incident) => (
                <Card key={incident.id} className={incident.resolved ? 'opacity-60' : ''}>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium capitalize text-sm">{incident.type}</h4>
                          <Badge variant={incident.resolved ? "outline" : "default"} className="text-xs">
                            {incident.severity}
                          </Badge>
                          {incident.resolved && <Badge variant="outline" className="text-xs">Resolved</Badge>}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{incident.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(incident.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default VehicleDetail;
