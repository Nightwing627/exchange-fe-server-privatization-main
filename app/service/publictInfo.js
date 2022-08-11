const { Service } = require('egg');
const fs = require('fs');
const path = require('path');
const hostFilter = require('../utils/host-filter');
const dirExists = require('../utils/mkdir');

class GetpublicInfo extends Service {
  async getdata(domainData, callBack, host) {
    const fileBasePath = this.config.staticPath;
    dirExists(fileBasePath);
    const serverConfigPath = path.join(__dirname, './../../serverConfig.json');
    let urlHost = 'http://127.0.0.1';
    let apiProxy = '/fe-ex-api';
    let headersHost = '';
    if (fs.existsSync(serverConfigPath)) {
      const jsonData = JSON.parse(fs.readFileSync(serverConfigPath, 'utf8'));
      urlHost = jsonData.curlHost;
      apiProxy = jsonData.proxy;
      headersHost = jsonData.headerHost;
    }
    if (domainData) {
      let header = {
        host: headersHost.length
          ? `${headersHost}.${domainData.fileName}`
          : host,
      };
      if (this.config.env === 'local') {
        urlHost = this.config.devUrlProxy.ex;
        header = {};
      }

      const res = await this.ctx.curl(`${urlHost}${apiProxy}/common/public_info_v4`, {
        dataType: 'json',
        method: 'POST',
        timeout: '30000',
        headers: header,
      });
      if (res.status === 200 && res.data.code.toString() === '0') {
        // 下载 SKin 文件
        // this.ctx.service.getLocales.getLocales(domainData, callBack, res.data.data.locales);
        this.ctx.service.skin.getSkin(domainData, callBack, res.data.data.skin_new);
        fs.writeFile(`${fileBasePath}${domainData.fileName}.json`, JSON.stringify({ data: res.data.data }, 'utf8'), (error) => {
          if (error) {
            callBack({
              code: 1,
              msg: '数据保存失败',
            });
          } else {
            callBack({
              code: 0,
              msg: '数据保存成功',
              data: res.data.data,
            });
          }
          const errorData = {
            domain: domainData.domainName, // 域名
            message: 'public_info 请求成功', // 描述
          };
          if (!hostFilter.test(domainData.domainName)) {
            this.logger.error(JSON.stringify(errorData));
          }
        });
      } else {
        const errorData = {
          host: urlHost,
          proxy: apiProxy,
          domain: domainData.domainName, // 域名
          message: res.status === 200 ? 'publicInfo报错 code非0' : 'publicInfo报错 status非200', // 描述
          key: res.status === 200 ? 'res.data.message' : 'res.status', // key
          data: res.status === 200 ? JSON.stringify(res.data) : res.status, // value
        };
        if (!hostFilter.test(domainData.domainName)) {
          this.logger.error(JSON.stringify(errorData));
        }
        callBack({
          code: 1,
          msg: '数据获取失败',
        });
      }
    }
  }
}
module.exports = GetpublicInfo;
