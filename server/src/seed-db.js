const sql = require('mssql');
const config = require('./config');

const LAT_MIN = -90;
const LAT_MAX = 90;

const LONG_MIN = -180;
const LONG_MAX = 180;

function generateMarkers(n = 50) {
  const markers = [];
  for (let i = 0; i < n; i++) {
    const lat = randomIntFromInterval(LAT_MIN, LAT_MAX);
    const long = randomIntFromInterval(LONG_MIN, LONG_MAX);
    const text = randomString();
    markers.push({ lat, long, text });
  }
  return markers;
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomString() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 7) +
    Math.random()
      .toString(36)
      .substring(2, 12)
  );
}

async function insertData(markers) {
  const markerData = generateMarkers(markers);
  await sql.connect(config);
  const table = new sql.Table('#temp_data');
  table.create = true;
  table.columns.add('lat', sql.Int, { nullable: false });
  table.columns.add('long', sql.Int, { nullable: false });
  table.columns.add('text', sql.NVarChar(15), { nullable: false });

  markerData.forEach(marker => table.rows.add(marker.lat, marker.long, marker.text));

  const request = new sql.Request();
  await request.batch('DELETE FROM marker');
  const data = await request.bulk(table);
  await request.execute('merge_bulk_data');
  await request.batch('drop table #temp_data');
  await sql.close();
  return data;
}

const seed = async (markers = 50) => {
  try {
    const data = await insertData(markers);
    console.log('Successfully inserted data');
    process.exit(0);
  } catch (err) {
    throw new Error('Could not insert data: ' + err);
    // process.exit(1);
  }
};

seed();
