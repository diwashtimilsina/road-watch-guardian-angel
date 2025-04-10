
import { Map, Marker, TileLayer } from "leaflet";

// Extend leaflet type definitions
declare module "react-leaflet" {
  interface MapContainerProps {
    center?: [number, number];
    zoom?: number;
    whenCreated?: (map: Map) => void;
    zoomControl?: boolean;
  }
  
  interface TileLayerProps {
    attribution?: string;
    url?: string;
  }
  
  interface MarkerProps {
    position?: [number, number];
    icon?: any;
    eventHandlers?: any;
  }
}
