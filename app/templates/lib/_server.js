var _ = require('lodash')
var util = require('util')
var restify = require('restify')
var winston = require('winston')
var winstonAdapter = require('bunyan-winston-adapter')
var EventEmitter = require('events').EventEmitter
var pkg = require('../package.json')
var api = require('./api')

module.exports = function serverFactory(options) {
  return new Server(options)
}

function Server(options) {
  this.options = _.merge({}, this.options, options)
  this.start()
}

Server.protototype = Object.create(EventEmitter.prototype)

Server.prototype.options = {
  host: '0.0.0.0',
  port: 8080,
  mock: false,
  debug: false,
  verbose: true,
  basePath: '/api'
}

Server.prototype.start = function () {
  try {
    this._createServer()
  } catch (e) {
    this.emit('error', e)
  }
  return this
}

Server.prototype._createServer = function () {
  this.server = restify.createServer({
    name: pkg.name,
    version: pkg.version,
    log: winstonAdapter.createAdapter(winston),
  })

  this.defineEndpoints()
  this.server.listen(this.options.port, function () {
    this.emit('ready', this.options)
  }.bind(this))
}

Server.prototype.defineMiddlewares = function () {
  this.server.use(restify.bodyParser())
  this.server.use(restify.queryParser())
  this.server.use(restify.gzipResponse())
  this.server.use(restify.fullResponse())
  this.server.use(defineCORS)
  this.server.use(trafficThrottle())
  this.server.use(exposeServer(this))
  this.server.opts(/\.*/, function (req, res) { res.send(204) })
  //if (this.options.verbose) this.server.use(verboseLog)
}

Server.prototype.defineEndpoints = function () {
  api(this.server)
}

Server.prototype.stop = function () {
  this.server.close(function () {
    this.emit('close')
  }.bind(this))
}

function exposeServer(app) {
  return function (req, res, next) {
    res.server = server
    next()
  }
}

function trafficThrottle() {
  return restify.throttle({
    burst: 100,
    rate: 25,
    ip: true,
    overrides: {
      '127.0.0.1': { rate: 0, burst: 0 }
    }
  })
}

function defineCORS(req, res, next) {
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'] || 'GET, POST, DELETE, PUT, PATCH')
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    if (req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'])
    }
  }
  next()
}
