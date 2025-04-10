
import React from 'react';
import { Incident, Vehicle } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Car, Settings, Bell } from "lucide-react";

interface IncidentsListProps {
  incidents: Incident[];
  vehicles: Vehicle[];
  onResolveIncident: (id: string) => void;
  onSelectVehicle: (id: string) => void;
}

const IncidentsList: React.FC<IncidentsListProps> = ({
  incidents,
  vehicles,
  onResolveIncident,
  onSelectVehicle,
}) => {
  // Filter unresolved incidents and sort by severity and timestamp
  const activeIncidents = incidents
    .filter(i => !i.resolved)
    .sort((a, b) => {
      const severityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'accident': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'speeding': return <Car className="h-5 w-5 text-yellow-500" />;
      case 'maintenance': return <Settings className="h-5 w-5 text-blue-500" />;
      case 'alert': return <Bell className="h-5 w-5 text-purple-500" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-app-danger">High</Badge>;
      case 'medium':
        return <Badge className="bg-app-warning text-black">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-yellow-400 text-yellow-600">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getVehicleName = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.name : 'Unknown Vehicle';
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-bold mb-4">Active Incidents ({activeIncidents.length})</h2>
        
        {activeIncidents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No active incidents</p>
          </div>
        ) : (
          activeIncidents.map((incident) => (
            <Card key={incident.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">{getIncidentIcon(incident.type)}</div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium capitalize">{incident.type}</h3>
                        {getSeverityBadge(incident.severity)}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{incident.description}</p>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-xs text-blue-600" 
                          onClick={() => {
                            const vehicle = vehicles.find(v => v.id === incident.vehicleId);
                            if (vehicle) onSelectVehicle(vehicle.id);
                          }}
                        >
                          {getVehicleName(incident.vehicleId)}
                        </Button>
                        <span className="text-xs text-gray-400">
                          {new Date(incident.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onResolveIncident(incident.id);
                    }}
                  >
                    Resolve
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default IncidentsList;
