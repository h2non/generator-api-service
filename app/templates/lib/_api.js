var controllers = require('./controllers')

module.exports = function (server) {
  // define the API endpoints
  server.get(server.options.basePath + '/heartbeat', controllers.heartbeat)
  server.get(server.options.basePath + '/test', controllers.test)
  server.post(server.options.basePath + '/test', controllers.test)
}
