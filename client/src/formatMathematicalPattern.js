export default function formatMathematicalPattern(markers) {
  // Longitude range is 360
  const width = 360 / markers.length;
  return markers.map((marker, i) => {
    const x = i * width - 180;
    const y = width * Math.sin(x) + x / 2;

    return {
      ...marker,
      lat: y,
      long: x,
    };
  });
}
