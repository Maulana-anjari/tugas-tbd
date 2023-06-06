const Pool = require('pg').Pool
const pool = new Pool({
  user: 'maul',
  host: '52.249.179.161',
  database: 'grb',
  password: '1-2-3-4',
  port: 5432,
});

module.exports = pool;