const fs = require('fs');
const path = require('path');

module.exports = {
  schedule: {
    interval: '86400s', // 1 分钟间隔
    immediate: true,
    type: 'all', // 指定所有的 worker 都需要执行
    env: 'prod',
  },
  async task(ctx) {
    const { dir } = ctx.app.config.logger;
    const files = fs.readdirSync(dir);
    files.forEach((item) => {
      const time = item.split('.')[2];
      if (time) {
        const dateOut = parseInt(
          (new Date().getTime() - new Date(time).getTime()) / 1000 / 60 / 60 / 24,
          10,
        );
        if (dateOut >= 8) {
          fs.unlinkSync(path.join(dir, item));
        }
      }
    });
  },
};
