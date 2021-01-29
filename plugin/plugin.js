"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('dyve:11typlugin:readableHtml');
const pretty = require('pretty');
const defaults = {
    enable: false,
};
class ReadableHtml extends Function {
    constructor() {
        super();
        return new Proxy(this, {
            apply: async (target, thisArg, args) => {
                return await this.makeReadable(args[0], args[1]);
            },
        });
    }
    async makeReadable(content, outputPath) {
        if (!outputPath || !outputPath.endsWith('.html') || !content)
            return content;
        try {
            const html = pretty(content);
            debug(outputPath);
            return html;
        }
        catch (err) {
            console.error(colors_1.default.red(err));
        }
        debug(colors_1.default.red('FAILED'));
        return content;
    }
}
exports.default = {
    initArguments: {},
    configFunction: async (eleventyConfig, pluginOptions = defaults) => {
        if (pluginOptions.enable) {
            const plugin = new ReadableHtml();
            eleventyConfig.addTransform('readableHtml', plugin);
        }
    },
};
