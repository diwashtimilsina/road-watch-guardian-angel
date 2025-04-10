
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Vehicle, Incident } from '../types';
import { Icon, DivIcon, LatLngBounds } from 'leaflet';
import L from 'leaflet';

// Fix for Leaflet's icon path issues
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Delete default icon references
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapProps {
  vehicles: Vehicle[];
  incidents: Incident[];
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string) => void;
}

const Map: React.FC<MapProps> = ({
  vehicles,
  incidents,
  selectedVehicleId,
  onSelectVehicle,
}) => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [initialCenter] = useState({
    lat: 39.8283,
    lng: -98.5795, // Center of the US
  });

  useEffect(() => {
    // If a vehicle is selected, center the map on it
    if (selectedVehicleId && mapInstance) {
      const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
      if (selectedVehicle) {
        mapInstance.setView(
          [selectedVehicle.position.lat, selectedVehicle.position.lng],
          mapInstance.getZoom() || 12
        );
      }
    }
  }, [selectedVehicleId, vehicles, mapInstance]);

  const getVehicleIcon = (vehicle: Vehicle) => {
    const isSelected = vehicle.id === selectedVehicleId;
    
    return new DivIcon({
      className: '', // Remove default className
      html: `
        <div class="vehicle-marker ${isSelected ? 'selected-vehicle' : ''}">
          ${vehicle.type === 'car' ? '🚗' : vehicle.type === 'truck' ? '🚚' : '🚌'}
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  const getIncidentIcon = (incident: Incident) => {
    const size = incident.severity === 'high' ? 22 : incident.severity === 'medium' ? 18 : 14;
    
    return new DivIcon({
      className: '',
      html: `
        <div class="incident-icon" style="width: ${size}px; height: ${size}px;">
          ${incident.type === 'accident' ? '💥' : 
            incident.type === 'speeding' ? '⚠️' : 
            incident.type === 'maintenance' ? '🔧' : '❗'}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-app-danger';
      case 'medium': return 'bg-app-warning';
      case 'low': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <MapContainer
      center={[initialCenter.lat, initialCenter.lng]}
      zoom={5}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      zoomControl={false}
      whenCreated={setMapInstance}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Vehicle Markers */}
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={[vehicle.position.lat, vehicle.position.lng]}
          icon={getVehicleIcon(vehicle)}
          eventHandlers={{
            click: () => {
              onSelectVehicle(vehicle.id);
            },
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{vehicle.name}</h3>
              <p className="text-sm">Type: {vehicle.type}</p>
              <p className="text-sm">Speed: {vehicle.speed} km/h</p>
              <p className="text-sm">
                Status: 
                <span className={`ml-1 ${
                  vehicle.status === 'active' ? 'text-green-600' : 
                  vehicle.status === 'idle' ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {vehicle.status}
                </span>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* Incident Markers */}
      {incidents.filter(i => !i.resolved).map((incident) => (
        <Marker
          key={incident.id}
          position={[incident.position.lat, incident.position.lng]}
          icon={getIncidentIcon(incident)}
        >
          <Popup>
            <div className="p-2">
              <div className="flex items-center space-x-2">
                <span className={`inline-block w-3 h-3 rounded-full ${getSeverityColor(incident.severity)}`}></span>
                <h3 className="font-bold capitalize">{incident.type}</h3>
              </div>
              <p className="text-sm">{incident.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(incident.timestamp).toLocaleString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
