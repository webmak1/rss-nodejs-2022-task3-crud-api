import dotenv from 'dotenv';
import path from 'path';
import { DefinePlugin } from 'webpack';

//const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  target: 'node',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    // path: path.resolve(__dirname, 'dist'),
    path: path.resolve('.', 'dist'),
  },
  plugins: [
    new DefinePlugin({
      'process.env': `(${JSON.stringify(dotenv.config().parsed)})`,
    }),
  ],
};
