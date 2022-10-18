import React from "react";
import { Map as LeafletMap, TileLayer, CircleLayer, OceanLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap, showCirclesOnmap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
	<OceanLayer center={countries[0}.latLong />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
	{showCirclesOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
