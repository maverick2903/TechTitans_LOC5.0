import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapMarker({ coordinates, companyName, centerLocation }) {
  /*   const [coordinates, setCoordinates] = useState([
    [51.505, -0.09],
    [51.507, -0.12],
    [51.51, -0.1],
  ]); */
  const [mapData, setmapData] = useState([]);
  console.log(mapData);
  useEffect(() => {
    setmapData([{ coordinates: coordinates, companyName: companyName }]);
  }, []);

  return (
    <MapContainer
      center={centerLocation}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapData.map((data, index) => (
        <Marker key={index} position={data.coordinates}>
          {console.log(data)}
          <Popup>
            {data.companyName} <br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapMarker;
