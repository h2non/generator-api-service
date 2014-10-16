module.exports = TestController

function TestController(req, res, next) {
  // sample test endpoint controller
  if (req.params.sample === 'hello') {
    res.json(200, { status: 'success' })
  } else {
    res.send(400)
  }
}
