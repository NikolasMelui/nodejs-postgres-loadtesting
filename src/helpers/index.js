'use strict';

const crypto = require('crypto');

const getApplicationHost = (req) => req.headers.host.split(':')[0];
const getApplicationPort = (req) => req.headers.host.split(':').pop();

const generateSalt = () => crypto.randomBytes(16).toString('hex');

const hashPassword = (password, salt) =>
  new Promise((resolve, reject) => {
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    if (!hashedPassword) reject(new Error('Error with passwords.'));
    resolve(hashedPassword);
  });

module.exports = {
  getApplicationHost,
  getApplicationPort,
  generateSalt,
  hashPassword,
};
