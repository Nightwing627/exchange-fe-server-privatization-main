const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');

class FePublicInfoController extends Controller {
  fsPublicInfo(mPath) {
    const obj = {
      isHave: false,
      data: {},
    };
    if (fs.existsSync(mPath)) {
      obj.isHave = true;
      obj.data = JSON.parse(fs.readFileSync(mPath, 'utf8'));
    }
    return obj;
  }

  async get() {
    let lanSeo = {};
    let publicInfo = {};
    const sKinData = {};
    sKinData.listist = [];
    let cusSkin = this.ctx.cookies.get('cusSkin', {
      signed: false,
    });
    let lan = this.ctx.cookies.get('lan', {
      signed: false,
    });
    let nowHost = this.ctx.request.header.host;
    if (this.config.env === 'local') {
      nowHost = this.config.devUrlProxy.ex;
    }
    // 获取到主域名
    const domain = nowHost.replace(new RegExp(`^${nowHost.split('.')[0]}.`), '');
    const fileName = this.config.configDomain[nowHost] || domain;
    // 1.2 读取本地publicInfo
    const pub = this.fsPublicInfo(path.join(this.config.staticPath, `${fileName}.json`));
    // 1.2 读取本地 Skin
    const skin = this.fsPublicInfo(path.join(this.config.skinsPath, `${fileName}_skin.json`));
    const skinType = [];
    // 设置默认 皮肤
    if (skin && skin.data && skin.data.listist) {
      if (!cusSkin) {
        cusSkin = skin.data.default ? skin.data.default : '1';
        this.ctx.cookies.set('cusSkin', cusSkin, {
          httpOnly: false,
          signed: false,
          domain,
        });
      }
      skin.data.listist.forEach((item) => {
        const { skinName, mainClor, skinId } = item;
        skinType.push({ skinName, mainClor, skinId });
        if (item.skinId === cusSkin) {
          sKinData.listist.push(item);
        }
      });
    }
    // 1.2.1 如果有此文件 直接使用
    if (pub.isHave) {
      publicInfo = pub.data;
      lanSeo = pub.data.data.seo;
      if (!lan) {
        lan = pub.data.data.lan.defLan || 'zh_CN';
      }
      // 1.2.2 如果无此文件 则发起请求
    }
    publicInfo.data.skinType = skinType;
    if (sKinData.listist && sKinData.listist.length) {
      publicInfo.data.skin = sKinData;
    }
    if (lanSeo && lanSeo[lan]) {
      publicInfo.data.seo = lanSeo[lan];
    }
    this.ctx.set('Content-Type', 'application/javascript');
    this.ctx.body = `window.publicInfo=${JSON.stringify(this.publicInfo) !== '{}' ? JSON.stringify(publicInfo.data) : {}}`;
  }

  async getLocale() {
    let locale = '';
    let code = 0;
    const lan = this.ctx.cookies.get('lan', {
      signed: false,
    });
    const fileName = this.getFileName();
    const fileBasePath = this.config.localesPath;
    let localePath = path.join(fileBasePath, fileName, `${lan}.json`);

    if (!fs.existsSync(localePath)) {
      localePath = path.join(fileBasePath, 'defaultLocales', `${lan}.json`);
    }
    if (!fs.existsSync(localePath)) {
      const errorData = {
        fileName,
        message: '默认语言中没有此语言，因此返回英文语言包',
      };
      this.logger.error(JSON.stringify(errorData));
      localePath = path.join(fileBasePath, 'defaultLocales', 'en_US.json');
    }
    try {
      locale = fs.readFileSync(localePath, 'UTF-8');
    } catch (e) {
      const errorData = {
        fileName,
        message: '未拿到语言包',
      };
      code = 1002;
      this.logger.error(JSON.stringify(errorData));
    }
    let res = {};
    try {
      res = JSON.parse(locale);
    } catch (e) {
      code = 1000;
    }
    this.ctx.body = {
      code,
      data: res,
    };
  }

  getFileName() {
    let nowHost = this.ctx.request.header.host;
    if (this.config.env === 'local') {
      nowHost = this.config.devUrlProxy.ex;
    }
    // 获取到主域名
    const domain = nowHost.replace(new RegExp(`^${nowHost.split('.')[0]}.`), '');
    return this.config.configDomain[nowHost] || domain;
  }
}


module.exports = FePublicInfoController;
