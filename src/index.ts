// https://github.com/GoogleChrome/puppeteer/blob/v1.16.0/docs/api.md#pagepdfoptions

import * as puppeteer from 'puppeteer';
import * as _ from 'lodash';

export class HTMLToPDF {

  browser: puppeteer.Browser;
  page: puppeteer.Page;

  constructor(
    path: string,
    private data: object,
    private options?: puppeteer.PDFOptions
  ) {
    this.options = _.defaultsDeep(options, {
      format: 'A4'
    });



  }

  async createPage() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  createHTML() {}

}
