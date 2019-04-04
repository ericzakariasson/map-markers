const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'SuperSecret111',
  server: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'marker'
};

module.exports = config;
