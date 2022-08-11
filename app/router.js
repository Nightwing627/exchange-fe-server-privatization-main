

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/fePublicInfo', controller.fePublicInfo.get);
  router.get('/getLocale', controller.fePublicInfo.getLocale);
  router.get('/(.+)?/', controller.home.index);
  // router.post('*', controller.serverUrl.index)
};
