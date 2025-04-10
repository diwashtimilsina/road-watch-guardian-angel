
import { Map } from "leaflet";

declare module "react-leaflet" {
  interface MapContainerProps {
    whenCreated?: (map: Map) => void;
  }
}
