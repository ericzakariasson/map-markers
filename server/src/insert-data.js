const sql = require('mssql');
const config = require('./config');

const LAT_MIN = -90;
const LAT_MAX = 90;

const LONG_MIN = -180;
const LONG_MAX = 180;

function generateMarkers(n = 100) {
  const markers = [];
  for (let i = 0; i < n; i++) {
    const lat = randomIntFromInterval(LAT_MIN, LAT_MAX);
    const long = randomIntFromInterval(LONG_MIN, LONG_MAX);
    markers.push({ lat, long });
  }
  return markers;
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const markers = generateMarkers(10);
console.log(markers);

// const init = async () => {
//   try {
//     await sql.connect(config);
//     const result = await sql.query`SELECT name FROM sys.databases`;
//     console.dir(result);
//   } catch (err) {
//     console.error(err);
//   }
// };

// init();
