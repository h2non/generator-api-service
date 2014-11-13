var controllers = require('./controllers')

module.exports = function (app) {
  // define the API endpoints
  app.server.get(app.options.basePath + '/heartbeat', controllers.heartbeat)
  app.server.get(app.options.basePath + '/test', controllers.test)
  app.server.post(app.options.basePath + '/test', controllers.test)
}
