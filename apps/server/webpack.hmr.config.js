const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { composePlugins, withNx } = require('@nx/webpack');

// Set true if you don't want type checking
const skipTypeChecking = false;

module.exports = composePlugins(withNx({ skipTypeChecking }), (config) => {
   config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
         paths: [/\.js$/, /\.d\.ts$/],
      }),
   );
   return {
      ...config,
      entry: ['webpack/hot/poll?100', ...config.entry.main],
      externals: [
         nodeExternals({
            allowlist: ['webpack/hot/poll?100'],
         }),
      ],
      plugins: [...config.plugins],
   };
});
