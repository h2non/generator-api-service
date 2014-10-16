var winston = require('winston')

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)()
  ]
})

module.exports = function (msg) {
  logger.info(new Date().toISOString() + ' - ' + msg)
}
