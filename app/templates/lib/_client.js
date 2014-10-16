var _ = require('lodash')
var request = require('request')

//
// Simple HTTP client wrapper
//

module.exports = Client

function Client(options) {
  this.setOptions(options)
}

Client.prototype.defaults = {
  method: 'GET',
  headers: null
}

Client.prototype.send = function (options, cb, method) {
  options = optionsMerge(this.options, options)
  if (method) options.method = method
  request(options, cb)
  return this
}

Client.prototype.get = function (options, cb) {
  return this.send(options, cb, 'GET')
}

Client.prototype.post = function (options, cb) {
  return this.send(options, cb, 'POST')
}

Client.prototype.put = function (options, cb) {
  return this.send(options, cb, 'PUT')
}

Client.prototype.delete = function (options, cb) {
  return this.send(options, cb, 'DELETE')
}

Client.prototype.patch = function (options, cb) {
  return this.send(options, cb, 'PATCH')
}

Client.prototype.head = function (options, cb) {
  return this.send(options, cb, 'HEAD')
}

Client.prototype.setOptions = function (options) {
  this.options = optionsMerge(this.defaults, options)
}

function optionsMerge(defaults, options) {
  return _.merge(_.clone(defaults), options)
}
