const util = require('util');
const Transport = require('egg-logger').Transport;
const path = require('path');
const fs = require('fs');
const getDefaultLocale = require('./app/utils/getDefaultLocale');
class RemoteErrorTransport extends Transport{
  // 定义 log 方法，在此方法中把日志上报给远端服务
  log(level, args) {
    let log = args[0];
    let data = {...log};
    if(log.type){
      data.type = log.type;
    }else{
      data.type = 'nodeCommon';
    }
    if(level === 'ERROR'){
      this.options.app.curl(`https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/static/cd.png?info=${JSON.stringify(data)}`).catch(console.error);
    }
  }
}

module.exports = (app) => {
  let argv = {};
  try {
    argv = JSON.parse(process.argv[2]);
  } catch (e) {

  }

  if (argv.buildEnv) {
    app.config.buildEnv = argv.buildEnv;
  }

/*  if(app.config.env !== 'local' && !argv.testEnv){
    app.getLogger('errorLogger').set('remote', new RemoteErrorTransport({level: 'ERROR', app}));
   }*/
   // 远程拉取数据 存储地址
  if (app.config.env === 'local') {
    app.config.staticPath = path.join(__dirname, './app/public/serverData/');
    app.config.skinsPath = path.join(__dirname, './app/public/siknData/');
    app.config.localesPath = path.join(__dirname, './app/public/Locales/');
  } else {
    app.config.staticPath = path.join(__dirname, './../exchange-fe-server-static/publicInfo/');
    app.config.skinsPath = path.join(__dirname, './../exchange-fe-server-static/skinData/');
    app.config.localesPath = path.join(__dirname, './../exchange-fe-server-static/Locales/');
  }

  // 域名配置文件
  let configDomainPath = path.join(app.config.staticPath, 'pageDomain.json');
  app.config.configDomain = {}
  if (fs.existsSync(configDomainPath)) {
    app.config.configDomain = JSON.parse(fs.readFileSync(configDomainPath, 'utf8'));
  }

  const staticDomainPath = path.join(app.config.staticPath, 'staticDomain.json');
  app.config.staticDomain = '';
  if(fs.existsSync(staticDomainPath)){
    app.config.staticDomain = JSON.parse(fs.readFileSync(staticDomainPath, 'utf8')).staticDomain;
  }
  const domainArrPath = path.join(app.config.staticPath, 'domainList.json');
  let domainArr = {};
  if (fs.existsSync(domainArrPath)) {
    domainArr = JSON.parse(fs.readFileSync(domainArrPath, 'utf8'));
  }
  app.config.domainArr = domainArr;
};
