

const path = require('path');
const fs = require('fs');

/**
 * @param {string} webpackConfigBasePath webpack.base.config.js所在目录, 默认为项目根目录
 * @param {string} tsConfigPath tsconfig.json文件路径， 默认为项目根目录
 */
class AliasPlugin {
  constructor({
    webpackConfigBasePath = process.cwd(),
    tsConfigPath = process.cwd(),
  }) {
    this.options = {
      webpackConfigBasePath,
      tsConfigPath
    };
  }
  apply (compiler) {
    compiler.hooks.beforeRun.tap('AliasPlugin', (compiler) => {
      try {
        if(compiler.options.resolve.alias) return;
        const { tsConfigPath, webpackConfigBasePath } = this.options;
        const tsconfigContent = fs.readFileSync(path.resolve(tsConfigPath, './tsconfig.json'), 'utf-8');
        const paths = JSON.parse(tsconfigContent).compilerOptions?.paths;
        if (paths) {
          console.log("The webpack resolve alias is starting to compile...", paths);
          let alias = {};
          Object.entries(paths).forEach(([k, v]) => {
            const key = k.replace('/*', '');
            // 因为webpack.base.config.js的文件目录可能是不确定的，所以需要外部传入，然后计算与tsconfig.json的相对路径去处理alias的路径
            const value = path.resolve(webpackConfigBasePath, path.relative(webpackConfigBasePath, tsConfigPath), v[0].replace('/*', ''));
            alias[key] = value;
          });
          console.log(alias)
          compiler.options.resolve.alias = alias;
        }
      } catch (err) {
        console.log(`Error reading tsconfig.json: ${err}`);
      }
    })
  }
}

module.exports = AliasPlugin;