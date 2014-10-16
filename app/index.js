'use strict'
var _ = require('lodash')
var util = require('util')
var path = require('path')
var yeoman = require('yeoman-generator')
var yosay = require('yosay')

var ApiServiceGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json')
  },

  prompting: function () {
    var done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the node.js HTTP API service generator!'
    ))

    var prompts = [{
      type: 'input',
      name: 'package',
      message: 'Enter your package name',
      default: 'service'
    }, {
      type: 'input',
      name: 'description',
      message: 'Enter your package description',
      default: 'An awesome node.js API service'
    }, {
      type: 'input',
      name: 'license',
      message: 'Enter your package license',
      default: 'MIT'
    }, {
      type: 'input',
      name: 'repositoryUrl',
      message: 'Enter your package repository URL',
      default: ''
    }]

    this.prompt(prompts, function (props) {
      _.extend(this, props)
      done()
    }.bind(this))
  },

  writing: {
    app: function () {
      this.dest.mkdir('lib')
      this.dest.mkdir('bin')
      this.dest.mkdir('test')
      this.dest.mkdir('lib/controllers')
      this.dest.mkdir('features/support')
      this.dest.mkdir('features/step_definitions')

      this.src.copy('bin/_service', 'bin/service')
      this.src.copy('features/step_definitions/_steps.js', 'features/step_definitions/steps.js')
      this.src.copy('features/support/_hooks.js', 'features/support/hooks.js')
      this.src.copy('features/support/_world.js', 'features/support/world.js')
      this.src.copy('features/_sample.feature', 'features/sample.feature')

      this.src.copy('lib/_api.js', 'lib/api.js')
      this.src.copy('lib/_client.js', 'lib/client.js')
      this.src.copy('lib/_index.js', 'lib/index.js')
      this.src.copy('lib/_logger.js', 'lib/logger.js')
      this.src.copy('lib/_server.js', 'lib/server.js')
      this.src.copy('lib/controllers/_heartbeat.js', 'lib/controllers/heartbeat.js')
      this.src.copy('lib/controllers/_index.js', 'lib/controllers/index.js')
      this.src.copy('lib/controllers/_test.js', 'lib/controllers/test.js')

      this.src.copy('test/_server.js', 'test/server.js')
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig')
      this.src.copy('jshintrc', '.jshintrc')
      this.src.copy('gitignore', '.gitignore')
      this.src.copy('_Gruntfile.js', 'Gruntfile.js')
      this.src.copy('_README.md', 'README.md')
      this.src.copy('_package.json', 'package.json')
    }
  },
  end: function () {
    this.installDependencies()
  }
})

module.exports = ApiServiceGenerator
