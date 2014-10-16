var _ = require('lodash')
var expect = require('chai').expect
var Given, When, Then

module.exports = function () {
  Given = When = Then = this.defineStep
  this.World = require('../support/world').World

  //
  // customize to your needs
  //

  Given(/^a new awesome test scenario$/, function (done) {
    this.config = {}
  })

  When(/^a client send a ([a-z]{3,7}) request to "(.*)"$/i, function (method, path, done) {
    this.config.method = method
    this.config.url = path
    done()
  })

  When(/^request query params are "(.*)"$/i, function (params, done) {
    this.config.url += '?' + params
    done()
  })

  When(/^aditional path name is "(.*)"$/i, function (path, done) {
    this.config.url += path
    done()
  })

  When(/^request content type is "(.*)"$/i, function (mime, done) {
    var headers = this.getHeaders()
    headers['Content-Type'] = mime
    done()
  })

  When(/^request accept type is "(.*)"$/i, function (mime, done) {
    var headers = this.getHeaders()
    headers['Accept'] = mime
    done()
  })

  When(/^request payload is:$/i, function (data, done) {
    this.config.data = data
    done()
  })

  When(/^the request is performed$/i, function (done) {
    this.request(done)
  })

  Then(/^response content type should be "(.*)"$/, function (mime, done) {
    expect(this.response.type).to.be.equal(mime)
    done()
  })

  Then(/^response body should be:$/, function (body, done) {
    expect(this.response.text).to.be.equal(body)
    done()
  })

  Then(/^response body ([a-z]+) should be "(.*)"$/, function (key, value, done) {
    var data = this.getBodyObject()[key]
    if (value === 'empty')
      expect(data).to.be.empty
    else
      expect(data).to.be.equal(value)
    done()
  })

  Then(/^response body ([a-z]+) should match "(.*)"$/, function (key, value, done) {
    expect(this.getBodyObject()[key]).to.match(new RegExp(value, 'gi'))
    done()
  })

  Then(/^response body ([a-z]+) should have items "(.*)"$/, function (key, value, done) {
    expect(this.getBodyObject()[key]).to.include.members(value.split(','))
    done()
  })

  Then(/^response status code should be ([0-9]{3})$/i, function (code, done) {
    expect(this.verify.statusCode).to.be.equal(parseInt(code, 10))
    done()
  })

}
