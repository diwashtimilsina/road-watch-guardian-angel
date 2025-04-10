
import React, { useState, useEffect } from 'react';
import { Vehicle, Incident } from '../types';
import { generateMockVehicles, generateMockIncidents, updateVehiclePositions, generateRandomIncident } from '../services/mockData';

import Header from './Header';
import Map from './Map';
import VehicleList from './VehicleList';
import IncidentsList from './IncidentsList';
import VehicleDetail from './VehicleDetail';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize data
  useEffect(() => {
    const initialVehicles = generateMockVehicles(12);
    const initialIncidents = generateMockIncidents(initialVehicles, 5);
    
    setVehicles(initialVehicles);
    setIncidents(initialIncidents);
  }, []);

  // Update vehicle positions periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setVehicles(prev => updateVehiclePositions(prev));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // Generate random incidents occasionally
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIncident = generateRandomIncident(vehicles);
      
      if (newIncident) {
        setIncidents(prev => [...prev, newIncident]);
        
        // Show toast notification for new incidents
        toast({
          title: `New ${newIncident.type} detected`,
          description: `${newIncident.description} for ${
            vehicles.find(v => v.id === newIncident.vehicleId)?.name || "Unknown Vehicle"
          }`,
          variant: newIncident.severity === 'high' ? "destructive" : undefined,
        });
      }
    }, 15000);

    return () => clearInterval(intervalId);
  }, [vehicles, toast]);

  const handleSelectVehicle = (id: string) => {
    setSelectedVehicleId(id);
  };

  const handleResolveIncident = (id: string) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === id 
          ? { ...incident, resolved: true } 
          : incident
      )
    );
    
    toast({
      title: "Incident resolved",
      description: "The incident has been marked as resolved.",
    });
  };

  const handleRefresh = () => {
    setVehicles(prev => updateVehiclePositions(prev));
  };

  const selectedVehicle = selectedVehicleId 
    ? vehicles.find(v => v.id === selectedVehicleId) || null
    : null;
    
  const activeIncidents = incidents.filter(i => !i.resolved);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header 
        activeIncidentsCount={activeIncidents.length} 
        vehiclesCount={vehicles.length} 
        onRefresh={handleRefresh}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-72 border-r border-gray-200 bg-white flex flex-col">
          <VehicleList 
            vehicles={vehicles} 
            selectedVehicleId={selectedVehicleId}
            onSelectVehicle={handleSelectVehicle}
          />
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <Map 
              vehicles={vehicles} 
              incidents={incidents}
              selectedVehicleId={selectedVehicleId}
              onSelectVehicle={handleSelectVehicle}
            />
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
          <div className="flex-1">
            <VehicleDetail vehicle={selectedVehicle} incidents={incidents} />
          </div>
          <Separator />
          <div className="h-1/2">
            <IncidentsList 
              incidents={incidents}
              vehicles={vehicles}
              onResolveIncident={handleResolveIncident}
              onSelectVehicle={handleSelectVehicle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
