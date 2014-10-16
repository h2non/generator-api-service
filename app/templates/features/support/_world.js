var _ = require('lodash')
var request = require('request')

exports.World = function World(done) {
  //
  // configure your Cucumber world (aka helper methods to use from your steps)
  //

  this.request = function (done) {
    request(this.config, function (err, res) {
      this.error = err
      this.response = res
      done(err)
    }.bind(this))
  }

  this.getBodyObject = function () {
    var body = null
    if (this.response && (body = this.response.body)) {
      body = _.isArray(body) ? body[0] : body
    }
    return body
  }

  this.getHeaders = function () {
    return this.config.headers = this.config.headers || {}
  }

  done()
}
