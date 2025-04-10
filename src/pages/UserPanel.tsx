
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, Info } from "lucide-react";
import { Vehicle, Incident } from '../types';

import PanelNavigation from '../components/layout/PanelNavigation';
import Map from '../components/Map';

interface UserPanelProps {
  vehicles?: Vehicle[];
  incidents?: Incident[];
}

const UserPanel: React.FC<UserPanelProps> = ({ 
  vehicles = [], 
  incidents = [] 
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedVehicleId, setSelectedVehicleId] = React.useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Results",
      description: `Showing results for "${searchQuery}"`,
    });
  };

  const handleTrackVehicle = () => {
    toast({
      title: "Vehicle Tracking",
      description: "You can now track the selected vehicle on the map",
    });
  };

  // Active public transit vehicles (for a public user view)
  const publicVehicles = vehicles.filter(v => v.status === 'active' && v.type !== 'car');

  const selectedVehicle = selectedVehicleId 
    ? vehicles.find(v => v.id === selectedVehicleId)
    : null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PanelNavigation />
      
      <div className="p-4 flex-1 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Public Transit Tracker</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Live Transit Map</CardTitle>
                <CardDescription>
                  Track public transit vehicles in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Map 
                    vehicles={publicVehicles} 
                    incidents={incidents.filter(i => !i.resolved)}
                    selectedVehicleId={selectedVehicleId}
                    onSelectVehicle={setSelectedVehicleId}
                  />
                </div>
              </CardContent>
            </Card>
            
            {selectedVehicle && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{selectedVehicle.name}</CardTitle>
                  <CardDescription>
                    {selectedVehicle.type.charAt(0).toUpperCase() + selectedVehicle.type.slice(1)} Details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Current Status</p>
                      <p className="font-medium capitalize">{selectedVehicle.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Speed</p>
                      <p className="font-medium">{selectedVehicle.speed} km/h</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">
                        {new Date(selectedVehicle.lastUpdated).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {selectedVehicle.position.lat.toFixed(4)}, {selectedVehicle.position.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={handleTrackVehicle}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Track this Vehicle
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find Transit</CardTitle>
                <CardDescription>Search for buses and public transport</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <Input 
                      placeholder="Search by route or vehicle number..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Nearby Transit</CardTitle>
                <CardDescription>Transit vehicles near you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {publicVehicles.slice(0, 5).map((vehicle) => (
                    <div 
                      key={vehicle.id}
                      className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedVehicleId(vehicle.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{vehicle.name}</p>
                          <p className="text-sm text-gray-500 capitalize">
                            {vehicle.type} · {vehicle.status}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {new Date(vehicle.lastUpdated).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => toast({
                  title: "More Transit",
                  description: "This would show more transit options"
                })}>
                  Show More
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Alerts</CardTitle>
                <CardDescription>Current disruptions and delays</CardDescription>
              </CardHeader>
              <CardContent>
                {incidents.filter(i => !i.resolved).length > 0 ? (
                  <div className="space-y-3">
                    {incidents
                      .filter(i => !i.resolved)
                      .slice(0, 3)
                      .map((incident) => (
                        <div key={incident.id} className={`p-3 rounded-md
                          ${incident.severity === 'high' ? 'bg-red-50' : 
                            incident.severity === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'}`
                        }>
                          <div className="flex items-start">
                            <Info className="h-4 w-4 mt-0.5 mr-2" />
                            <div>
                              <p className="font-medium capitalize">{incident.type}</p>
                              <p className="text-sm">{incident.description}</p>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <p>No current service alerts</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
