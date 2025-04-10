
import React from 'react';
import { Vehicle, Incident } from '../types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, AlertCircle, Settings, Users } from "lucide-react";

import PanelNavigation from '../components/layout/PanelNavigation';
import VehicleList from '../components/VehicleList';

interface AdminPanelProps {
  vehicles?: Vehicle[];
  incidents?: Incident[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  vehicles = [], 
  incidents = [] 
}) => {
  const { toast } = useToast();
  
  const activeVehicles = vehicles.filter(v => v.status === 'active');
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance');
  const activeIncidents = incidents.filter(i => !i.resolved);
  
  const handleAction = (action: string) => {
    toast({
      title: `${action} action triggered`,
      description: "This functionality would be implemented in a real system",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PanelNavigation />
      
      <div className="p-4 flex-1 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Control Panel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Active Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activeVehicles.length}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAction("View fleet")}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Active Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activeIncidents.length}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAction("Manage incidents")}
              >
                Manage Incidents
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{maintenanceVehicles.length}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAction("Schedule maintenance")}
              >
                Schedule
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="vehicles">
          <TabsList className="mb-4">
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vehicles">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Management</CardTitle>
                <CardDescription>
                  View and manage all vehicles in the fleet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleList 
                  vehicles={vehicles} 
                  selectedVehicleId={null}
                  onSelectVehicle={() => {}}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => handleAction("Export data")}
                >
                  Export Data
                </Button>
                <Button
                  onClick={() => handleAction("Add vehicle")}
                >
                  Add Vehicle
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="incidents">
            <Card>
              <CardHeader>
                <CardTitle>Incident Management</CardTitle>
                <CardDescription>
                  View and manage all incident reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {incidents.length > 0 ? (
                    incidents.map(incident => (
                      <div 
                        key={incident.id} 
                        className={`p-3 rounded-md flex justify-between items-center ${
                          incident.resolved ? 'bg-gray-100' : 'bg-red-50'
                        }`}
                      >
                        <div>
                          <p className="font-medium">
                            {incident.type} - {incident.severity} severity
                          </p>
                          <p className="text-sm text-gray-500">
                            {incident.description}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant={incident.resolved ? "outline" : "default"}
                          onClick={() => handleAction(`${incident.resolved ? "View" : "Resolve"} incident`)}
                        >
                          {incident.resolved ? "View Details" : "Resolve"}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p>No incidents to display</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage system users and their access levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6 text-gray-500">
                  <Users className="mr-2 h-5 w-5" />
                  <span>User management features would be implemented here</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleAction("Manage users")}
                >
                  Manage Users
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
