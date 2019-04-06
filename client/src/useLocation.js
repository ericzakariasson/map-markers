import { useState } from 'react';

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export default function useLocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  function clearPosition() {
    setPosition(null);
    setError(null);
  }

  async function initiate() {
    try {
      const position = await getPosition();
      setPosition(position);
    } catch (err) {
      setError(err);
    }
  }

  return { position, error, getPosition: initiate, clearPosition };
}
