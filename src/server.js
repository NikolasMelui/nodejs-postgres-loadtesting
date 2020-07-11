'use strict';

const http = require('http');
const Router = require('./router');

const { APPLICATION_HOST, APPLICATION_PORT } = require('./config');

http
  .createServer(async (req, res) => {
    try {
      req.setEncoding('utf8');

      const router = new Router(req);
      const result = await router.route();

      res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
      const stringResult = JSON.stringify(result);
      res.end(stringResult);
    } catch (error) {
      console.error(error);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(error.message);
    }
  })
  .listen(APPLICATION_PORT, APPLICATION_HOST, () =>
    console.log(
      `Server is listening on ${APPLICATION_HOST}:${APPLICATION_PORT}`,
    ),
  );
