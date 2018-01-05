const http = require('http')
const SocketIO = require('socket.io')
const config = require('./config')
const worker = require('./workers')
const logger = require('./services/logger')
const server = http.createServer()


const io = new SocketIO(server)
worker(io)

server.listen(process.env.PORT || config.port)

logger.info(`Started on port ${server.address().port}`)
