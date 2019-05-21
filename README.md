# Generate PDF's using HTML

Usage:
```
import PDF from 'html-to-pdf';

var pdf = new PDF({
  templatePath: string,
  data: {} // Data to parse into template
  options: {
    puppeteerPDFOptions: { path: './my.pdf' },
    handlebarsCompileOptions: {}
  }
});

var mypdf = pdf.build();
```

For `puppeteerPDFOptions` see [Puppeteer Doc's](https://github.com/GoogleChrome/puppeteer/blob/v1.16.0/docs/api.md#pagepdfoptions)

For `handlebarsCompileOptions` see [Handlebars Doc's](https://handlebarsjs.com/reference.html)

### Save PDF

To save the PDF define `options.puppeteerPDFOptions.path`. This will result in `pdf.build()` returning the same path.

### Get PDF as Buffer
To get the PDF as a Buffer leave `options.puppeteerPDFOptions.path` blank. This will result in `pdf.build()` returning a Buffer.
