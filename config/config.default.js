/* eslint valid-jsdoc: "off" */


const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   * */
  // eslint-disable-next-line no-multi-assign
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1572334094719_3964`;

  // add your middleware config here
  config.middleware = ['compress', 'conditional', 'etag'];

  config.compress = {
    threshold: 1024,
  };

  config.static = {
    prefix: '/',
    gzip: true,
    maxAge: 365 * 24 * 60 * 60,
    usePrecompiledGzip: true,
    dir: path.join(__dirname, '../app/dist'),
  };

  config.view = {
    root: [
      path.join(__dirname, '../app/dist'),
    ].join(','),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // 禁用csrf攻击预警
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.devUrlProxy = {
    ex: 'https://tundraswap.com',
    otc: 'https://tundraswap.com',
    co: 'https://tundraswap.com',
  };

  return {
    ...config,
    ...userConfig,
  };
};
