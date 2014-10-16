module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    clean: {
      archives: '*.nar'
    },
    shell: {
      mongo: {
        command: 'mongod',
        options: {
          async: true,
          stdout: false,
          stderr: true,
          failOnError: true
        }
      },
      cucumber: {
        command:
          './node_modules/.bin/cucumber-js  -f pretty ' +
          '-r features/support -r features/step_definitions'
      }
    },
    mochacli: {
      options: {
        ui: 'bdd',
        reporter: 'spec',
        bail: true
      },
      all: ['test/**/*.js']
    },
    nar: {
      options: {
        executable: true,
        arch: 'x64',
        os: 'linux'
      },
      create: {
        src: 'package.json',
        dest: '.'
      }
    }
  })

  grunt.registerTask('test', [
    'mochacli',
    'shell'
  ])

  grunt.registerTask('build', ['clean:archives', 'nar'])
}
