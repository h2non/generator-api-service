var service = require('../../')

module.exports = function Hooks() {
  //
  // configure the Cucumber features hooks
  //

  this.BeforeFeatures(function (event, done) {
    // event -> object with the scenario info
    done()
  })

  this.Before(function (done) {
    done()
  })

  this.After(function (done) {
    done()
  })

  this.AfterFeatures(function () {
    // do something
  })
}
