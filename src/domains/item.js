'use strict';

const { pool } = require('../db');

class Item {
  constructor({ title, description }) {
    this.title = title;
    this.description = description;
  }

  async create() {
    if (!this.title || !this.description)
      throw new Error('The "title" and "discription" fields are required.');
    const dbResult = await pool.query(
      'INSERT INTO items(title, description) VALUES($1, $2)',
      [this.title, this.description],
    );
    return dbResult.rowCount ? 1 : 0;
  }

  async find() {
    if (!this.title) throw new Error('The "title" field is required.');
    const dbResult = await pool.query('SELECT * FROM items where title = $1', [
      this.title,
    ]);
    const result = dbResult.rows;
    console.log(dbResult);
    return result;
  }
}

module.exports = Item;
