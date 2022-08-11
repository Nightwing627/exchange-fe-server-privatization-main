// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFePublicInfo = require('../../../app/controller/fePublicInfo');
import ExportHome = require('../../../app/controller/home');
import ExportServerUrl = require('../../../app/controller/serverUrl');

declare module 'egg' {
  interface IController {
    fePublicInfo: ExportFePublicInfo;
    home: ExportHome;
    serverUrl: ExportServerUrl;
  }
}
