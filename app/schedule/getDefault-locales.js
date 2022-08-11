const getDefaultLocale = require('../utils/getDefaultLocale');

module.exports = {
  schedule: {
    interval: '600s', // 1 分钟间隔
    immediate: true,
    type: 'all', // 指定所有的 worker 都需要执行
    env: 'prod',
  },
  async task(ctx) {
    getDefaultLocale(this.schedule, ctx.app.config.localesPath, ctx.logger);
  },
};
