'use strict';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_MAX_CLIENTS,
  DB_IDLE_TIMEOUT,
  DB_CONNECTION_TIMEOUT,
} = require('../config');

const { Pool } = require('pg');

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  max: DB_MAX_CLIENTS,
  idleTimeoutMillis: DB_IDLE_TIMEOUT,
  connectionTimeoutMillis: DB_CONNECTION_TIMEOUT,
});

module.exports = { pool };
