const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

// module.exports = withPlugins([
//   optimizedImages,
// ]);

module.exports ={
  images:{
    domains: ['storage.googleapis.com']
  },
  future: {
    webpack5: true,
  },
  distDir: 'out',
};