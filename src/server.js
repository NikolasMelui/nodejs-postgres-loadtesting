'use strict';

const http = require('http');
const Router = require('./router');

const {
  APPLICATION_SERVER_HOST,
  APPLICATION_SERVER_PORT,
} = require('./config');

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
      const splittedErrorMessage = error.message.split(', ');
      const status = Number(splittedErrorMessage[0]);
      const message = splittedErrorMessage[1];
      console.log(splittedErrorMessage);
      res.writeHead(status, { 'Content-Type': 'text/plain' });
      res.end(message);
    }
  })
  .listen(APPLICATION_SERVER_PORT, APPLICATION_SERVER_HOST, () =>
    console.log(
      `Server is listening on ${APPLICATION_SERVER_HOST}:${APPLICATION_SERVER_PORT}`,
    ),
  );
