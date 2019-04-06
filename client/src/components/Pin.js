import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';

const Pin = ({ marker }) => (
  <Marker key={marker.id} position={[marker.lat, marker.long]}>
    <Tooltip>{marker.text}</Tooltip>
  </Marker>
);

export default Pin;
