//@ts-check

const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
   nx: {},
   webpack: (config) => {
      config.externals.push({
         test: /\.svg$/i,
         use: ["@svgr/webpack"],
      });
      return config;
   },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
