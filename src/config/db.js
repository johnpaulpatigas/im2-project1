// src/config/db.js
const serverlessMysql = require("serverless-mysql");

const db = serverlessMysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
  },
});

module.exports = db;
