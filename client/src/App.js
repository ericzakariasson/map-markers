import React, { useState } from 'react';
import formatMathematicalPattern from './formatMathematicalPattern';
import { Map, TileLayer } from 'react-leaflet';
import useLocation from './useLocation';
import Pin from './components/Pin';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function positionToMarker(position) {
  return position && position.coords
    ? {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        text: 'My location',
      }
    : null;
}

const App = () => {
  const [showMarkers, setShowMarkers] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const { position, getPosition, clearPosition } = useLocation();

  const fetchMarkers = async () => {
    const res = await fetch(`${API_URL}/markers`);
    const { data } = await res.json();
    setMarkers(data);
    setFetched(true);
  };

  const handleShowMarkers = async () => {
    setClickCount(clickCount + 1);
    if (!fetched) {
      await fetchMarkers();
    }
    setShowMarkers(true);
  };
  const handleHideMarkers = () => {
    setShowMarkers(false);
    setFetched(false);
    clearPosition();
  };

  const thirdClick = clickCount > 0 && clickCount % 3 === 0;

  const positionMarker = positionToMarker(position);

  const calculatedMarkers = thirdClick
    ? formatMathematicalPattern(markers)
    : markers;

  return (
    <div className="wrapper">
      <div className="overlay">
        <button className="button read" onClick={handleShowMarkers}>
          READ
        </button>
        <button className="button clear" onClick={handleHideMarkers}>
          CLEAR
        </button>
        <button className="button get-position" onClick={getPosition}>
          MY LOCATION
        </button>
      </div>
      <Map center={[0, 0]} zoom={2}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {showMarkers &&
          calculatedMarkers.map(marker => <Pin marker={marker} />)}
        {position && <Pin marker={positionMarker} />}
      </Map>
    </div>
  );
};

export default App;
