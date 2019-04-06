const sql = require('mssql');
const config = require('./config');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days
  'Content-Type': 'application/json'
};

function sendJSON(res, data) {
  res.writeHead(200, headers);
  res.end(JSON.stringify(data));
}

exports.markerController = {
  getMarkers: async (req, res) => {
    try {
      await sql.connect(config);
      const results = await sql.query`SELECT * FROM dbo.marker`;

      const response = {
        data: results.recordset,
        count: results.rowsAffected[0]
      };

      sendJSON(res, response);
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end();
    } finally {
      sql.close();
    }
  }
};

exports.defaultController = {
  GET: (req, res) => {
    res.writeHead(404);
    res.end();
  },
  POST: (req, res) => {
    res.writeHead(404);
    res.end();
  },
  CORS: (req, res) => {
    res.writeHead(204, headers);
    res.end();
  }
};
