const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AliasPlugin = require('./plugins/alias-plugin')
module.exports = env => {
  console.log('env', env);
  return {
    entry: {
      index: 'index.tsx',
    },
    output: {
      filename: '[name].js',
      chunkFilename: 'chunks/[name].[contenthash:8].js',
    }, 
    context: path.join(__dirname, './src'),
    devtool: false,
    resolve: {
      modules: [path.join(__dirname, './src'), 'node_modules'],
      symlinks: false,
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.less', ".md"],
      // 做实战题2时请将alias注释掉
      // alias: {
      //   "@component": path.resolve(__dirname, "./src/md-component")
      // }
    },
    module: {
      rules: [
        {
          test: /\.(tsx?|js)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'ts-loader'],
        },
        {
          test: /\.md$/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader', 
              options: {
                appendTsxSuffixTo: [/\.md$/],
              }
            },
            { 
              loader: path.resolve(__dirname, './loaders/markdown-loader.js') 
            },
          ]
        }
      ]
    },
    plugins: [
      new AliasPlugin({
        // 都只需要传入文件所在目录即可，不需要具体到文件路径
        webpackConfigBasePath: path.resolve(__dirname),
        tsConfigPath: path.resolve(__dirname)
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: path.resolve(__dirname, './index.html'),
        prod: true,
      }),
    ]
  };
};