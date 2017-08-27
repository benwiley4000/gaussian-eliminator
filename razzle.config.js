var path = require('path');

module.exports = {
  modify: config => {
    return Object.assign({}, config, {
      resolve: Object.assign({}, config.resolve || {}, {
        alias: Object.assign({}, config.resolve && config.resolve.alias || {}, {
          // Temporary until pure-linear-algebra can specify a "browser" entry
          // without browserify error
          'pure-linear-algebra': path.resolve(
            __dirname,
            './node_modules/pure-linear-algebra/dist/pure-linear-algebra.js'
          )
        })
      })
    });
  }
};
