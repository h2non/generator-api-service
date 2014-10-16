var Client = require('../client')

module.exports = TestController

function TestController(req, res, next) {
  // sample test endpoint controller
  if (req.params.sample === 'hello') {
    sampleRequest(res)
  } else {
    res.send(400)
  }
}

function sampleRequest(res) {
  new Client().get({ url: 'http://httpbin.org/status/200' }, function (err, res) {
    if (res.statusCode === 200) {
      res.json(200, { status: 'success' })
    } else {
      res.send(500)
    }
  })
}
