/*global describe, beforeEach, it*/
'use strict'

var path = require('path')
var equal = require('assert').equal
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test
var os = require('os')
var tmp = path.join(os.tmpdir(), './temp-test')

describe('api-service:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(tmp)
      .withOptions({ 'skip-install': true })
      .withPrompt({
        'package': 'test',
        'description': 'Cool package',
        'license': 'MIT',
        'repositoryUrl': 'https://github.com/h2non/generator-api-service'
      })
      .on('end', done)
  })

  it('creates root files', function () {
    assert.file([
      'package.json',
      '.editorconfig',
      '.jshintrc',
      '.gitignore',
      'README.md'
    ])
  })

  it('should apply the templating succesfully', function () {
    equal(require(tmp + '/package.json').name, 'test')
  })

  it('creates library files', function () {
    assert.file([
      'lib/index.js',
      'lib/api.js',
      'lib/server.js',
      'lib/logger.js',
      'lib/client.js'
    ])
  })

  it('creates controller files', function () {
    assert.file([
      'lib/controllers/index.js',
      'lib/controllers/test.js',
      'lib/controllers/heartbeat.js'
    ])
  })

  it('creates Cucumber features', function () {
    assert.file([
      'features/sample.feature',
      'features/support/world.js',
      'features/support/hooks.js',
      'features/step_definitions/steps.js'
    ])
  })

  it('creates mocha tests', function () {
    assert.file([
      'test/server.js'
    ])
  })

  it('creates binary script files', function () {
    assert.file([
      'bin/test'
    ])
  })
})
