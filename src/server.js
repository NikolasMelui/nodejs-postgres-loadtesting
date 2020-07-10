'use strict';

const http = require('http');
const { APPLICATION_HOST, APPLICATION_PORT } = require('./config');
// const { getApplicationHost, getApplicationPort } = require('./helpers');

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
      console.log(data);

      res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
      res.end('Wow!');
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
