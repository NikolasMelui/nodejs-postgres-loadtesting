'use strict';
const urlParser = require('url');

const User = require('./domains/user');
const Item = require('./domains/item');

class Router {
  constructor(req) {
    this.req = req;
    this.domains = {
      user: User,
      item: Item,
    };
  }

  async route() {
    const { method, url } = this.req;
    if (method !== 'POST')
      throw new Error('The POST request methods only available.');

    const parsedUrl = urlParser.parse(url, true);
    const splittedUrl = parsedUrl.path.split('/');
    const domainUrl = splittedUrl[1];
    const methodUrl = splittedUrl[2];

    const Domain = this.domains[domainUrl];
    if (!Domain) throw new Error('Wrong domain.');

    const body = [];
    for await (const chunk of this.req) body.push(chunk);
    const data = JSON.parse(body);
    const instance = new Domain(data);

    const result = await instance[methodUrl]();

    console.log(result);

    if (!result) throw new Error('Something went wrong.');

    return result;
  }
}

module.exports = Router;
