'use strict';
const urlParser = require('url');

const { capitalizeFirstLetter } = require('./helpers');

class Router {
  constructor(req, domains) {
    this.req = req;
    this.domains = domains;
  }

  async route() {
    const { method, url } = this.req;
    if (method !== 'POST')
      throw new Error('405, The POST request methods only available.');

    const parsedUrl = urlParser.parse(url, true);
    const splittedUrl = parsedUrl.path.split('/');
    const domainUrl = splittedUrl[1];
    const methodUrl = splittedUrl[2];

    const body = [];
    for await (const chunk of this.req) body.push(chunk);
    const data = body.length ? JSON.parse(body) : '';

    if (domainUrl === 'ping') return this.pong(data);

    const Domain = this.domains[capitalizeFirstLetter(domainUrl)];
    if (!Domain) throw new Error('404, Wrong domain.');

    const instance = new Domain(data);

    const result = await instance[methodUrl]();

    if (!result) throw new Error('500, Something went wrong.');

    return result;
  }

  pong({ id = '?' }) {
    return `Ping from the ${id}\nPong :)`;
  }
}

module.exports = Router;
