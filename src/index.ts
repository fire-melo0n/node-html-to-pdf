import * as puppeteer from 'puppeteer';
import * as _ from 'lodash';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as path from 'path';

// Copied from handlebars as it doesn't export the interface.
interface HandlebarsCompileOptions {
  data?: boolean;
  compat?: boolean;
  knownHelpers?: {
    helperMissing?: boolean;
    blockHelperMissing?: boolean;
    each?: boolean;
    if?: boolean;
    unless?: boolean;
    with?: boolean;
    log?: boolean;
    lookup?: boolean;
  };
  knownHelpersOnly?: boolean;
  noEscape?: boolean;
  strict?: boolean;
  assumeObjects?: boolean;
  preventIndent?: boolean;
  ignoreStandalone?: boolean;
  explicitPartialContext?: boolean;
}

export default class HTMLToPDF {

  browser: puppeteer.Browser;
  page: puppeteer.Page;
  html: string;

  constructor(
    private params: {
      templatePath: string,
      data: object,
      options?: {
        puppeteerPDFOptions?: puppeteer.PDFOptions,
        handlbarsOptions?: HandlebarsCompileOptions
      }
    }
  ) {}

  /**
   * Generate PDF and return either file path or Buffer.
   */
  async getPDF(): Promise<string|Buffer> {

    // Get contents of template file
    var template = await this._getTemplate(this.params.templatePath);

    // Parse template using handlebars
    var html = await this._parseTemplate(template, this.params.data);

    // Save HTML to file for Puppeteer to read.
    var htmlPath = await this._saveHTML(html);

    // Create PDF using Puppeteer
    var buffer = await this._createPDF(htmlPath);

    // Either return the file path of new PDF or Buffer of new PDF
    if (this.params.options.puppeteerPDFOptions.path) {
      return this.params.options.puppeteerPDFOptions.path;
    } else {
      return buffer;
    }

  }

  /**
   * Get contents of template file.
   */
  private async _getTemplate(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      var data = '';
      var readStream = fs.createReadStream(filePath);
      readStream.on('data', chunk => data += chunk);
      readStream.on('end', () => resolve(data));
      readStream.on('error', reject);
    });
  }

  /**
   * Parse template.
   */
  private async _parseTemplate(
    template: string,
    data: object
  ): Promise<string> {
    return new Promise((resolve) => {
      var parser = handlebars.compile(template);
      console.log('_parseTemplate -> data', data);
      return resolve(parser(data));
    });
  }

  /**
   * Temporarily write html to a file for puppeteer to read.
   */
  private async _saveHTML(html: string): Promise<string> {
    console.log('_saveHTML -> html', html);
    var filePath = path.resolve('./', 'temp', `${uuid.v4()}.html`);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, html, err => {
        if (err) return reject(err);
        return resolve(filePath);
      });
    });
  }

  /**
   * Create browser page to render HTML.
   */
  private async _createPDF(htmlPath: string): Promise<Buffer> {
    var browser = await puppeteer.launch();
    var page = await browser.newPage();
    await page.goto(`file://${htmlPath}`);
    await page.emulateMedia('screen');
    var pdf = await page.pdf(this.params.options.puppeteerPDFOptions);
    await browser.close();
    return pdf;
  }

}
