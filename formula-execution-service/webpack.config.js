const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // The entry point of our application
  entry: './src/infrastructure/handlers/api.handler.ts',

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },

  // Target environment
  target: 'node',

  // Mode can be 'development' or 'production'
  mode: 'production',

  // Enable source maps for debugging
  devtool: 'source-map',

  // How to resolve modules
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@/domain': path.resolve(__dirname, 'src/domain'),
      '@/application': path.resolve(__dirname, 'src/application'),
      '@/infrastructure': path.resolve(__dirname, 'src/infrastructure'),
    },
  },

  // Module rules
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  
  // Externals - crucial for native modules like 'isolated-vm'
  // We don't want webpack to bundle them. They should be installed via npm
  // and included in the Lambda package's node_modules directory.
  externals: [nodeExternals({
    allowlist: []
  })],

  // Optimization settings
  optimization: {
    minimize: true, // Minify the output for smaller package size
  },
};