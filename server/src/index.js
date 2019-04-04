const sql = require('mssql');
const config = require('./config');

const init = async () => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT name FROM sys.databases`;
    console.dir(result);
  } catch (err) {
    console.error(err);
  }
};

init();
