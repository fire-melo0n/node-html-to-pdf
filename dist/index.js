"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
var handlebars = require("handlebars");
var fs = require("fs");
var uuid = require("uuid");
var path = require("path");
var HTMLToPDF = (function () {
    function HTMLToPDF(params) {
        this.params = params;
    }
    HTMLToPDF.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var template, html, htmlPath, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getTemplate(this.params.templatePath)];
                    case 1:
                        template = _a.sent();
                        return [4, this._parseTemplate(template, this.params.data)];
                    case 2:
                        html = _a.sent();
                        return [4, this._saveHTML(html)];
                    case 3:
                        htmlPath = _a.sent();
                        return [4, this._createPDF(htmlPath)];
                    case 4:
                        buffer = _a.sent();
                        return [4, this._removeFile(htmlPath)];
                    case 5:
                        _a.sent();
                        if (this.params.options.puppeteerPDFOptions.path) {
                            return [2, this.params.options.puppeteerPDFOptions.path];
                        }
                        else {
                            return [2, buffer];
                        }
                        return [2];
                }
            });
        });
    };
    HTMLToPDF.prototype._getTemplate = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var data = '';
                        var readStream = fs.createReadStream(filePath);
                        readStream.on('data', function (chunk) { return data += chunk; });
                        readStream.on('end', function () { return resolve(data); });
                        readStream.on('error', reject);
                    })];
            });
        });
    };
    HTMLToPDF.prototype._parseTemplate = function (template, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var parser = handlebars.compile(template);
                        return resolve(parser(data));
                    })];
            });
        });
    };
    HTMLToPDF.prototype._saveHTML = function (html) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath;
            return __generator(this, function (_a) {
                filePath = path.resolve('./', 'temp', uuid.v4() + ".html");
                return [2, new Promise(function (resolve, reject) {
                        fs.writeFile(filePath, html, function (err) {
                            if (err)
                                return reject(err);
                            return resolve(filePath);
                        });
                    })];
            });
        });
    };
    HTMLToPDF.prototype._createPDF = function (htmlPath) {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, pdf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, puppeteer.launch()];
                    case 1:
                        browser = _a.sent();
                        return [4, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        return [4, page.goto("file://" + htmlPath)];
                    case 3:
                        _a.sent();
                        return [4, page.pdf(this.params.options.puppeteerPDFOptions)];
                    case 4:
                        pdf = _a.sent();
                        return [4, browser.close()];
                    case 5:
                        _a.sent();
                        return [2, pdf];
                }
            });
        });
    };
    HTMLToPDF.prototype._removeFile = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        fs.unlink(filePath, function (err) {
                            if (err)
                                return reject(err);
                            else
                                return resolve();
                        });
                    })];
            });
        });
    };
    return HTMLToPDF;
}());
exports["default"] = HTMLToPDF;
//# sourceMappingURL=index.js.map