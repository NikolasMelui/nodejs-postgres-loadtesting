'use strict';

/**
 * LEGEND:
 *
 * __VU - Virtual User
 * __ITER - Iteration
 */

const http = require('k6/http');
const { check } = require('k6');

module.exports.options = {
  vus: 2,
  duration: '10s',
};

const {
  APPLICATION_SERVER_HOST,
  APPLICATION_SERVER_PORT,
} = require('../config.js');

module.exports.default = () => {
  const ping = (count) => {
    for (var id = 1; id <= count; id++) {
      const res = http.post(
        `http://${APPLICATION_SERVER_HOST}:${APPLICATION_SERVER_PORT}/ping`,
        JSON.stringify({ id }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      check(res, {
        'is status 200': (r) => r.status === 200,
      });
      // eslint-disable-next-line
      console.info(`${res.body} by VU ${__VU}`);
    }
  };

  ping(100000);
};
