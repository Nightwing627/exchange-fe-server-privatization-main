const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
const hostFilter = require('../utils/host-filter');

const otherArr = {};

class HomeController extends Controller {
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

  async getPublicInfo(v) {
    const { domainArr } = this.config;
    const pub = this.fsPublicInfo(path.join(this.config.staticPath, `${domainArr[this.fileName].fileName}.json`));
    if (pub.isHave) {
      this.publicInfo = pub.data;
      // 1.2.2 如果无此文件 则发起请求
    } else {
      await this.ctx.service.publictInfo.getdata(domainArr[this.fileName], (data) => {
        otherArr[this.fileName].time = new Date().getTime();
        otherArr[this.fileName].sendLoading = false;
        if (data.code === 0) { this.publicInfo = data.data; }
      }, this.ctx.request.header.host);
    }
    if (v) {
      otherArr[this.fileName].time = new Date().getTime();
      otherArr[this.fileName].sendLoading = true;
      this.ctx.service.publictInfo.getdata(domainArr[this.fileName], () => {
        otherArr[this.fileName].time = new Date().getTime();
        otherArr[this.fileName].sendLoading = false;
      }, this.ctx.request.header.host);
    }
  }

  async index() {
    const { domainArr } = this.config;
    const { ctx } = this;
    // const evn = this.config.env;
    this.publicInfo = {};
    // 处理请求部分
    let nowHost = this.ctx.request.header.host;
    if (this.config.env === 'local') {
      nowHost = this.config.devUrlProxy.ex;
    }
    // 获取到主域名
    const domain = nowHost.replace(new RegExp(`^${nowHost.split('.')[0]}.`), '');
    const fileName = this.config.configDomain[nowHost] || domain;
    this.fileName = fileName;
    const nowTime = new Date().getTime();
    // 1 如果内存中已经存储该域名 则读取本地
    if (domainArr[fileName]) {
      if (!otherArr[fileName]) {
        otherArr[fileName] = {
          time: 0,
          sendLoading: false,
        };
      }
      // 1.1 如果两次相差时间超过5分钟 更新publicInfo
      //    if ((nowTime - otherArr[fileName].time) > 300000) {
      //    otherArr[fileName].time = nowTime;
      otherArr[fileName].sendLoading = true;
      ctx.service.publictInfo.getdata(domainArr[fileName], () => {
        // otherArr[fileName].time = new Date().getTime();
        otherArr[fileName].sendLoading = false;
      }, ctx.request.header.host);
      //  }
      this.getPublicInfo();
    } else {
      domainArr[fileName] = {
        fileName,
        domainName: `${this.ctx.app.httpclient.agent.protocol}//${nowHost}`,
      };
      otherArr[fileName] = {
        time: nowTime,
        sendLoading: true,
      };
      this.getPublicInfo(true);
    }
    const renderObject = {
      title: '',
      description: '',
      keywords: '',
      pageContent: '',
      staticDomain: '',
      eChartsUrl: 'https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js',
      icon: '',
    };
    renderObject.staticDomain = this.app.config.staticDomain;
    if (JSON.stringify(this.publicInfo) !== '{}') {
      const publicData = this.publicInfo.data;
      if (publicData
        && publicData.msg
        && publicData.msg.iconUrl) {
        renderObject.icon = publicData.msg.iconUrl;
        // this.config.siteFile = {
        //   '/favicon.ico': publicData.msg.iconUrl,
        // };
      } else {
        const errorData = {
          domain,
          message: '未拿到publicInfo.msg.iconUrl',
          key: 'publicInfo.msg',
          data: publicData.msg,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }
      // 设置语言
      this.setLan(domain);
      // 设置 eCharts地址
      if (this.lan !== 'zh_CN') {
        renderObject.eChartsUrl = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js';
      }
      // 设置title
      let indexHeaderTitle = '';
      if (publicData.indexHeaderTitle) {
        indexHeaderTitle = publicData.indexHeaderTitle[this.lan];
      } else {
        const errorData = {
          domain,
          message: '未拿到publicInfo.indexHeaderTitle',
          key: 'publicInfo.indexHeaderTitle',
          data: publicData.indexHeaderTitle,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }
      // renderObject.title = indexHeaderTitle;
      // seo
      if (publicData && publicData.seo && publicData.seo[this.lan]) {
        const seoLan = publicData.seo[this.lan];
        const {
          description, keywords, pageContent, title,
        } = seoLan;
        renderObject.description = description || '';
        renderObject.keywords = keywords || '';
        renderObject.pageContent = pageContent || '';
        renderObject.title = title || indexHeaderTitle;
      } else {
        const errorData = {
          domain,
          message: '未拿到publicInfo.seo',
          key: 'publicInfo.data.seo',
          data: publicData.seo,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }
    }
    await ctx.render(`../dist/${this.config.buildEnv}-index.html`, renderObject);
  }

  async setLan(domain) {
    // 取得client一级路由 clientUrlLan
    const clientUrlLan = this.ctx.request.path.split('/')[1];
    // 取得client cookie中语言 clientCookLan
    const clientCookLan = this.ctx.cookies.get('lan', {
      signed: false,
    });
    const cookieDomain = domain === 'hiex.pro' ? 'bitwind.com' : domain;
    const dLan = 'en_US';
    const reg = /^[a-z]{2}_[A-Z]{2}$/;
    if (this.publicInfo
      && this.publicInfo.data
      && this.publicInfo.data.lan) {
      // 针对 publicInfo => lan => defLan 兼容处理
      let serverDefLan = dLan;
      if (this.publicInfo.data.lan.defLan) {
        serverDefLan = this.publicInfo.data.lan.defLan;
      } else {
        const errorData = {
          domain,
          message: `未拿到publicInfo.lan.defLan对象, 语言强制转为${serverDefLan}`,
          key: 'publicInfo.lan.defLan',
          data: this.publicInfo.data.lan.defLan,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }

      // 针对 publicInfo => lan => lanList 兼容处理
      let severLanList = [];
      if (this.publicInfo.data.lan.lanList instanceof Array) {
        severLanList = this.publicInfo.data.lan.lanList;
      } else {
        const errorData = {
          domain,
          message: '未拿到publicInfo.lan.lanList对象, 转为[]',
          key: 'publicInfo.lan.lanList',
          data: this.publicInfo.lan.lanList,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }

      // 处理数据 lans
      const lans = [];
      if (severLanList.length) {
        severLanList.forEach((item) => {
          lans.push(item.id);
        });
      } else {
        lans.push(serverDefLan);
      }
      // 如果url中的语言合法，则同步cookie
      if (lans.indexOf(clientUrlLan) !== -1) {
        this.ctx.cookies.set('lan', clientUrlLan, {
          httpOnly: false,
          domain: cookieDomain,
        });
      } else {
        const lan = lans.indexOf(clientCookLan) !== -1 ? clientCookLan : serverDefLan;
        let redirectUrl = '';
        if (reg.test(clientUrlLan)) {
          const vu = this.ctx.request.url.split(`/${clientUrlLan}`)[1];
          redirectUrl = vu;
        } else {
          redirectUrl = this.ctx.request.url;
        }
        this.ctx.redirect(`/${lan}${redirectUrl}`);
      }

      this.lan = clientUrlLan;
    } else {
      const errorData = {
        domain,
        message: `未拿到publicInfo.lan对象, 语言强制转为${dLan}`,
        key: 'publicInfo.lan',
        data: this.publicInfo.data.lan,
      };
      if (!hostFilter.test(domain)) {
        this.logger.error(JSON.stringify(errorData));
      }
      if (clientUrlLan === dLan) {
        this.ctx.cookies.set('lan', dLan, {
          httpOnly: false,
          domain: cookieDomain,
        });
      } else {
        let redirectUrl = '';
        if (reg.test(clientUrlLan)) {
          const vu = this.ctx.request.url.split(`/${clientUrlLan}`)[1];
          redirectUrl = vu;
        } else {
          redirectUrl = this.ctx.request.url;
        }
        this.ctx.redirect(`/${dLan}${redirectUrl}`);
      }
      this.lan = clientUrlLan;
    }
  }
}

module.exports = HomeController;
