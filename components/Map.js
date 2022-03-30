import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import Image from "next/image";

const mapIcon = new Icon({
  iconUrl: "./images/location_outline_light.png",
  iconSize: [25, 25],
});

export default function Map(props) {
  return (
    <MapContainer
      style={{ zIndex: 2 }}
      center={[2.0210964593545837, 45.290887463909435]}
      zoom={12}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={mapIcon}
        position={[2.0210964593545837, 45.290887463909435]}
        zIndexOffset={1}
      >
        <Popup>
          <div className="square-50 border border-dark"></div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
