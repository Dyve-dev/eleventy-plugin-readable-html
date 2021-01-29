import colors from 'colors';
import Debug from 'debug';
import { PluginOptions } from './types';

const debug = Debug('dyve:11typlugin:readableHtml');
const pretty = require('pretty');

const defaults: PluginOptions = {
  enable: false,
};

class ReadableHtml extends Function {
  constructor() {
    super();
    return new Proxy(this, {
      apply: async (target, thisArg, args: Array<string>) => {
        return await this.makeReadable(args[0], args[1]);
      },
    });
  }

  private async makeReadable(content: string, outputPath: string): Promise<string> {
    if (!outputPath || !outputPath.endsWith('.html') || !content) return content;

    try {
      const html = pretty(content);
      debug(outputPath);
      return html;
    } catch (err) {
      console.error(colors.red(err));
    }
    debug(colors.red('FAILED'));
    return content;
  }
}

export default {
  initArguments: {},
  configFunction: async (eleventyConfig: any, pluginOptions: PluginOptions = defaults) => {
    if (pluginOptions.enable) {
      const plugin = new ReadableHtml();
      eleventyConfig.addTransform('readableHtml', plugin);
    }
  },
};
