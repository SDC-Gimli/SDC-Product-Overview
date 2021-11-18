const pgp = require('pg-promise')();
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'overview',
  user: 'postgres',
  password: '',
}
const db = pgp(cn);

module.exports = db;