import { PDFOptions } from 'puppeteer';

export default class HTMLToPDF {

  constructor(
    params: {
      templatePath: string,
      data: object,
      options?: {
        puppeteerPDFOptions: PDFOptions
      }
    }
  );

  getPDF(): Promise<string|Buffer>;

  private _getTemplate(filePath: string): Promise<string>;

  private _parseTemplate(
    template: string,
    data: object
  ): Promise<string>;

  private _saveHTML(html: string): Promise<string>;

  private _createPDF(htmlPath: string): Promise<Buffer>;

}
