'use strict';

const { pool } = require('../db');
const { generateSalt, hashPassword } = require('../helpers');

class User {
  constructor({ login, password }) {
    this.login = login;
    this.password = password;
  }

  async register() {
    if (!this.login || !this.password)
      throw new Error('The "login" and "password" fields are required.');
    const salt = generateSalt();
    const hashedPassword = await hashPassword(this.password, salt);
    const dbResult = await pool.query(
      'INSERT INTO users(login, password, salt) VALUES($1, $2, $3)',
      [this.login, hashedPassword, salt],
    );
    return dbResult.rowCount ? 1 : 0;
  }

  async auth() {
    if (!this.login || !this.password)
      throw new Error('The "login" and "password" fields are required.');
    const dbResult = await pool.query(
      'SELECT password, salt FROM users where login = $1',
      [this.login],
    );
    const dbPassword = dbResult.rows[0].password;
    const salt = dbResult.rows[0].salt;
    const hashedPassword = await hashPassword(this.password, salt);

    // TODO: Return the auth token
    return dbPassword === hashedPassword ? true : false;
  }
}

module.exports = User;
