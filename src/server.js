'use strict';

const http = require('http');

const { pool } = require('./db');
const { APPLICATION_HOST, APPLICATION_PORT } = require('./config');
const { hashPassword } = require('./helpers');

http
  .createServer(async (req, res) => {
    try {
      req.setEncoding('utf8');

      const { method } = req;
      if (method !== 'POST')
        throw new Error('Only POST request method available');

      const body = [];
      for await (const chunk of req) body.push(chunk);

      const data = JSON.parse(body);
      const { login, password } = data;

      const { hashedPassword, salt } = await hashPassword(password);

      const dbResult = await pool.query(
        'INSERT INTO users(login, password, salt) VALUES($1, $2, $3)',
        [login, hashedPassword, salt],
      );

      console.info(dbResult);

      res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
      const result = dbResult.rowCount
        ? 'The user was successfully created'
        : '...';

      res.end(result);
    } catch (error) {
      console.error(error);
      res.end(error.message);
    }
  })
  .listen(APPLICATION_PORT, APPLICATION_HOST, () =>
    console.log(
      `Server is listening on ${APPLICATION_HOST}:${APPLICATION_PORT}`,
    ),
  );
