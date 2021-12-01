const pw = require('../config.js');
const pgp = require('pg-promise')();
const cn = {
  host: '13.57.247.211',
  port: 5432,
  database: 'overview',
  user: 'postgres',
  password: pw.postgrespw,
}
const db = pgp(cn);

module.exports = db;