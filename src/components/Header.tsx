
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  activeIncidentsCount: number;
  vehiclesCount: number;
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeIncidentsCount, vehiclesCount, onRefresh }) => {
  const { toast } = useToast();

  const handleRefresh = () => {
    onRefresh();
    toast({
      title: "Data refreshed",
      description: "Vehicle data has been updated",
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-app-blue" />
          <h1 className="text-xl font-bold">Road<span className="text-app-teal">Watch</span></h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="bg-app-blue text-white rounded-full w-8 h-8 flex items-center justify-center">
              {vehiclesCount}
            </div>
            <span className="text-sm">Vehicles</span>
          </div>
          
          {activeIncidentsCount > 0 && (
            <div className="flex items-center space-x-1">
              <div className="bg-app-danger text-white rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                {activeIncidentsCount}
              </div>
              <span className="text-sm">Incidents</span>
            </div>
          )}
          
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
