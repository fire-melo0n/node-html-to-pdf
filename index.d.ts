import { PDFOptions } from 'puppeteer';

// Copied from handlebars as it doesn't export the interface.
export interface HandlebarsCompileOptions {
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

  constructor(
    params: {
      templatePath: string,
      data: object,
      options?: {
        puppeteerPDFOptions?: PDFOptions,
        handlbarsCompileOptions?: HandlebarsCompileOptions
      }
    }
  );

  build(): Promise<string|Buffer>;

  private _getTemplate(filePath: string): Promise<string>;

  private _parseTemplate(
    template: string,
    data: object
  ): Promise<string>;

  private _saveHTML(html: string): Promise<string>;

  private _createPDF(htmlPath: string): Promise<Buffer>;

}
