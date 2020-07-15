'use strict';

const http = require('http');

const {
  APPLICATION_SERVER_HOST,
  APPLICATION_SERVER_PORT,
} = require('./config');

const dataFactory = (argv) => ({
  '/user/signup': {
    login: argv[3] ?? '',
    password: argv[4] ?? '',
  },
  '/user/signin': {
    login: argv[3] ?? '',
    password: argv[4] ?? '',
  },
  '/item/create': {
    title: argv[3] ?? '',
    description: argv[4] ?? '',
  },
  '/item/find': {
    title: argv[3] ?? '',
  },
  '/ping': { id: argv[3] },
});

const sendRequest = (options, data) =>
  new Promise((resolve, reject) => {
    const req = http.request(options, async (res) => {
      try {
        if (res.statusCode < 200 || res.statusCode >= 300)
          throw new Error(
            `The request has been errored with status code ${res.statusCode} - ${res.statusMessage}`,
          );
        const buffer = [];
        for await (const chunk of res) {
          buffer.push(chunk);
        }
        const result = JSON.parse(Buffer.concat(buffer).toString());
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
    req.write(data);
    req.end();
  });

(async () => {
  try {
    const path = process.argv[2];
    const rawData = dataFactory(process.argv)[path];
    if (!rawData) throw new Error(404, 'Wrong request path.');
    const data = JSON.stringify(rawData);

    const options = {
      hostname: APPLICATION_SERVER_HOST,
      port: APPLICATION_SERVER_PORT,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const result = await sendRequest(options, data);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
